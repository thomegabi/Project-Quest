import express from 'express';
import { check } from 'express-validator';
import * as usersController from '../controllers/user-controller';
import { verifyToken } from '../middlewares/token-auth-middleware'; 


const router = express.Router();

router.get('/users', usersController.getUsers);

router.get('/user/token', verifyToken, usersController.getUserWithToken)

router.post('/signup', [
  check('email').not().isEmpty().isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 })
], usersController.signup);

router.post('/login', [
  check('email').not().isEmpty().isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 })
], usersController.login);


router.delete('/user/:userId/delete', verifyToken, usersController.deleteUser)

export default router;
