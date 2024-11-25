import { Router } from 'express';
import { createCharacterHandler, deleteCharacterHandler, getAllCharactersHandler, getCharacterByIdHandler, getCharacterByUserIdHandler, updateCharacterHandler } from '../controllers/character-controller';
import { verifyToken } from '../middlewares/token-auth-middleware';

const router = Router();

router.use(verifyToken)

router.post('/characters', createCharacterHandler);

router.get('/myCharacters', getCharacterByUserIdHandler);

router.get('/characters', getAllCharactersHandler);

router.get('/character/:id', getCharacterByIdHandler)

router.put('/characters/:id', updateCharacterHandler);

router.delete('/character/:id/delete', deleteCharacterHandler);

export default router;
