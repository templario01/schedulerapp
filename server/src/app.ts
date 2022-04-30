import express, { Application } from 'express';
import morgan from 'morgan';
import passport from 'passport';



const app: Application = express();

// settings
app.set('port', 4000);

// // Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize())


// Routes


export default app;