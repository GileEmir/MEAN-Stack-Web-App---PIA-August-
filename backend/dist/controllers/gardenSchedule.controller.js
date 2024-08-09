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
const company_1 = __importDefault(require("../models/company"));
const gardenSchedule_1 = __importDefault(require("../models/gardenSchedule"));
const user_1 = __importDefault(require("../models/user")); // Correctly import the UserM model
class GardenScheduleController {
    constructor() {
        this.scheduleGarden = (req, res) => {
            const { date, time, totalArea, gardenType, poolArea, greenArea, furnitureArea, fountainArea, tables, chairs, description, options, layout, company, user, rated } = req.body;
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
                rated: rated || false // Set the rated field to false by default if not provided
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
            console.log('cancelSchedule called with schedule:', schedule);
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
                console.log('Found schedule with id:', _id);
                const updatedSchedule = yield gardenSchedule_1.default.findByIdAndUpdate(_id, { canceled: true }, { new: true });
                if (!updatedSchedule) {
                    console.warn('Schedule not found for id:', _id);
                    res.status(404).json({ message: 'Schedule not found' });
                    return;
                }
                console.log('Schedule canceled successfully:', updatedSchedule);
                res.status(200).json({ message: 'Schedule canceled successfully', data: updatedSchedule });
            }
            catch (error) {
                console.error('Error canceling schedule:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        this.addCommentToCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Entered addCommentToCompany method with body:', req.body);
            const { companyId, user, comment, rating } = req.body;
            // Validate required fields
            if (!companyId || !user || !comment || rating == null) {
                console.log('Validation failed: companyId, user, comment, and rating are required');
                res.status(400).json({ message: 'companyId, user, comment, and rating are required' });
                return;
            }
            try {
                // Find the company by ID
                console.log('Finding company with ID:', companyId);
                const company = yield company_1.default.findById(companyId);
                if (!company) {
                    console.log('Company not found with ID:', companyId);
                    res.status(404).json({ message: 'Company not found' });
                    return;
                }
                // Create a new comment object
                const newComment = {
                    user,
                    comment,
                    rating,
                    date: new Date()
                };
                // Add the new comment to the company's comments array
                console.log('Adding new comment to company:', newComment);
                company.comments.push(newComment);
                yield company.save();
                // Respond with success message and updated company data
                console.log('Comment added successfully');
                res.status(200).json({ message: 'Comment added successfully', data: company });
            }
            catch (error) {
                console.error('Error adding comment to company:', error);
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
}
exports.GardenScheduleController = GardenScheduleController;
