// this is jest test to test the routes.ts file
import { getMovies, postAddMovies, patchUpdateMovie, deleteMovie } from '../routes/movies/route-movies';
import { Request, Response } from 'express';

jest.mock('../routes/movies/route-movies');

describe('routes', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };

    it('should call getMovies', async () => {
        await getMovies(req as Request, res as Response);
        expect(getMovies).toHaveBeenCalled();
    });

    it('should call postAddMovies', async () => {
        await postAddMovies(req as Request, res as Response);
        expect(postAddMovies).toHaveBeenCalled();
    });

    it('should call putUpdateMovies', async () => {
        await patchUpdateMovie(req as Request, res as Response);
        expect(patchUpdateMovie).toHaveBeenCalled();
    });

    it('should call deleteMovies', async () => {
        await deleteMovie(req as Request, res as Response);
        expect(deleteMovie).toHaveBeenCalled();
    });
});