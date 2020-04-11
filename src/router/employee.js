const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const Employee = require('../models/employee')

router.post('/employee/login', async(req,res)=>{
    try{
        const employee = await Employee.findByCredentials(req.body.username, req.body.password)
        const token= await employee.generateAuthToken()
        res.send({
            employee: employee,
            token: token
        })
    }catch(e){
        res.status(400).send('Login Unsuccessful!')
    }
})

router.post('/employee', async(req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password, 8)
    const employee = new Employee(req.body)
    
    try{
        await employee.save()
        const token = await employee.generateAuthToken()
        res.status(201).send({
            employee: employee,
            token:token
        })
    }
    catch(e){
        res.status(400).send(employee)
    }
})

router.get('/employees', async(req,res)=>{
    try{
        const employees = await Employee.find({})
        res.send(employees)
    }
    catch(e){
        res.status(500).send()
    }
})

router.delete('/employee/:id', async (req,res)=>{
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if(employee){
            res.send(employee)
        }else{
            res.status(404).send()
        }
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router