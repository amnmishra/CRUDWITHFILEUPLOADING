import studentModel from '../model/studentsModel.js';

export const students = async (req, res) => {
    try {
        const students = await studentModel.find();
        res.json(students);
    } catch (err) {
        res.json(err);
    }
};

export const registration = async (req, res) => {
    try {
        const { name, email, phone, dob, marks } = req.body;
        const picUrl = req.file ? req.file.path : '';

        const newStudent = new studentModel({
            name,
            email,
            phone,
            dob,
            picUrl,
            marks
        });

        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateMarks = async (req, res) => {
    const { id } = req.params;
    const { marks } = req.body;

    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            id,
            { marks },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error updating marks:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const uploadProfilePic = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({ message: "File uploaded successfully", file: req.file });
};
