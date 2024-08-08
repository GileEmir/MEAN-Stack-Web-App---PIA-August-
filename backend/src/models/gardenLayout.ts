// models/gardenLayout.ts
import mongoose from 'mongoose';

const shapeSchema = new mongoose.Schema({
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

const gardenLayoutSchema = new mongoose.Schema({
  shapes: [shapeSchema]
}, {
  versionKey: false
});

export default mongoose.model('GardenLayout', gardenLayoutSchema, 'gardenLayouts');