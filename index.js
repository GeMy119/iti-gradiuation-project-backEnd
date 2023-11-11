const express = require('express')
const cors = require("cors")
const connection = require('./connectionDB/connection')
const userRouter = require('./modules/users/router/user.router')
const hotelRouts = require('./modules/hotels/routes')
const carRouts = require('./modules/car/router')
const EventRouts = require('./modules/events/routes')
const resturantRouts = require('./modules/resturant/router')
const visitRouts = require('./modules/visitplace/router')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
app.use(express.urlencoded({ extended: false }));

app.use(express.json())
app.use(cors())
connection()
app.use(userRouter)
app.use(hotelRouts)
app.use(carRouts)
app.use(EventRouts)
app.use(resturantRouts)
app.use(visitRouts)


app.listen(port, () => {
    console.log("app running in port " + port)
})