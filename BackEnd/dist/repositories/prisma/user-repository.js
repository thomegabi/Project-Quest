"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
class UserRepository {
    async createUser(email, password, name) {
        return prisma.user.create({
            data: {
                name,
                email,
                password
            },
        });
    }
    async getUserById(id) {
        return prisma.user.findUnique({
            where: { id },
        });
    }
    async getUserByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
    async updateUser(id, data) {
        return prisma.user.update({
            where: { id },
            data,
        });
    }
    async deleteUser(id) {
        return prisma.user.delete({
            where: { id },
        });
    }
    async getAllUsers() {
        return prisma.user.findMany();
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map