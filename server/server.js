const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors=require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors());

const port = 5000 || process.env.PORT;


//routes=>
app.use('/user', require('./routes/userRoute.js'));
app.use('/jobs', require('./routes/jobsRoute.js'));
app.use('/applications', require('./routes/applicationsRoute.js'));


// mongodb connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI).then(() => {console.log('Connected to MongoDB')}).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.json({"msg":"Welcome to MERN Stack"});
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 


