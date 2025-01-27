import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";
import { PORT } from "./config.js";
import dotenv from "dotenv";

// تحميل متغيرات البيئة من ملف .env
dotenv.config();

const app = express();

// Middleware لمعالجة بيانات JSON
app.use(express.json());

// Middleware للتعامل مع سياسة CORS
// السماح لجميع المصادر
app.use(
  cors({
    origin: "https://mern-stuck-h83r.vercel.app", // هذا هو النطاق الذي تريد السماح له
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
// إذا كنت تريد السماح لمصدر معين فقط
// app.use(
//   cors({
//     origin: "http://localhost:3000", // ضع هنا عنوان الـ Frontend
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// نقطة البداية
app.get("/", (req, res) => {
  console.log("Incoming Request:", req.method, req.url);
  res.status(200).send("Welcome to the MERN Stack Tutorial!");
});

// ربط مسار الكتب
app.use("/books", booksRoute);

// الاتصال بقاعدة البيانات وتشغيل السيرفر
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database successfully!");
    app.listen(PORT || 5555, () => {
      console.log(`Server is running on port: ${PORT || 5555}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // إنهاء التطبيق إذا فشل الاتصال
  });
