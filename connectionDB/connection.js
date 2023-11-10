const mongoose = require("mongoose")

const connection = () => {
    return mongoose.connect("mongodb+srv://itifinal:itifinal@myatlasclusteredu.2ru7gca.mongodb.net").then((res) => {
        console.log("DB connected")
    }).catch((err) => {
        console.log("error in db", err)
    })
}


module.exports = connection

//mongodb+srv://itifinal:itifinal@myatlasclusteredu.2ru7gca.mongodb.net
//mongodb://127.0.0.1:27017/tourismProject