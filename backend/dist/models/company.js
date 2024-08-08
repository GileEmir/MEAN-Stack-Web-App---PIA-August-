"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const companySchema = new mongoose_1.default.Schema({
    name: String,
    address: String,
    phone_number: String,
    email: String,
    website: String,
    logo: String,
    description: String,
    averageRating: Number,
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserM' },
    services: [String],
    pricing: String,
    comments: [{ user: String, comment: String, date: Date }],
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    }
}, {
    versionKey: false
});
companySchema.index({ location: '2dsphere' });
exports.default = mongoose_1.default.model('Company', companySchema, 'companies');
