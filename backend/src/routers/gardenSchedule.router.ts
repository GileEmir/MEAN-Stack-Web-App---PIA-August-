import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { GardenScheduleController } from '../controllers/gardenSchedule.controller'; // Update the module path to match the correct casing

const gardenScheduleRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..','..','uploads', 'finishedJobs'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

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

gardenScheduleRouter.route("/company-schedules/maintenances/:companyId").get(
  (req, res) => new GardenScheduleController().getMaintenancesByCompany(req, res)
);

gardenScheduleRouter.route("/jobs-distribution/:companyId").get(
  (req, res) => new GardenScheduleController().getJobsDistributionByCompany(req, res)
);

gardenScheduleRouter.route("/average-jobs-per-day/:companyId").get(
  (req, res) => new GardenScheduleController().getAverageJobsPerDay(req, res)
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

gardenScheduleRouter.route("/accept-maintenance").post(
  (req, res) => new GardenScheduleController().acceptMaintenance(req, res)
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

gardenScheduleRouter.route("/jobs-per-month-user").post(
  (req, res) => new GardenScheduleController().getJobsPerMonthForUser(req, res)
);

gardenScheduleRouter.route("/worker/maintenances").post(
  (req, res) => new GardenScheduleController().getMaintenancesForWorker(req, res)
);

gardenScheduleRouter.route("/finnish-appointment").post(
  (req, res) => new GardenScheduleController().finnishAppointment(req, res)
);

gardenScheduleRouter.route("/upload-completion-photo").post(
  upload.single('photo'), // Add multer middleware
  (req, res) => new GardenScheduleController().uploadCompletionPhoto(req, res)
);

export default gardenScheduleRouter;