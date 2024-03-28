const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    category:{
        type: String,
    },
    postion:{
        type: String,
    },
    phone:{
        type: String,
    },
    instagram:{
        type: String,
    },
    facebook:{
        type: String,
    },
    youtube:{
        type: String,
    },
    email:{
        type: String,
    },
    address:{
        type: String,
        
    },
    image:{
        type: String,
    },
    description:{
        type: String,
    },
    link:{
        type: String,
    },
    indexNo:{
        type: String,
    }
})

module.exports = mongoose.model('Organization', organizationSchema)