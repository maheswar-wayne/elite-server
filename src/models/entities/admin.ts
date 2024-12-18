import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['ADMIN', 'SUPERADMIN'],
            default: 'ADMIN',
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model('Admins', adminSchema);
export default Admin;
