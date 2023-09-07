"use strict";
// db connection created here use environment variable
Object.defineProperty(exports, "__esModule", { value: true });
exports.pg = void 0;
const pg_1 = require("pg");
exports.pg = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
