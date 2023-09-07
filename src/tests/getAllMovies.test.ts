// this test is for getMovies function in route-movies.ts
import { getMovies } from '../routes/movies/route-movies';
import { Request, Response } from 'express';
import { selectAllMoviesQuery } from '../db/service/movies.service';
import { Movie } from '../util/types';

jest.mock('../db/service/movies.service');

describe('getMovies', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    const movies: Movie[] = [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            year: 1994,
            rating: 9.3,
            genre: 'drama',
            image: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm2606103040/'
        },
        {
            id: 2,
            title: 'The Godfather',
            year: 1972,
            rating: 9.2,
            genre: 'crime',
            image: 'https://www.imdb.com/title/tt0068646/mediaviewer/rm3896924160/'
        }
    ];

    it('should return all movies', async () => {
        (selectAllMoviesQuery as jest.Mock).mockResolvedValueOnce(movies);
        await getMovies(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(movies);
    });

    it('should return 404 if no data found', async () => {
        (selectAllMoviesQuery as jest.Mock).mockResolvedValueOnce([]);
        await getMovies(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('No data found');
    });
});