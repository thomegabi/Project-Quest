import { Router, Request, Response } from 'express';
import { QuestController } from '../controllers/quest-controller';

const router = Router();
const questController = new QuestController();

// Rotas
router.post('/quests', async (req: Request, res: Response) => {
  return questController.createQuest(req, res);
});

router.get('/quests/:id', async (req: Request, res: Response) => {
  return questController.getQuestById(req, res);
});

router.put('/quests/:id', async (req: Request, res: Response) => {
  return questController.updateQuest(req, res);
});

router.delete('/quests/:id', async (req: Request, res: Response) => {
  return questController.deleteQuest(req, res);
});

router.get('/quests', async (req: Request, res: Response) => {
  return questController.getAllQuests(req, res);
});

export { router as questRoutes };