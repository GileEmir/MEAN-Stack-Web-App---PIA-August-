"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenScheduleController = void 0;
const gardenSchedule_1 = __importDefault(require("../models/gardenSchedule"));
const user_1 = __importDefault(require("../models/user")); // Correctly import the UserM model
class GardenScheduleController {
    constructor() {
        this.scheduleGarden = (req, res) => {
            const { date, time, totalArea, gardenType, poolArea, greenArea, furnitureArea, fountainArea, tables, chairs, description, options, layout, company, user, rated, workerId, status, refusalComment, refusedBy } = req.body;
            // Validate required fields
            if (!date || !time || !totalArea || !gardenType || !company || !user) {
                return res.status(400).json({ message: 'date, time, totalArea, gardenType, company, and user are required' });
            }
            const newSchedule = new gardenSchedule_1.default({
                date,
                time,
                totalArea,
                gardenType,
                poolArea,
                greenArea,
                furnitureArea,
                fountainArea,
                tables,
                chairs,
                description,
                options,
                layout, // Include the layout field
                company, // Include the company field
                user, // Include the user field
                canceled: false, // Set the canceled field to false by default
                rated: rated || false, // Set the rated field to false by default if not provided
                workerId: workerId || null, // Set workerId to null by default if not provided
                status: status || 'pending', // Set status to 'pending' by default if not provided
                refusalComment: refusalComment || '', // Set refusalComment to empty string by default if not provided
                refusedBy: refusedBy || [] // Set refusedBy to empty array by default if not provided
            });
            newSchedule.save()
                .then(savedSchedule => {
                res.status(201).json({ message: 'Garden scheduling successful', data: savedSchedule });
            })
                .catch(error => {
                res.status(500).json({ message: 'Internal server error' });
            });
        };
        this.cancelSchedule = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const schedule = req.body;
            const { date, time, totalArea, gardenType, company, user } = schedule;
            if (!date || !time || !totalArea || !gardenType || !company || !user) {
                console.warn('Required fields are missing in request body');
                res.status(400).json({ message: 'Required fields are missing' });
                return;
            }
            try {
                const foundSchedule = yield gardenSchedule_1.default.findOne({ date, time, totalArea, gardenType, company, user });
                if (!foundSchedule) {
                    console.warn('Schedule not found with provided fields');
                    res.status(404).json({ message: 'Schedule not found' });
                    return;
                }
                const { _id } = foundSchedule;
                const updatedSchedule = yield gardenSchedule_1.default.findByIdAndUpdate(_id, { canceled: true }, { new: true });
                if (!updatedSchedule) {
                    console.warn('Schedule not found for id:', _id);
                    res.status(404).json({ message: 'Schedule not found' });
                    return;
                }
                res.status(200).json({ message: 'Schedule canceled successfully', data: updatedSchedule });
            }
            catch (error) {
                console.error('Error canceling schedule:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        this.updateRated = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            // Validate required fields
            if (!id) {
                res.status(400).json({ message: 'id is required' });
                return;
            }
            try {
                const updatedSchedule = yield gardenSchedule_1.default.findByIdAndUpdate(id, { rated: true }, { new: true });
                if (!updatedSchedule) {
                    res.status(404).json({ message: 'Schedule not found' });
                    return;
                }
                res.status(200).json({ message: 'Rated updated successfully', data: updatedSchedule });
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    getAllSchedules(req, res) {
        gardenSchedule_1.default.find()
            .then(schedules => {
            res.status(200).json(schedules);
        })
            .catch(error => {
            res.status(500).json({ message: 'Internal server error' });
        });
    }
    getSchedulesByUser(req, res) {
        const username = req.params.username;
        // Find the user by username
        user_1.default.findOne({ username: username })
            .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return null; // Return null to stop the promise chain
            }
            // Find schedules by user ID
            return gardenSchedule_1.default.find({ 'user.username': user.username });
        })
            .then(schedules => {
            if (schedules) {
                res.status(200).json(schedules);
            }
            else {
                res.status(404).json({ message: 'No schedules found for user' });
            }
        })
            .catch(error => {
            res.status(500).json({ message: 'Internal server error' });
        });
    }
    getMaintenanceJobsByUser(req, res) {
        const username = req.params.username;
        user_1.default.findOne({ username: username })
            .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return Promise.reject('User not found'); // Reject the promise to stop the chain
            }
            return gardenSchedule_1.default.find({ 'user.username': user.username, description: 'Maintenance' });
        })
            .then(schedules => {
            if (schedules.length > 0) {
                res.status(200).json(schedules);
            }
            else {
                res.status(404).json({ message: 'No maintenance jobs found for user' });
            }
        })
            .catch(error => {
            if (error !== 'User not found') { // Avoid sending another response if user was not found
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.GardenScheduleController = GardenScheduleController;
