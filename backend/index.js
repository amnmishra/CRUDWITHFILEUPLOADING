import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import studentRouter from './routes/studentRoute.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/student', studentRouter);

// DB Connection
const port = process.env.PORT || 5000;
const conn = process.env.DBURL;

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.error("Database connection error:", error);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
