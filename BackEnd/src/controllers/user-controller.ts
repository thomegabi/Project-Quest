import e, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'; 
import { UserRepository } from '../repositories/prisma/user-repository';
import { UserService } from '../services/user-services';
import path from 'path';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'

const userService = new UserService();

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.log("Erro ao localizar usuários: ", error);
    next(error); 
  }
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const identifiedUser = await userService.getUserByEmail(email);
    console.log(identifiedUser)

    if (!identifiedUser) {
      res.status(500).json({message: 'User unidentified'})
      return
    }

    /*const isPasswordValid = await bcrypt.compare(password, identifiedUser.password);
    console.log(isPasswordValid)
      if (!isPasswordValid) {
        throw new HttpError("Usuário não encontrado, verifique sua senha e email!", 401);
      }*/


    const token = jwt.sign({ userId: identifiedUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '3h', 
    });

    res.status(200).json({token, userId: identifiedUser.id});
  } catch (error) {
    console.log("Error: ", error)
    res.status(404).json({error});
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("Signing up... ");
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.log("ERROR: ", errors.array());
    res.status(422).json({message: 'Erro: ', errors});
    return;
  }

  const { email, password, name} = req.body;

  try {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      res.status(422).json({message: 'Email already in use'});
      return;
    }

    const createdUser = await userService.createUser(email, password, name);
    
    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '3h', 
    });

    console.log(`Email: ${email}, Password: ${password}, Nome: ${name}`);
    
    res.status(201).json({ token });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({message: 'Error: ', error});
  }
};

export const getUserWithToken = async(req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
  const userId = req.userId;

  if(!userId){
    return res.status(404).json('Usuário não encontrado')
    return
  }

  try{
    const identifiedUser = await userService.getUserById(userId)

    if(!identifiedUser){
      res.status(404).json('Usuário não localizado')
      return 
    }
  
    res.status(200).json({identifiedUser})
  } catch(err){
    next(err)
    res.status(500).json(err)
  }
}

export const deleteUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { userId } = req.params

    const deletedUser = await userService.deleteUser(userId)

    if(!deletedUser){
      res.status(404).json({message: "Usuário não encontrado"})
      return
    }

    res.status(200).json({message: "Usuário deletado com sucesso: ", deletedUser})
  } catch (error){
    console.log("Erro ao deletar usuário: ", error)
    next(error)
    res.status(500).json({message: "Um erro inesperado ocorreu: ", error})
    return
  }
}
