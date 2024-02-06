const mongoose = require('mongoose');


const connectionUrl = process.env.MONGO_DB_URL;

mongoose.connect(connectionUrl + '/task-manager-api',{
    useNewUrlParser : true,
    useUnifiedTopology: true
})

