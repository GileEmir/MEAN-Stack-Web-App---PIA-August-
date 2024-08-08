import express from 'express';
import { GardenScheduleController } from '../controllers/gardenSchedule.controller'; // Update the module path to match the correct casing

const gardenScheduleRouter = express.Router();

gardenScheduleRouter.route("/schedule-garden").post(
  (req, res) => new GardenScheduleController().scheduleGarden(req, res)
);

gardenScheduleRouter.route("/schedules").get(
  (req, res) => new GardenScheduleController().getAllSchedules(req, res)
);

export default gardenScheduleRouter;