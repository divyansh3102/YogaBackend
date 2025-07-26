import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const  app = express();

const allowedOrigins = ["http://localhost:5173","https://yoga-lac-eight.vercel.app"];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps, curl, etc.)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);
 

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

// Import routes
import userRoutes from './routes/user.routes.js';
import serviceRoutes from './routes/services.routes.js';
import medicineRoutes from './routes/medicine.routes.js';
import doctorRoutes from './routes/doctor.routes.js';
import emailRoutes from './routes/email.routes.js';

// Use routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/medicines", medicineRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/services", serviceRoutes);


export default app;