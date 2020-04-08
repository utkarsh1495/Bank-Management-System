const express = require('express')
const router = new express.Router()
const Employee = require('../models/employee')

router.post('/employee/login', async(req,res)=>{
    try{
        const employee = await Employee.findByCredentials(req.body.username, req.body.password)
        res.send(employee)
    }catch(e){
        res.status(400).send()
    }
})

router.post('/employee', async(req,res)=>{
    const employee = new Employee(req.body)

    try{
        await employee.save()
        res.status(201).send(employee)
    }
    catch(e){
        res.status(400).send(employee)
    }
})

module.exports = router