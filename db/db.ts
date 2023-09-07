import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const dbConnection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

dbConnection.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        console.log(`Connected to Database: ${result.rows[0].now}`)
    })
})

dbConnection.query('SET search_path TO public', (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack)
    }
    console.log('Set search_path to public')
})

dbConnection.query('SELECT current_database()', (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack)
    }
    console.log('Current DB name:')
    console.log(result.rows)
})

dbConnection.query('SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'', (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack)
    }
    console.log('List of tables in public schema:')
    console.log(result.rows)
})