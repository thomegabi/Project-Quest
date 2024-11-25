import { Request, Response } from 'express';
import { CharacterRepository } from '../repositories/prisma/character-repository';

const characterRepo = new CharacterRepository();

export const createCharacterHandler = async (req: Request, res: Response) => {
  try {
    const { name, race, faction, characterClass, lore, lvl, inteligence, vitality, resistance, dexterity, strength, faith } = req.body;
    const userId = req.userId
    
    if(!userId){
      console.error("Usuário não identificado")
      return
    }
    const character = await characterRepo.createCharacter( userId, name, race, faction, characterClass, lore, lvl, inteligence, vitality, resistance, dexterity, strength, faith);
    res.status(201).json(character);
  } catch (error) {
    handleError(error, res, 'Erro ao criar personagem');
  }
};

export const getCharacterByIdHandler = async (req: Request, res: Response) : Promise<void> => {
  try {
    const userId = req.userId

    if(!userId){
      console.error("User not found")
      res.status(404).send('User not found')
      return
    }

    const character = await characterRepo.getCharacterByUserId(userId);
    if (character) {
       res.status(200).json({character});
       return
    } else {
       res.status(404).json({ message: 'Character not found' });
       return
    }
  } catch (error) {
    handleError(error, res, 'Erro ao buscar personagem');
  }
};

export const getAllCharactersHandler = async (req: Request, res: Response) => {
  try {
    const characters = await characterRepo.getAllCharacters();
    res.json({characters});
  } catch (error) {
    handleError(error, res, 'Erro ao listar personagens');
  }
};

export const updateCharacterHandler = async (req: Request, res: Response) => {
  try {
    const character = await characterRepo.updateCharacter(req.params.id, req.body);
    res.json(character);
  } catch (error) {
    handleError(error, res, 'Erro ao atualizar personagem');
  }
};

export const deleteCharacterHandler = async (req: Request, res: Response) => {
  try {
    const character = await characterRepo.deleteCharacter(req.params.id);
    res.json({ message: 'Character deleted', character });
  } catch (error) {
    handleError(error, res, 'Erro ao deletar personagem');
  }
};

// Função utilitária para lidar com erros
const handleError = (error: unknown, res: Response, logMessage: string) => {
  if (error instanceof Error) {
    console.error(`${logMessage}:`, error.message);
    res.status(500).json({ error: error.message });
  } else {
    console.error(`${logMessage}:`, error);
    res.status(500).json({ error: 'Erro desconhecido' });
  }
};
