import { Request, Response } from 'express';
import { QuestService } from '../services/quest-service';
import { Factions, Races } from '@prisma/client';

export class QuestController {
  private questService: QuestService;

  constructor() {
    this.questService = new QuestService();
  }

  async createQuest(req: Request, res: Response) {
    try {
      console.log('Recebendo requisição:', req.body);

      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const { giver, faction, race, primaryObjective, secondaryObjective, description } = req.body;

      const createdQuest = await this.questService.createQuest({
        userId,
        sender: giver,
        faction: faction || null,
        race: race || null,
        description,
        p_objective: primaryObjective,
        s_objective: secondaryObjective
      });

      console.log('Quest criada:', createdQuest);
      return res.status(201).json(createdQuest);
    } catch (error) {
      console.error('Erro ao criar quest:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateQuest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { giver, faction, race, primaryObjective, secondaryObjective, description } = req.body;

      const updatedQuest = await this.questService.updateQuest(id, {
        sender: giver,
        faction: faction || null,
        race: race || null,
        p_objective: primaryObjective,
        s_objective: secondaryObjective,
        description
      });

      return res.json(updatedQuest);
    } catch (error) {
      console.error('Error updating quest:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getQuestById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log('Controller - Buscando quest específica, ID:', id);

      const quest = await this.questService.getQuestById(id);
      console.log('Controller - Quest encontrada:', quest);

      if (!quest) {
        return res.status(404).json({ 
          message: 'Quest não encontrada',
          success: false 
        });
      }

      return res.status(200).json({ 
        message: 'Quest encontrada com sucesso',
        success: true,
        quest: quest 
      });
    } catch (error: any) {
      console.error('Erro ao buscar quest específica:', error);
      return res.status(500).json({ 
        message: 'Erro interno do servidor',
        success: false,
        error: error?.message || 'Erro desconhecido'
      });
    }
  }

  async getAllQuests(req: Request, res: Response) {
    try {
      console.log('Controller - Buscando todas as quests');
      const quests = await this.questService.getAllQuests();
      console.log('Controller - Quests encontradas:', quests);
      
      if (!quests || quests.length === 0) {
        return res.status(200).json({ 
          message: 'Nenhuma quest encontrada', 
          quests: [] 
        });
      }
      
      return res.status(200).json({ 
        message: 'Quests encontradas com sucesso',
        quests: quests 
      });
    } catch (error) {
      console.error('Error getting all quests:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteQuest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.questService.deleteQuest(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting quest:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getQuestsByUserId(req: Request, res: Response) {
    try {
      const userId = req.userId;
      console.log('Controller - Buscando quests do usuário:', userId);
      
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const quests = await this.questService.getQuestsByUserId(userId);
      console.log('Controller - Quests do usuário encontradas:', quests);

      if (!quests || quests.length === 0) {
        return res.status(200).json({ 
          message: 'Nenhuma quest encontrada para este usuário', 
          quests: [] 
        });
      }

      return res.status(200).json({ 
        message: 'Quests encontradas com sucesso',
        quests: quests 
      });
    } catch (error) {
      console.error('Error getting user quests:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}