const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const employeeSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

//Instance method
employeeSchema.methods.generateAuthToken = async function (){
    const employee = this
    const token = jwt.sign({ _id: employee._id.toString()},'thisismyfirstnodeapp')

    employee.tokens = employee.tokens.concat({token})
    await employee.save()
    return token
}

//Model method
employeeSchema.statics.findByCredentials = async (username, password)=>{
    const employee = await Employee.findOne({username})

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