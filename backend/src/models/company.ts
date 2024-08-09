import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
    {
        name: String,
        address: String,
        phone_number: String,
        email: String,
        website: String,
        logo: String,
        description: String,
        averageRating: Number,
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserM' },
        services: [String],
        pricing: String,
        comments: [{
            user: String,
            comment: String,
            rating: Number,
            date: { type: Date, default: Date.now }
        }],
        location: {
            type: { type: String, enum: ['Point'], required: true },
            coordinates: { type: [Number], required: true }
        }
    },
    {
        versionKey: false
    }
);

companySchema.index({ location: '2dsphere' });

export default mongoose.model('Company', companySchema, 'companies');