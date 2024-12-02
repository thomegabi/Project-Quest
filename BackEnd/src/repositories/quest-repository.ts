import { PrismaClient, Factions, Races } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateQuestData {
  userId: string;
  sender: string;
  faction: Factions | null;
  race: Races | null;
  description: string;
  p_objective: string;
  s_objective?: string | null;
}

export class QuestRepository {
  async createQuest(data: CreateQuestData) {
    console.log('Repository - Criando quest com dados:', data);
    return prisma.quest.create({
      data: {
        userId: data.userId,
        sender: data.sender,
        faction: data.faction,
        race: data.race,
        description: data.description,
        p_objective: data.p_objective,
        s_objective: data.s_objective || null
      }
    });
  }

  async getAllQuests() {
    console.log('Repository - Buscando todas as quests');
    return prisma.quest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getQuestsByUserId(userId: string) {
    console.log('Repository - Buscando quests do usuário:', userId);
    return prisma.quest.findMany({
      where: {
        userId: userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getQuestById(id: string) {
    console.log('Repository - Buscando quest por ID:', id);
    return prisma.quest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async updateQuest(id: string, data: any) {
    console.log('Repository - Atualizando quest:', id, data);
    return prisma.quest.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async deleteQuest(id: string) {
    console.log('Repository - Deletando quest:', id);
    return prisma.quest.delete({
      where: { id }
    });
  }
}