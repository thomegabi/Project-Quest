import { Character, Classes, Factions, PrismaClient, Races, Sex } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export class CharacterRepository {
  async createCharacter(
    userId: string,
    name: string,
    sex: Sex,
    race: Races,
    faction: Factions,
    characterClass: Classes,
    lore: string,
    lvl: number,
    inteligence: number ,
    vitality: number,
    resistance: number,
    dexterity: number,
    strength: number,
    faith: number
  ): Promise<Character> {
    return prisma.character.create({
      data: {
        userId,
        name,
        sex,
        race,
        faction,
        class: characterClass,
        lore,
        lvl,
        inteligence,
        vitality,
        resistance,
        dexterity,
        strength,
        faith,
      },
    });
  }

  // Busca um personagem pelo ID
  async getCharacterById(id: string): Promise<Character | null> {
    return prisma.character.findUnique({
      where: { id },
    });
  }

  async getCharacterByUserId(userId: string): Promise<Character[] | null> {
    return prisma.character.findMany({
      where: { userId },
    });
  }

  // Retorna todos os personagens, com paginação opcional
  async getAllCharacters(): Promise<Character[]> {
    return prisma.character.findMany();
  }

  // Atualiza informações de um personagem
  async updateCharacter(id: string, data: Partial<Omit<Character, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Character> {
    return prisma.character.update({
      where: { id },
      data,
    });
  }

  // Deleta um personagem pelo ID
  async deleteCharacter(id: string): Promise<Character> {
    return prisma.character.delete({
      where: { id },
    });
  }
}
