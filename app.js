require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT||3000 ;
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URI}/kpcc`).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/admin', require('./routes/adminRoutes'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
