import { QuestRepository } from '../repositories/quest-repository';
import { Factions, Races } from '@prisma/client';

interface CreateQuestDTO {
  userId: string;
  sender: string;
  faction: Factions | null;
  race: Races | null;
  description: string;
  p_objective: string;
  s_objective?: string;
}

interface UpdateQuestDTO {
  sender?: string;
  faction?: Factions | null;
  race?: Races | null;
  description?: string;
  p_objective?: string;
  s_objective?: string | null;
}

export class QuestService {
  private questRepository: QuestRepository;

  constructor() {
    this.questRepository = new QuestRepository();
  }

  async createQuest(data: CreateQuestDTO) {
    console.log('Service - Criando quest:', data);
    return this.questRepository.createQuest(data);
  }

  async getAllQuests() {
    console.log('Service - Buscando todas as quests');
    const quests = await this.questRepository.getAllQuests();
    console.log('Service - Total de quests encontradas:', quests.length);
    return quests;
  }

  async getQuestsByUserId(userId: string) {
    console.log('Service - Buscando quests do usuário:', userId);
    const quests = await this.questRepository.getQuestsByUserId(userId);
    console.log('Service - Total de quests do usuário:', quests.length);
    return quests;
  }

  async getQuestById(id: string) {
    console.log('Service - Buscando quest por ID:', id);
    return this.questRepository.getQuestById(id);
  }

  async updateQuest(id: string, data: UpdateQuestDTO) {
    console.log('Service - Atualizando quest:', id, data);
    return this.questRepository.updateQuest(id, data);
  }

  async deleteQuest(id: string) {
    console.log('Service - Deletando quest:', id);
    return this.questRepository.deleteQuest(id);
  }
}