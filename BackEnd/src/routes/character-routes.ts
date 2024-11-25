import { Router } from 'express';
import { createCharacterHandler, deleteCharacterHandler, getAllCharactersHandler, getCharacterByIdHandler, updateCharacterHandler } from '../controllers/character-controller';
import { verifyToken } from '../middlewares/token-auth-middleware';

const router = Router();

router.use(verifyToken)

router.post('/characters', createCharacterHandler);

router.get('/myCharacters', getCharacterByIdHandler);

router.get('/characters', getAllCharactersHandler);

router.put('/characters/:id', updateCharacterHandler);

router.delete('/character/:id/delete', deleteCharacterHandler);

export default router;
