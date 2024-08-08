"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/gardenLayout.ts
const mongoose_1 = __importDefault(require("mongoose"));
const shapeSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ['square', 'rectangle', 'circle'],
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    size: Number, // Only for squares
    width: Number, // Only for rectangles
    height: Number, // Only for rectangles
    radius: Number, // Only for circles
    color: {
        type: String,
        required: true
    }
}, { _id: false });
const gardenLayoutSchema = new mongoose_1.default.Schema({
    shapes: [shapeSchema]
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('GardenLayout', gardenLayoutSchema, 'gardenLayouts');
