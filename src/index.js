const express = require('express')
//This is required for starting MongoDB
require('./db/mongoose')
const app = express()
//Hiroku can also be tried
const port = 3000
const accountsRouter = require('../src/router/account')
const employeeRouter = require('./router/employee')

//Parse incoming request from json
app.use(express.json())
app.use(accountsRouter)
app.use(employeeRouter)

app.listen(port, ()=>{
    console.log('server is up on port', port)
})

// const bcrypt = require('bcryptjs')

// const myFunc = async ()=>{
//     const password = "Abcd1234!"
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const IsMatch = await bcrypt.compare('abcd1234!', hashedPassword)
//     console.log(IsMatch)
// }

// myFunc()