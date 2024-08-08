"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gardenSchedule_controller_1 = require("../controllers/gardenSchedule.controller"); // Update the module path to match the correct casing
const gardenScheduleRouter = express_1.default.Router();
gardenScheduleRouter.route("/schedule-garden").post((req, res) => new gardenSchedule_controller_1.GardenScheduleController().scheduleGarden(req, res));
gardenScheduleRouter.route("/schedules").get((req, res) => new gardenSchedule_controller_1.GardenScheduleController().getAllSchedules(req, res));
exports.default = gardenScheduleRouter;
