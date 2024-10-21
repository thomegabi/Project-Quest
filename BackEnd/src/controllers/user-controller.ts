import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'; 
import { UserRepository } from '../repositories/prisma/user-repository';
import path from 'path';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'

const userRepository = new UserRepository();

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await userRepository.getAllUsers();

    return res.status(200).json({users});
  } catch (error) {
    console.log("Erro ao localizar usuários: ", error)
    return res.status(500).json({message: "Um erro inesperado aconteceu"})
  }
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const identifiedUser = await userRepository.getUserByEmail(email);
    console.log(identifiedUser)

    if (!identifiedUser) {
      return res.status(500).json({message: 'User unidentified'})
    }

    /*const isPasswordValid = await bcrypt.compare(password, identifiedUser.password);
    console.log(isPasswordValid)
      if (!isPasswordValid) {
        throw new HttpError("Usuário não encontrado, verifique sua senha e email!", 401);
      }*/


    const token = jwt.sign({ userId: identifiedUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '3h', 
    });

    return res.status(200).json({token});
  } catch (error) {
    console.log("Error: ", error)
    return res.status(404).json({error});
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  console.log("Signing up... ");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(500).json({message: 'Erro: ', errors});
  }

  const { email, password, name} = req.body;

  try {
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return res.status(422).json({message: 'Email already in use'});
    }

   /* const saltRounds = 10

    const hashPassword = async (password: any) => {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    };
    
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword); */

    const createdUser = await userRepository.createUser(email, password, name);
    
    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '3h', 
    });

    console.log(`Email: ${email}, Password: ${password}, Nome: ${name}`);
    
    return res.status(201).json({ token });
  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).json({message: 'Error: ', error});
  }
};

export const getUserWithToken = async(req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
  const userId = req.userId;

  if(!userId){
    return res.status(404).json('Usuário não encontrado')
  }

  try{
    const identifiedUser = await userRepository.getUserById(userId)

    if(!identifiedUser){
      return res.status(404).json('Usuário não localizado')
    }
    const identifiedUserJson = JSON.parse(JSON.stringify(identifiedUser, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  
    return res.status(200).json({identifiedUserJson})
  } catch(err){
    res.status(500).json(err)
  }
}

export const deleteUser = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try{
    const { userId } = req.params

    const deletedUser = await userRepository.deleteUser(userId)

    if(!deletedUser){
      return res.status(404).json({message: "Usuário não encontrado"})
    }

    return res.status(200).json({message: "Usuário deletado com sucesso: ", deletedUser})
  } catch (error){
    console.log("Erro ao deletar usuário: ", error)
    return res.status(500).json({message: "Um erro inesperado ocorreu: ", error})
  }
}
