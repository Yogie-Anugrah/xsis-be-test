import express from 'express';
import {
    selectAllMoviesQuery,
    selectMovieByIdQuery,
    insertMovieQuery,
    updateMovieQuery,
    deleteMovieQuery
} from '../../db/service/movies.service';
import { Movie } from '../../util/types';

export const getMovies = async (req: express.Request, res: express.Response) => {
    const movies: Movie[] = await selectAllMoviesQuery();
    if (movies.length < 1) {
        return res.status(404).send('No data found');
    }
    return res.status(200).send(movies);
}

export const getDetailMovies = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const movie: Movie[] = await selectMovieByIdQuery(id);
    if (movie.length < 1) {
        return res.status(404).send('No data found');
    }
    return res.status(200).send(movie);
}

export const postAddMovies = async (req: express.Request, res: express.Response) => {
    const { title, year, rating, genre, image } : Movie = req.body;
    if (rating < 0 || rating > 10) {
        return res.status(400).send('Rating must be float number from 0 and 10');
    }
    if (title === '') {
        return res.status(400).send('Title cannot be empty');
    }
    try {
        const movie: Movie[] = await insertMovieQuery(title, year, rating, genre, image);
        return res.status(201).send(movie);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

export const patchUpdateMovie = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const { title, year, rating, genre, image } : Movie = req.body;
    if (rating < 0 || rating > 10) {
        return res.status(400).send('Rating must be float number from 0 and 10');
    }
    if (title === '') {
        return res.status(400).send('Title cannot be empty');
    }
    try {
        const movie: Movie[] = await updateMovieQuery(id, title, year, rating, genre, image);
        return res.status(200).send(movie);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    try {
        const movie: Movie[] = await deleteMovieQuery(id);
        return res.status(200).send(movie);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}
