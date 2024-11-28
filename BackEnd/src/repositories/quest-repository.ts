import { PrismaClient, Quest } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export class QuestRepository {
  async createQuest(data: Omit<Quest, 'id' | 'createdAt' | 'updatedAt'>): Promise<Quest> {
    return prisma.quest.create({
      data,
    });
  }

  async getQuestById(id: string): Promise<Quest | null> {
    return prisma.quest.findUnique({
      where: { id },
    });
  }

  async updateQuest(id: string, data: Partial<Quest>): Promise<Quest> {
    return prisma.quest.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  async deleteQuest(id: string): Promise<Quest> {
    return prisma.quest.delete({
      where: { id },
    });
  }

  async getAllQuests(): Promise<Quest[]> {
    return prisma.quest.findMany();
  }
}