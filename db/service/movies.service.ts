// use db.ts to connect to database and use movies.service.ts to create query to database
// create acoring the routes in routes.ts

import { pg } from '../db';
export const selectAllMoviesQuery = async () => {
    try {
        const result = await pg.query('SELECT * FROM movies');
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const selectMovieByIdQuery = async (id: number) => {
    try {
        const result = await pg.query('SELECT * FROM movies WHERE id = $1', [id]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const insertMovieQuery = async (title: string, year: number, rating: number, genre: string) => {
    try {
        const result = await pg.query('INSERT INTO movies (title, year, rating, genre) VALUES ($1, $2, $3, $4) RETURNING *', [title, year, rating, genre]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const updateMovieQuery = async (id: number, title: string, year: number, rating: number, genre: string) => {
    try {
        const result = await pg.query('UPDATE movies SET title = $1, year = $2, rating = $3, genre = $4 WHERE id = $5 RETURNING *', [title, year, rating, genre, id]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const deleteMovieQuery = async (id: number) => {
    try {
        const result = await pg.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}