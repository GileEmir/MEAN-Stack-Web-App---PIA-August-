"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gardenLayout_controller_1 = require("../controllers/gardenLayout.controller"); // Update the module path to match the correct casing
const gardenLayoutRouter = express_1.default.Router();
gardenLayoutRouter.route("/save").post((req, res) => new gardenLayout_controller_1.GardenLayoutController().saveLayout(req, res));
exports.default = gardenLayoutRouter;
