const express = require("express");
const MovieModel = require("../Model/movie.model")
const movieRouter = express.Router();

movieRouter.post("/movieData", async (req, res) => {
    try {
        const data = req.body;
        const movie = new MovieModel(data);
        await movie.save();
        res.status(201).send(movie);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

movieRouter.get("/getMovie", async (req, res) => {
    try {
        let filter = {};
        let sortBy = {};

        if (req.query.title){
            filter.title = { $regex: req.query.title, $options: 'i' };
        }

     
        if (req.query.rating) {
            filter.rating = req.query.rating;
        }

        if (req.query.q) {
            filter.title = { $regex: req.query.q, $options: 'i' };
        }

       
        if (req.query.sortBy) {
            sortBy[req.query.sortBy] = 1; 
        }

        const movies = await MovieModel.find(filter).sort(sortBy);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

movieRouter.patch("/updateMovie/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const updatedMovie = await MovieModel.findByIdAndUpdate({_id:id}, data);
        res.status(200).send("Movie updated.")
    }catch(error){
        res.status(500).send(error.message);
    }
})

movieRouter.delete("/deleteMovie/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const deletedMovie = await MovieModel.findByIdAndDelete({_id:id});
        res.status(200).send("Movie deleted.")
    }catch(error){
        res.status(500).send(error.message);
    }
})