const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const employeeSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

employeeSchema.statics.findByCredentials = async (username, password)=>{
    const employee = await Employee.findOne(username)

    if(!employee){
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, employee.password)

    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return employee
}

const Employee = mongoose.model('Employee',employeeSchema)

module.exports = Employee