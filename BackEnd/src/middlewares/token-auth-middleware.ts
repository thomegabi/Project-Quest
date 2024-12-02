import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Token não fornecido ou mal formatado');
    res.status(403).json({ message: 'Token não fornecido ou mal formatado' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Token extraído:', token.substring(0, 20) + '...');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as any).userId;
    console.log('Token decodificado, userId:', req.userId);
    next();
  } catch (err) {
    console.log('Erro na verificação do token:', err);
    res.status(401).json({ message: 'Token inválido' });
  }
};
