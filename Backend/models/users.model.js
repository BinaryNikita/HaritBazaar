import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, 
        enum: ['user', "admin", 'vendor'],
        default: "user"},
    isActive: { type: Boolean, default: true },
    point: {type: mongoose.Schema.Types.Double, default: 0.0}
});

export const User = mongoose.model('User', UserSchema);
