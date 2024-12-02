import { Router, Request, Response } from 'express';
import { QuestController } from '../controllers/quest-controller';
import { verifyToken } from '../middlewares/token-auth-middleware';

const router = Router();
const questController = new QuestController();

// Rotas públicas (sem autenticação)
router.get('/quests', async (req: Request, res: Response) => {
  return questController.getAllQuests(req, res);
});

// Rotas protegidas (com autenticação)
router.use(verifyToken);

router.get('/myQuests', async (req: Request, res: Response) => {
  return questController.getQuestsByUserId(req, res);
});

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

export default router;