"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestService = void 0;
const quest_repository_1 = require("../repositories/quest-repository");
class QuestService {
    constructor() {
        this.questRepository = new quest_repository_1.QuestRepository();
    }
    async createQuest(data) {
        return this.questRepository.createQuest(data);
    }
    async getQuestById(id) {
        return this.questRepository.getQuestById(id);
    }
    async updateQuest(id, data) {
        return this.questRepository.updateQuest(id, data);
    }
    async deleteQuest(id) {
        return this.questRepository.deleteQuest(id);
    }
    async getAllQuests() {
        return this.questRepository.getAllQuests();
    }
}
exports.QuestService = QuestService;
//# sourceMappingURL=quest-service.js.map