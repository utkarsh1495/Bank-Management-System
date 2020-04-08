const mongoose = require('mongoose')
const validator = require('validator')

const Account = mongoose.model('Account',{
    acno: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    deposit:{
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Deposit should be positive')
            }
        }
    }
})

module.exports = Account