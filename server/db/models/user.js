const mongoose = require('mongoose')

const validator = require('validator')
const connection = require('../mongoose')

const userSchema = new mongoose.Schema({
        firstName:{
                type: String,
                trim: true,
                required: true
        },
        lastName:{
                type: String,
                trim: true,
                required: true
        },
        email:{
                type: String,
                required: true,
                validate(value){
                        if(!validator.isEmail(value))
                                throw new Error('Invalid email!')
                }
        },
        tags:{
                type: [String],
                default: []
        }
        //Add ratings field if necessary
},{
        //For dev purposes
        timestamps: true
})

//Pre method for password to be added if needed
//Pre method for tags to be added to verify correctness

const User = connection.model('User', userSchema)

module.exports = User