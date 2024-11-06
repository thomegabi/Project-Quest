import { Request, Response, Router } from 'express';
// import { verifyToken } from '../middlewares/token-auth-middleware';
import { CharacterRepository } from '../repositories/prisma/character-repository';

const characterRepo = new CharacterRepository();
const router = Router();

// Rota para criar um personagem
router.post('/characters', async (req: Request, res: Response) => {
  try {
    const { userId, name, race, faction, characterClass, lore, lvl, inteligence, vitality, resistance, dexterity, strength, faith } = req.body;
    const character = await characterRepo.createCharacter(userId, name, race, faction, characterClass, lore, lvl, inteligence, vitality, resistance, dexterity, strength, faith);
    res.status(201).json(character);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao criar personagem:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

// Rota para obter um personagem pelo ID
router.get('/characters/:id', async (req: Request, res: Response) => {
  try {
    const character = await characterRepo.getCharacterById(req.params.id);
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ message: 'Character not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar personagem:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

// Rota para listar todos os personagens (com paginação)
router.get('/characters', async (req: Request, res: Response) => {
  try {
    const { skip = 0, take = 10 } = req.query;
    const characters = await characterRepo.getAllCharacters(Number(skip), Number(take));
    res.json(characters);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao listar personagens:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

// Rota para atualizar um personagem
router.put('/characters/:id', async (req: Request, res: Response) => {
  try {
    const character = await characterRepo.updateCharacter(req.params.id, req.body);
    res.json(character);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao atualizar personagem:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

// Rota para deletar um personagem pelo ID
router.delete('/characters/:id', async (req: Request, res: Response) => {
  try {
    const character = await characterRepo.deleteCharacter(req.params.id);
    res.json({ message: 'Character deleted', character });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao deletar personagem:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

export default router;
