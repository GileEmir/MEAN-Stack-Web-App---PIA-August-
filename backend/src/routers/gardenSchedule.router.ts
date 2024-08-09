import express from 'express';
import { GardenScheduleController } from '../controllers/gardenSchedule.controller'; // Update the module path to match the correct casing

const gardenScheduleRouter = express.Router();

gardenScheduleRouter.route("/schedule-garden").post(
  (req, res) => new GardenScheduleController().scheduleGarden(req, res)
);

gardenScheduleRouter.route("/schedules").get(
  (req, res) => new GardenScheduleController().getAllSchedules(req, res)
);

gardenScheduleRouter.route("/user-schedules/:username").get(
  (req, res) => new GardenScheduleController().getSchedulesByUser(req, res)
);


gardenScheduleRouter.route("/cancel-schedule").post(
  (req, res) => new GardenScheduleController().cancelSchedule(req, res)
);

gardenScheduleRouter.route("/:appointmentId/rating").post(
  (req, res) => new GardenScheduleController().addCommentToCompany(req, res)
);

gardenScheduleRouter.route("/update-rated").post(
  (req, res) => new GardenScheduleController().updateRated(req, res)
);
gardenScheduleRouter.route("/user-maintenance-jobs/:username").get(
   (req, res) => new GardenScheduleController().getMaintenanceJobsByUser(req, res)
);

export default gardenScheduleRouter;