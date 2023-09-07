"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_movies_1 = require("./movies/route-movies");
const router = express_1.default.Router();
router.get('/movies', route_movies_1.getMovies);
router.get('/movies/:id', route_movies_1.getDetailMovies);
router.post('/movies', route_movies_1.postAddMovies);
router.patch('/movies/:id', route_movies_1.patchUpdateMovie);
router.delete('/movies/:id', route_movies_1.deleteMovie);
exports.default = router;
