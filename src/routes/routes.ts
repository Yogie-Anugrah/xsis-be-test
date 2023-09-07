import express from 'express';
import { getMovies, 
    getDetailMovies, 
    postAddMovies, 
    patchUpdateMovie, 
    deleteMovie
} from './movies/route-movies'

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getDetailMovies);
router.post('/movies', postAddMovies);
router.patch('/movies/:id', patchUpdateMovie);
router.delete('/movies/:id', deleteMovie);

export default router;