"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestController = void 0;
const quest_service_1 = require("../services/quest-service");
class QuestController {
    constructor() {
        this.questService = new quest_service_1.QuestService();
    }
    async createQuest(req, res) {
        try {
            const { giver, factionOrRace, primaryObjective, secondaryObjective, description, userId } = req.body;
            const createdQuest = await this.questService.createQuest({
                userId,
                sender: giver,
                faction: factionOrRace?.faction || null,
                race: factionOrRace?.race || null,
                p_objective: primaryObjective,
                s_objective: secondaryObjective,
                description
            });
            return res.status(201).json(createdQuest);
        }
        catch (error) {
            console.error('Error creating quest:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async updateQuest(req, res) {
        try {
            const { id } = req.params;
            const { giver, factionOrRace, primaryObjective, secondaryObjective, description } = req.body;
            const updatedQuest = await this.questService.updateQuest(id, {
                sender: giver,
                faction: factionOrRace?.faction || null,
                race: factionOrRace?.race || null,
                p_objective: primaryObjective,
                s_objective: secondaryObjective,
                description
            });
            return res.json(updatedQuest);
        }
        catch (error) {
            console.error('Error updating quest:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getQuestById(req, res) {
        try {
            const { id } = req.params;
            const quest = await this.questService.getQuestById(id);
            if (!quest) {
                return res.status(404).json({ error: 'Quest not found' });
            }
            return res.json(quest);
        }
        catch (error) {
            console.error('Error getting quest:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAllQuests(req, res) {
        try {
            const quests = await this.questService.getAllQuests();
            return res.json(quests);
        }
        catch (error) {
            console.error('Error getting all quests:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async deleteQuest(req, res) {
        try {
            const { id } = req.params;
            await this.questService.deleteQuest(id);
            return res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting quest:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.QuestController = QuestController;
//# sourceMappingURL=quest-controller.js.map