const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
const app = express();
require('dotenv').config();
const DB_URL = process.env.DB_URL;
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/user", userRouter);
app.use("/courses", courseRouter);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mainpage.html'));
});

async function main(){
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB successfully");
        
        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
}
main();