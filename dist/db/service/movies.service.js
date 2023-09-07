"use strict";
// use db.ts to connect to database and use movies.service.ts to create query to database
// create acoring the routes in routes.ts
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
exports.deleteMovieQuery = exports.updateMovieQuery = exports.insertMovieQuery = exports.selectMovieByIdQuery = exports.selectAllMoviesQuery = void 0;
const db_1 = require("../db");
const selectAllMoviesQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pg.query('SELECT * FROM movies');
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.selectAllMoviesQuery = selectAllMoviesQuery;
const selectMovieByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pg.query('SELECT * FROM movies WHERE id = $1', [id]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.selectMovieByIdQuery = selectMovieByIdQuery;
const insertMovieQuery = (title, year, rating, genre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pg.query('INSERT INTO movies (title, year, rating, genre) VALUES ($1, $2, $3, $4) RETURNING *', [title, year, rating, genre]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.insertMovieQuery = insertMovieQuery;
const updateMovieQuery = (id, title, year, rating, genre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pg.query('UPDATE movies SET title = $1, year = $2, rating = $3, genre = $4 WHERE id = $5 RETURNING *', [title, year, rating, genre, id]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.updateMovieQuery = updateMovieQuery;
const deleteMovieQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pg.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.deleteMovieQuery = deleteMovieQuery;
