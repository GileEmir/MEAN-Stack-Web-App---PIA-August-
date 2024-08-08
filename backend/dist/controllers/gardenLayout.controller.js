"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenLayoutController = void 0;
const gardenLayout_1 = __importDefault(require("../models/gardenLayout"));
class GardenLayoutController {
    saveLayout(req, res) {
        const { shapes } = req.body;
        // Validate required fields
        if (!shapes || !Array.isArray(shapes)) {
            console.error('Validation error: Missing required fields');
            return res.status(400).json({ message: 'shapes are required and should be an array' });
        }
        const newLayout = new gardenLayout_1.default({ shapes });
        newLayout.save()
            .then(savedLayout => {
            console.log('Garden layout saved successfully:', savedLayout);
            res.status(201).json({ message: 'Garden layout saved successfully', data: savedLayout });
            return savedLayout;
        })
            .catch(error => {
            console.error('Error saving garden layout:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        });
    }
}
exports.GardenLayoutController = GardenLayoutController;
