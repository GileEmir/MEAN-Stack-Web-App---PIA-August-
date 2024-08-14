"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const companySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: false },
    email: { type: String, required: false },
    website: { type: String, required: false },
    description: { type: String, required: false },
    averageRating: { type: Number, default: 0 },
    services: { type: [String], required: false },
    pricing: { type: String, required: false },
    comments: [{
            user: { type: String, default: '' },
            comment: { type: String, default: '' },
            rating: { type: Number, default: 0 },
            date: { type: Date, default: Date.now }
        }],
    location: {
        type: { type: String, enum: ['Point'], required: false, default: 'Point' },
        coordinates: { type: [Number], required: false, default: [0, 0] }
    },
    annualLeaveStart: { type: Date, required: false },
    annualLeaveEnd: { type: Date, required: false }
}, { versionKey: false });
companySchema.index({ location: '2dsphere' });
exports.default = mongoose_1.default.model('Company', companySchema, 'companies');
