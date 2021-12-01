// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/AuthenticationSystem");
// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "error while connectiong to DB"));

// db.once("open", function () {
//   console.log("Succesfully connected to database");
// });

// module.exports = db;
// GauravAuthenticatonSystem
// fYH7-6*K.92NY7A

// establishing connection with cloud databse
const mongoose =require('mongoose');
const uri = "mongodb+srv://GauravAuthenticatonSystem:fYH7-6*K.92NY7A@cluster0.llpei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  
});
    const db = mongoose.connection;
    db.on('error',console.error.bind(console,'error in connecting to mongo db data base'));
    db.once('open',function(){
        console.log("succesfully connected to mongo db");
    });
module.exports = db;