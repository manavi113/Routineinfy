const express = require('express');
require('dotenv').config();
const cors = require('cors');
const homeRoute = require('./Routes/HomeRoutes');
const taskRoutes = require('./Routes/TaskRoutes');
const authRoutes = require('./Routes/AuthRoutes');
 
const prodRoute = require('./Routes/ProductRoutes');
const foodRoute = require('./Routes/FoodRoutes');
const app = express();
const connectDB = require('./Config/db');
const fs = require('fs');
const path = require('path');
const stepGoalRoutes = require("./Routes/StepGoalRoute");
 const waterRoutes = require('./Routes/DrinkWater');
const airoutes = require('./Routes/airoutes');
 

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', homeRoute);

// app.use('/taskapi', taskRoutes);

app.use('/api/auth', authRoutes);

 

app.use('/api/Prod', prodRoute);

app.use('/api/food', foodRoute);

app.use("/api/steps", stepGoalRoutes);

app.use('/api/water', waterRoutes);

// const airoutes = require('./Routes/ai.routes');
app.use("/ai", airoutes);

const Port = 2000;
app.listen(Port, ()=>{
    console.log(`Server is running at the port ${Port}`);
})


 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}




  

 


 