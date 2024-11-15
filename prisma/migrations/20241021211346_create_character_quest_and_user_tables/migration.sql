-- CreateEnum
CREATE TYPE "Races" AS ENUM ('ELF', 'HUMAN', 'DWARVEN', 'DEMON');

-- CreateEnum
CREATE TYPE "Factions" AS ENUM ('SWORDS_OF_LIGHT', 'NECRO_INQUISITION', 'DARK_EMPIRE', 'NORTH_KINGDOMS', 'BROTHERS_OF_BLOOD');

-- CreateEnum
CREATE TYPE "Classes" AS ENUM ('KNIGHT', 'MAGE', 'ROGUE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "faction" "Factions",
    "race" "Races",
    "description" TEXT NOT NULL,
    "p_objective" TEXT NOT NULL,
    "s_objective" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "race" "Races" NOT NULL,
    "faction" "Factions" NOT NULL,
    "class" "Classes" NOT NULL,
    "lore" TEXT NOT NULL,
    "lvl" INTEGER NOT NULL DEFAULT 5,
    "inteligence" INTEGER NOT NULL DEFAULT 5,
    "vitality" INTEGER NOT NULL DEFAULT 5,
    "resistance" INTEGER NOT NULL DEFAULT 5,
    "dexterity" INTEGER NOT NULL DEFAULT 5,
    "strength" INTEGER NOT NULL DEFAULT 5,
    "faith" INTEGER NOT NULL DEFAULT 5
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_id_key" ON "Quest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
