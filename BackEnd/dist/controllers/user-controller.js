"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserWithToken = exports.signup = exports.login = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const user_services_1 = require("../services/user-services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const userService = new user_services_1.UserService();
const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ users });
    }
    catch (error) {
        console.log("Erro ao localizar usuários: ", error);
        next(error);
    }
};
exports.getUsers = getUsers;
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const identifiedUser = await userService.getUserByEmail(email);
        console.log(identifiedUser);
        if (!identifiedUser) {
            res.status(500).json({ message: 'User unidentified' });
            return;
        }
        /*const isPasswordValid = await bcrypt.compare(password, identifiedUser.password);
        console.log(isPasswordValid)
          if (!isPasswordValid) {
            throw new HttpError("Usuário não encontrado, verifique sua senha e email!", 401);
          }*/
        const token = jsonwebtoken_1.default.sign({ userId: identifiedUser.id }, process.env.JWT_SECRET, {
            expiresIn: '3h',
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(404).json({ error });
    }
};
exports.login = login;
const signup = async (req, res, next) => {
    console.log("Signing up... ");
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        res.status(422).json({ message: 'Erro: ', errors });
    }
    const { email, password, name } = req.body;
    try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            res.status(422).json({ message: 'Email already in use' });
            return;
        }
        /* const saltRounds = 10
     
         const hashPassword = async (password: any) => {
           const hash = await bcrypt.hash(password, saltRounds);
           return hash;
         };
         
         const hashedPassword = await hashPassword(password);
         console.log(hashedPassword); */
        const createdUser = await userService.createUser(email, password, name);
        const token = jsonwebtoken_1.default.sign({ userId: createdUser.id }, process.env.JWT_SECRET, {
            expiresIn: '3h',
        });
        console.log(`Email: ${email}, Password: ${password}, Nome: ${name}`);
        res.status(201).json({ token });
    }
    catch (error) {
        console.log('Error: ', error);
        next(error);
        res.status(500).json({ message: 'Error: ', error });
    }
};
exports.signup = signup;
const getUserWithToken = async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(404).json('Usuário não encontrado');
        return;
    }
    try {
        const identifiedUser = await userService.getUserById(userId);
        if (!identifiedUser) {
            res.status(404).json('Usuário não localizado');
            return;
        }
        res.status(200).json({ identifiedUser });
    }
    catch (err) {
        next(err);
        res.status(500).json(err);
    }
};
exports.getUserWithToken = getUserWithToken;
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        res.status(200).json({ message: "Usuário deletado com sucesso: ", deletedUser });
    }
    catch (error) {
        console.log("Erro ao deletar usuário: ", error);
        next(error);
        res.status(500).json({ message: "Um erro inesperado ocorreu: ", error });
        return;
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user-controller.js.map