import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    picUrl: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        default:0
    }
});

const studentModel = mongoose.model('Students', StudentSchema);
export default studentModel;
