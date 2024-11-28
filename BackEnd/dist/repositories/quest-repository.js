"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
class QuestRepository {
    async createQuest(data) {
        return prisma.quest.create({
            data,
        });
    }
    async getQuestById(id) {
        return prisma.quest.findUnique({
            where: { id },
        });
    }
    async updateQuest(id, data) {
        return prisma.quest.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date()
            }
        });
    }
    async deleteQuest(id) {
        return prisma.quest.delete({
            where: { id },
        });
    }
    async getAllQuests() {
        return prisma.quest.findMany();
    }
}
exports.QuestRepository = QuestRepository;
//# sourceMappingURL=quest-repository.js.map