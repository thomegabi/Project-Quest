"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usersController = __importStar(require("../controllers/user-controller"));
const token_auth_middleware_1 = require("../middlewares/token-auth-middleware");
const router = express_1.default.Router();
router.get('/users', usersController.getUsers);
router.get('/user/token', token_auth_middleware_1.verifyToken, usersController.getUserWithToken);
router.post('/signup', [
    (0, express_validator_1.check)('email').not().isEmpty().isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password').isLength({ min: 6 })
], usersController.signup);
router.post('/login', [
    (0, express_validator_1.check)('email').not().isEmpty().isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password').isLength({ min: 6 })
], usersController.login);
router.delete('/user/:userId/delete', token_auth_middleware_1.verifyToken, usersController.deleteUser);
exports.default = router;
//# sourceMappingURL=user-routes.js.map