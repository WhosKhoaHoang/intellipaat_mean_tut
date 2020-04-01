const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Note how if the connection to the database is successful,
// a "use" command seems to be called on whatever value we
// put after the hostname segment of the URL (in this case,
// that value is taskmanager_TUTORIAL)
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager_TUTORIAL",
                 { useNewUrlParser: true, useUnifiedTopology: true,
                   useFindAndModify: false })
    .then(()=>console.log("Database connected (MAKE SURE YOU RAN >sudo service mongod start!)"))
    .catch((error)=>console.log(error));

module.exports = mongoose;
