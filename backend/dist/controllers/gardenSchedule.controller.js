"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenScheduleController = void 0;
const gardenSchedule_1 = __importDefault(require("../models/gardenSchedule"));
class GardenScheduleController {
    constructor() {
        this.scheduleGarden = (req, res) => {
            console.log('Received request body:', req.body);
            const { date, time, totalArea, gardenType, poolArea, greenArea, furnitureArea, fountainArea, tables, chairs, description, options, layout } = req.body;
            // Validate required fields
            if (!date || !time || !totalArea || !gardenType) {
                console.error('Validation error: Missing required fields');
                return res.status(400).json({ message: 'date, time, totalArea, and gardenType are required' });
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
                layout // Include the layout field
            });
            newSchedule.save()
                .then(savedSchedule => {
                console.log('Garden schedule saved successfully:', savedSchedule);
                res.status(201).json({ message: 'Garden scheduling successful', data: savedSchedule });
            })
                .catch(error => {
                console.error('Error saving garden schedule:', error);
                res.status(500).json({ message: 'Internal server error' });
            });
        };
    }
    getAllSchedules(req, res) {
        gardenSchedule_1.default.find()
            .then(schedules => {
            res.status(200).json(schedules);
        })
            .catch(error => {
            console.error('Error fetching garden schedules', error);
            res.status(500).json({ message: 'Internal server error' });
        });
    }
}
exports.GardenScheduleController = GardenScheduleController;
