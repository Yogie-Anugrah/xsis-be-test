import { getDetailMovies } from '../routes/movies/route-movies';
import { Request, Response } from 'express';
import { selectMovieByIdQuery } from '../db/service/movies.service';
import { Movie } from '../util/types';

jest.mock('../db/service/movies.service');

describe('getDetailMovies', () => {
    const req: Partial<Request> = {
        params: {
            id: "1"
        }
    };
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    const movie: Movie[] = [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            year: 1994,
            rating: 9.3,
            genre: 'drama',
            image: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm2606103040/'
        }
    ];

    it('should return movie by id', async () => {
        (selectMovieByIdQuery as jest.Mock).mockResolvedValueOnce(movie);
        await getDetailMovies(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(movie);
    });

    it('should return 404 if no data found', async () => {
        (selectMovieByIdQuery as jest.Mock).mockResolvedValueOnce([]);
        await getDetailMovies(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('No data found');
    });
});