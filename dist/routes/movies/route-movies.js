"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.patchUpdateMovie = exports.postAddMovies = exports.getDetailMovies = exports.getMovies = void 0;
const movies_service_1 = require("../../db/service/movies.service");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield (0, movies_service_1.selectAllMoviesQuery)();
    if (movies.length < 1) {
        return res.status(404).send('No data found');
    }
    return res.status(200).send(movies);
});
exports.getMovies = getMovies;
const getDetailMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const movie = yield (0, movies_service_1.selectMovieByIdQuery)(id);
    if (movie.length < 1) {
        return res.status(404).send('No data found');
    }
    return res.status(200).send(movie);
});
exports.getDetailMovies = getDetailMovies;
const postAddMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, year, rating, genre, image } = req.body;
    // check if rating only float number from 0 until 5
    if (rating < 0 || rating > 5) {
        return res.status(400).send('Rating must be float number from 0 until 5');
    }
    const movie = yield (0, movies_service_1.insertMovieQuery)(title, year, rating, genre, image);
    // if error when insert data to database return 500 
    if (movie === 'error') {
        return res.status(500).send('Internal Server Error');
    }
    return res.status(200).send(movie);
});
exports.postAddMovies = postAddMovies;
const patchUpdateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, year, rating, genre, image } = req.body;
    const movie = yield (0, movies_service_1.updateMovieQuery)(id, title, year, rating, genre, image);
    // if error when update data to database return 500 
    if (movie === 'error') {
        return res.status(500).send('Internal Server Error');
    }
    return res.status(200).send(movie);
});
exports.patchUpdateMovie = patchUpdateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const movie = yield (0, movies_service_1.deleteMovieQuery)(id);
    // if error when delete data to database return 500 
    if (movie === 'error') {
        return res.status(500).send('Internal Server Error');
    }
    return res.status(200).send(movie);
});
exports.deleteMovie = deleteMovie;
