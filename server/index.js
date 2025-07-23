const express = require("express")
const mongoose = require("mongoose")
const dotenv= require("dotenv").config()
const cors = require("cors")
const upload= require("express-fileupload")
const {notFound, errorHandler} = require
("./middleware/errorMiddleware")
const routes = require('./routes/routes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes') 
const messageRoutes = require('./routes/messageRoutes') 
const memberRoutes = require('./routes/memberRoutes');  
const friendRoutes = require("./routes/friendRoutes")
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const app= express()
connectDB();

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))
app.use(cors({credentials: true}))
app.use(upload())


app.use('/api', routes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use ('/api', messageRoutes);
app.use('/api', memberRoutes);
app.use('/api/friends', friendRoutes);
app.use('/uploads', express.static('public/uploads')); // Serve static files from the uploads directory

app.use(notFound);
app.use(errorHandler);



mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
