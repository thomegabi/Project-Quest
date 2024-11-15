import { Router } from 'express';
import { createCharacterHandler, deleteCharacterHandler, getAllCharactersHandler, getCharacterByIdHandler, updateCharacterHandler } from '../controllers/character-controller';

const router = Router();

// Rota para criar um personagem
router.post('/characters', createCharacterHandler);

// Rota para obter um personagem pelo ID
router.get('/characters/:id', getCharacterByIdHandler);

// Rota para listar todos os personagens (com paginação)
router.get('/characters', getAllCharactersHandler);

// Rota para atualizar um personagem
router.put('/characters/:id', updateCharacterHandler);

// Rota para deletar um personagem pelo ID
router.delete('/characters/:id', deleteCharacterHandler);

export default router;
