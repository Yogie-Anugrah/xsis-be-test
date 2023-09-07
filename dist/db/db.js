"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dbConnection = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
exports.dbConnection.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        // print the db name using console.log
        console.log(`Connected to Database: ${result.rows[0].now}`);
    });
});
// set db to use public shema
exports.dbConnection.query('SET search_path TO public', (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack);
    }
    console.log('Set search_path to public');
});
// show current DB name
exports.dbConnection.query('SELECT current_database()', (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack);
    }
    console.log('Current DB name:');
    console.log(result.rows);
});
// list all tables in public schema
exports.dbConnection.query('SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'', (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack);
    }
    console.log('List of tables in public schema:');
    console.log(result.rows);
});
