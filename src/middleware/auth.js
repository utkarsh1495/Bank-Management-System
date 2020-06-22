const jwt = require('jsonwebtoken')
const Employee = require('../models/employee')

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, 'thisismyfirstnodeapp')
        const user = await Employee.findOne({_id:data._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }
        
        //storing user and token(from the request headers) on req so that it can be accessed in the router
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error: "Please authenticate the user."})
    }
}

module.exports = auth