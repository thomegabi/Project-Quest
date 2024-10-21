import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export class UserRepository {
  
}