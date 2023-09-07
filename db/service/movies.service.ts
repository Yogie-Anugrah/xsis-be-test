import { dbConnection } from '../db';

export const selectAllMoviesQuery = async () => {
    const client = await dbConnection.connect();
    try {
        const result = await client.query('SELECT * FROM movies');
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const selectMovieByIdQuery = async (id: number) => {
    const client = await dbConnection.connect();
    try {
        const result = await client.query('SELECT * FROM movies WHERE id = $1', [id]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const insertMovieQuery = async (title: string, year: number, rating: number, genre: string, image: string) => {
    const client = await dbConnection.connect();
    try {
        const result = await client.query('INSERT INTO movies (title, year, rating, genre) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, year, rating, genre, image]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const updateMovieQuery = async (id: number, title: string, year: number, rating: number, genre: string, image: string) => {
    const client = await dbConnection.connect();
    try {
        const result = await client.query('UPDATE movies SET title = $1, year = $2, rating = $3, genre = $4, image = $5 WHERE id = $6 RETURNING *', [title, year, rating, genre, image, id]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}

export const deleteMovieQuery = async (id: number) => {
    const client = await dbConnection.connect();
    try {
        const result = await client.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        return result.rows;
    } catch (err) {
        console.log(err);
        return 'error';
    }
}