import { Character, Classes, Factions, PrismaClient, Races } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export class CharacterRepository {
  // Cria um novo personagem
  async createCharacter(
    userId: string,
    name: string,
    race: Races,
    faction: Factions,
    characterClass: Classes,
    lore: string,
    lvl: number = 5,
    inteligence: number = 5,
    vitality: number = 5,
    resistance: number = 5,
    dexterity: number = 5,
    strength: number = 5,
    faith: number = 5
  ): Promise<Character> {
    return prisma.character.create({
      data: {
        userId,
        name,
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

  // Retorna todos os personagens, com paginação opcional
  async getAllCharacters(skip = 0, take = 10): Promise<Character[]> {
    return prisma.character.findMany({
      skip,
      take,
    });
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
