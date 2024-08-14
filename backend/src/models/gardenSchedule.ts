import mongoose from 'mongoose';
import GardenLayout from './gardenLayout'; // Import the GardenLayout schema
import Company from './company'; // Import the Company schema
import User from './user'; // Import the User schema

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
    },
    company: {
      type: Company.schema, // Reference the Company schema
      required: true
    },
    user: {
      type: User.schema, // Reference the User schema
      required: true
    },
    canceled: {
      type: Boolean,
      default: false
    },
    rated: {
      type: Boolean,
      default: false
    },
    workerId: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'refused'],
      default: 'pending'
    },
    refusedBy: {
      type: [
        {
          username: String,
          comment: String
        }
      ],
      default: []
    },
    completionPhoto: {
      type: String
    },
    completionDate: {
      type: String
    },
    dateOfCompletionPhotoUpload:{
      type: String,
      default: ''
    },
    estimatedCompletionDate:{
      type: String,
      default: ''
    }
  },
  {
    versionKey: false
  }
);

export default mongoose.model('GardenSchedule', gardenScheduleSchema, 'gardenSchedules');