import { UserRepository } from '../repositories/prisma/user-repository';
import { User } from '@prisma/client';

const userRepository = new UserRepository();

export class UserService {
  async createUser(email: string, password: string, name: string): Promise<User> {
    return userRepository.createUser(email, password, name);
  }

  async getUserById(id: string): Promise<User | null> {
    return userRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return userRepository.getUserByEmail(email);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return userRepository.updateUser(id, data);
  }

  async deleteUser(id: string): Promise<User> {
    return userRepository.deleteUser(id);
  }

  async getAllUsers(): Promise<User[]> {
    return userRepository.getAllUsers();
  }
}
