"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gardenLayout_1 = __importDefault(require("./gardenLayout")); // Import the GardenLayout schema
const gardenScheduleSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    totalArea: {
        type: Number,
        required: true
    },
    gardenType: {
        type: String,
        enum: ['private', 'restaurant'],
        required: true
    },
    poolArea: {
        type: Number,
        default: 0
    },
    greenArea: {
        type: Number,
        default: 0
    },
    furnitureArea: {
        type: Number,
        default: 0
    },
    fountainArea: {
        type: Number,
        default: 0
    },
    tables: {
        type: Number,
        default: 0
    },
    chairs: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    options: {
        type: Map,
        of: Boolean,
        default: {}
    },
    layout: {
        type: gardenLayout_1.default.schema, // Reference the GardenLayout schema
        required: false
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('GardenSchedule', gardenScheduleSchema, 'gardenSchedules');
