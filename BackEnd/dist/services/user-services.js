"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/prisma/user-repository");
const userRepository = new user_repository_1.UserRepository();
class UserService {
    async createUser(email, password, name) {
        return userRepository.createUser(email, password, name);
    }
    async getUserById(id) {
        return userRepository.getUserById(id);
    }
    async getUserByEmail(email) {
        return userRepository.getUserByEmail(email);
    }
    async updateUser(id, data) {
        return userRepository.updateUser(id, data);
    }
    async deleteUser(id) {
        return userRepository.deleteUser(id);
    }
    async getAllUsers() {
        return userRepository.getAllUsers();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-services.js.map