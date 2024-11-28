"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questRoutes = void 0;
const express_1 = require("express");
const quest_controller_1 = require("../controllers/quest-controller");
const router = (0, express_1.Router)();
exports.questRoutes = router;
const questController = new quest_controller_1.QuestController();
// Rotas
router.post('/quests', async (req, res) => {
    return questController.createQuest(req, res);
});
router.get('/quests/:id', async (req, res) => {
    return questController.getQuestById(req, res);
});
router.put('/quests/:id', async (req, res) => {
    return questController.updateQuest(req, res);
});
router.delete('/quests/:id', async (req, res) => {
    return questController.deleteQuest(req, res);
});
router.get('/quests', async (req, res) => {
    return questController.getAllQuests(req, res);
});
//# sourceMappingURL=quest-routes.js.map