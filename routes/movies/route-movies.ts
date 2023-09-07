// routes for movies that call query in db/service/movies.service.ts

import express from 'express';
import {
    selectAllMoviesQuery,
    selectMovieByIdQuery,
    insertMovieQuery,
    updateMovieQuery,
    deleteMovieQuery
} from '../../db/service/movies.service';

// const router = express.Router();

export const getMovies = async (req: express.Request, res: express.Response) => {
    const movies = await selectAllMoviesQuery();
    if (movies.length < 1) {
        res.status(404).send('No data found');
    }
    res.status(200).send(movies);
}

export const getDetailMovies = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const movie = await selectMovieByIdQuery(id);
    if (movie.length < 1) {
        res.status(404).send('No data found');
    }
    res.status(200).send(movie);
}

export const postAddMovies = async (req: express.Request, res: express.Response) => {
    const { title, year, rating, genre } = req.body;
    const movie = await insertMovieQuery(title, year, rating, genre);
    // if error when insert data to database return 500 
    if (movie === 'error') {
        res.status(500).send('Internal Server Error');
    }
    res.status(200).send(movie);
}

export const patchUpdateMovie = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const { title, year, rating, genre } = req.body;
    const movie = await updateMovieQuery(id, title, year, rating, genre);
    // if error when update data to database return 500 
    if (movie === 'error') {
        res.status(500).send('Internal Server Error');
    }
    res.status(200).send(movie);
}

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const movie = await deleteMovieQuery(id);
    // if error when delete data to database return 500 
    if (movie === 'error') {
        res.status(500).send('Internal Server Error');
    }
    res.status(200).send(movie);
}
