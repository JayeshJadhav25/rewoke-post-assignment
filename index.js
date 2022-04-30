const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;
const connection = require('./database/db');
connection.connect((err) => {
    if (err) throw err;
    console.log("Database Connected!");
});

const postRoute = require('./router/postRoute');
const commentRoute = require('./router/commentRoute');
const userRoute = require('./router/userRoute');
app.use(express.json())

app.use('/post',postRoute);

app.use('/comment',commentRoute);

app.use('/user',userRoute);

app.listen(PORT,() => {
    console.log(`server is running at ${PORT}....`)
})