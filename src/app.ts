import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config"
import httpStatus from "http-status";
// import { prisma } from "./lib/prisma";
// import bcrypt from "bcryptjs";
import { userRouter } from "./modules/user/user.routes";
import { authRouters } from "./modules/auth/auth.routes";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandling";
import { PropertyRoutes } from "./modules/property/property.route";
import { LandlordPropertyRoutes } from "./modules/landlordProperty/landlordProperty.route";
import { CategoryRoutes } from "./modules/categories/category.routes";


const app : Application = express();

app.use(cors({
    origin : config.app_url,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get("/",async (req : Request,res:Response) =>{
    res.send("Hello World!");
})

app.use("/api/users",userRouter)
app.use("/api/auth",authRouters)
app.use("/api",PropertyRoutes)
app.use("/api/landlord",LandlordPropertyRoutes)
app.use("/api/categories", CategoryRoutes);

app.use(notFound)
app.use(globalErrorHandler)

export default app