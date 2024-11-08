import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        first_name: String,
        last_name: String,
        gender: String,
        address: String,
        phone_number: String,
        email: String,
        profile_pic: String,
        credit_card_number: String,
        type: String,
        status: String,
        companyId: { type: String, default: "" } // Add companyId field with default value null
    },
    {
        versionKey: false
    }
);

export default mongoose.model('UserM', userSchema, 'users');