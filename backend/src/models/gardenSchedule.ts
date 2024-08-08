import mongoose from 'mongoose';
import GardenLayout from './gardenLayout'; // Import the GardenLayout schema

const gardenScheduleSchema = new mongoose.Schema(
  {
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
      type: GardenLayout.schema, // Reference the GardenLayout schema
      required: false
    }
  },
  {
    versionKey: false
  }
);

export default mongoose.model('GardenSchedule', gardenScheduleSchema, 'gardenSchedules');