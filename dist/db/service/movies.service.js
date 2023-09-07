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
exports.deleteMovieQuery = exports.updateMovieQuery = exports.insertMovieQuery = exports.selectMovieByIdQuery = exports.selectAllMoviesQuery = void 0;
const db_1 = require("../db");
const selectAllMoviesQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.dbConnection.connect();
    try {
        const result = yield client.query('SELECT * FROM movies');
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.selectAllMoviesQuery = selectAllMoviesQuery;
const selectMovieByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.dbConnection.connect();
    try {
        const result = yield client.query('SELECT * FROM movies WHERE id = $1', [id]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.selectMovieByIdQuery = selectMovieByIdQuery;
const insertMovieQuery = (title, year, rating, genre, image) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.dbConnection.connect();
    try {
        const result = yield client.query('INSERT INTO movies (title, year, rating, genre) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, year, rating, genre, image]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.insertMovieQuery = insertMovieQuery;
const updateMovieQuery = (id, title, year, rating, genre, image) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.dbConnection.connect();
    try {
        const result = yield client.query('UPDATE movies SET title = $1, year = $2, rating = $3, genre = $4, image = $5 WHERE id = $6 RETURNING *', [title, year, rating, genre, image, id]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.updateMovieQuery = updateMovieQuery;
const deleteMovieQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.dbConnection.connect();
    try {
        const result = yield client.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
});
exports.deleteMovieQuery = deleteMovieQuery;
