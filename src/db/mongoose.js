const mongoose = require('mongoose')
const connectionUrl = 'mongodb+srv://Practice:Mongo@123@cluster0.sdnmw.mongodb.net/demoBankApp?retryWrites=true&w=majority'

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})