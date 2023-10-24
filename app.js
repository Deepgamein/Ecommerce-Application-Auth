const express = require('express')
const PORT=process.env.PORT || 1000;
const morgan = require('morgan');
const route = require('./route/authRoute');
const app = express()
const cors = require('cors')
app.use(cors())


require('dotenv').config()
app.use(morgan('combined'))

app.use(express.json())
app.use(route)


// app.get("/",(req, res) =>{
//     res.send("welcome to my app");
// })


app.listen(PORT, () =>{
    console.log(`server is running on ${process.env.DEV_MODE} mode ${"http://localhost:1000"}`)
})
