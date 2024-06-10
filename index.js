const express = require("express");
const connection = require("./Config/db");
const movieRouter = require("./Route/movie.route")

const server = express();
server.use(express.json());
server.use("/movies",movieRouter);

server.listen(3000,async() => {
    try{
        await connection;
        console.log("Server is running on 3000 and db is connected");
    }catch(err){
        console.log(err);
    }
})

