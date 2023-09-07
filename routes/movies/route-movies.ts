import express from 'express';
import {
    selectAllMoviesQuery,
    selectMovieByIdQuery,
    insertMovieQuery,
    updateMovieQuery,
    deleteMovieQuery
} from '../../db/service/movies.service';

export const getMovies = async (req: express.Request, res: express.Response) => {
    const movies = await selectAllMoviesQuery();
    if (movies.length < 1) {
        return res.status(404).send('No data found');
    }
    return res.status(200).send(movies);
}

export const getDetailMovies = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const movie = await selectMovieByIdQuery(id);
    if (movie.length < 1) {
        return res.status(404).send('No data found');
    }
    return res.status(200).send(movie);
}

export const postAddMovies = async (req: express.Request, res: express.Response) => {
    const { title, year, rating, genre, image } = req.body;
    if (rating < 0 || rating > 5) {
        return res.status(400).send('Rating must be float number from 0 until 5');
    }
    const movie = await insertMovieQuery(title, year, rating, genre, image);
    if (movie === 'error') {
        return res.status(500).send('Internal Server Error');
    }
    return res.status(200).send(movie);
}

export const patchUpdateMovie = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const { title, year, rating, genre, image } = req.body;
    const movie = await updateMovieQuery(id, title, year, rating, genre, image);
    if (movie === 'error') {
        return res.status(500).send('Internal Server Error');
    }
    return res.status(200).send(movie);
}

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const movie = await deleteMovieQuery(id);
    if (movie === 'error') {
        return res.status(500).send('Internal Server Error');
    }
    return res.status(200).send(movie);
}
