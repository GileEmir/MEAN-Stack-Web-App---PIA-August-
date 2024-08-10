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

gardenScheduleRouter.route("/company-schedules/:companyId").get(
  (req, res) => new GardenScheduleController().getSchedulesByCompany(req, res)
);


gardenScheduleRouter.route("/cancel-schedule").post(
  (req, res) => new GardenScheduleController().cancelSchedule(req, res)
);

gardenScheduleRouter.route("/decline-schedule").post(
  (req, res) => new GardenScheduleController().declineAppointment(req, res)
);

gardenScheduleRouter.route("/accept-schedule").post(
  (req, res) => new GardenScheduleController().acceptAppointment(req, res)
);


gardenScheduleRouter.route("/update-rated").post(
  (req, res) => new GardenScheduleController().updateRated(req, res)
);

gardenScheduleRouter.route("/user-maintenance-jobs/:username").get(
   (req, res) => new GardenScheduleController().getMaintenanceJobsByUser(req, res)
);

gardenScheduleRouter.route("/worker").post(
  (req, res) => new GardenScheduleController().getSchedulesForWorker(req, res)
);

gardenScheduleRouter.route("/finnish-appointment").post(
  (req, res) => new GardenScheduleController().finnishAppointment(req, res)
);

export default gardenScheduleRouter;