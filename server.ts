import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import db_connection from './source/config/dbconnection';
import dotenv from 'dotenv';
import { secrets } from './source/config/secrets';
import { Routes as api } from './source/routes.index'
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: secrets.SESSION_SECRET
}));

app.on('error', (err) => {
    console.error(`Express server error ${err}`);
});

const PORT = secrets.PORT;
app.listen(PORT, () => {
    console.info(`magic happens here on port ${PORT}`);
    db_connection();
});

//API route
app.use('/api/v1', api);

//server default response
app.get('/', (req, res) => {
    res.status(200).send('<p style="text-align: center; font-weight: 600">Welcome to Korapay RESTful web service</p>');
})

export { app as server };