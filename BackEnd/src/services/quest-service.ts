import { QuestRepository } from '../repositories/quest-repository';
import { Quest, Factions, Races } from '@prisma/client';

export class QuestService {
  private questRepository: QuestRepository;

  constructor() {
    this.questRepository = new QuestRepository();
  }

  async createQuest(data: Omit<Quest, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.questRepository.createQuest(data);
  }

  async getQuestById(id: string) {
    return this.questRepository.getQuestById(id);
  }

  async updateQuest(id: string, data: Partial<Quest>) {
    return this.questRepository.updateQuest(id, data);
  }

  async deleteQuest(id: string) {
    return this.questRepository.deleteQuest(id);
  }

  async getAllQuests() {
    return this.questRepository.getAllQuests();
  }
}