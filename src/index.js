const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config");
const conn = require("./db/conn");

app.use(cors({
    origin: function (origin, callback){
        callback(null, true);
    },
    methods: 'GET, POST',
    allowedHeaders: 'Accept, Content-Type',
    optionsSuccessStatus: 200,
    credentials: true
}));

// Setting API rate limit of requests
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // limit of requests per hour
    message: {error: "You have exceeded the request limit. Try again later."}
});

app.use(limiter);

(async () =>{

    try{
        await conn();
        
    }catch(err){
        console.error('Error establishing connection to the database:', err.message);
    }
})();

app.use(bodyParser.json());

const producersRoute = require("./routes/producers");
const songsRoute = require("./routes/songs");
const vocaloidsRoute = require("./routes/vocaloids");

app.use('/producers', producersRoute);
app.use('/songs', songsRoute);
app.use('/vocaloids', vocaloidsRoute);

app.listen(config.port, () =>{
    console.log("Server is running!");
});