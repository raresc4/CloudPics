const express = require('express');
const { manageConnection, debug } = require('./config/mongo.js');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require("cookie-parser");


const app = express();
const port = 4949;

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true                 
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = require('./api/index.js');

app.use('/api', api);

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`),
    await manageConnection.openConnection();
});