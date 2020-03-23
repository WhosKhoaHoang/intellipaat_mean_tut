const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager_TUTORIAL",
                 { useNewUrlParser: true, useUnifiedTopology: true,
                   useFindAndModify: false })
    .then(()=>console.log("Database connected (MAKE SURE YOU RAN >sudo service mongod start!)"))
    .catch((error)=>console.log(error));

module.exports = mongoose;
