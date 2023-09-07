import { patchUpdateMovie } from '../routes/movies/route-movies';
import { Request, Response } from 'express';
import { updateMovieQuery } from '../db/service/movies.service';

jest.mock('../db/service/movies.service');

describe('patchUpdateMovie', () => {
    const validRequestBody: Partial<Request> = {
        params: {
            id: '1'
        },
        body: {
            title: 'The Shawshank Redemption',
            year: 1994,
            rating: 9.3,
            genre: 'drama',
            image: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm2606103040/'
        }
    };

    const emptyTitleRequestBody: Partial<Request> = {
        params: {
            id: '1'
        },
        body: {
            title: '', // Empty title
            year: 1994,
            rating: 9.3,
            genre: 'drama',
            image: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm2606103040/'
        }
    };

    const highRatingRequestBody: Partial<Request> = {
        params: {
            id: '1'
        },
        body: {
            title: 'The Shawshank Redemption',
            year: 1994,
            rating: 11, // Rating more than 10
            genre: 'drama',
            image: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm2606103040/'
        }
    };
    
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };

    const successfulMovieUpdateResponse = {
        id: 1,
        title: 'The Shawshank Redemption',
        year: 1994,
        rating: 9.3,
        genre: 'drama',
        image: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm2606103040/'
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock function calls before each test
    });

    it('should return 200 if movie update is successful', async () => {
        (updateMovieQuery as jest.Mock).mockResolvedValueOnce(successfulMovieUpdateResponse);
        await patchUpdateMovie(validRequestBody as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(successfulMovieUpdateResponse);
    });

    it('should return 400 if title is empty', async () => {
        await patchUpdateMovie(emptyTitleRequestBody as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Title cannot be empty');
    });

    it('should return 400 if rating is more than 10', async () => {
        await patchUpdateMovie(highRatingRequestBody as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Rating must be float number from 0 and 10');
    });

    it('should return 500 if movie update throws an error', async () => {
        (updateMovieQuery as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
        await patchUpdateMovie(validRequestBody as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
});
