import express, { Application } from 'express';
import morgan from 'morgan';
import postRouters from './routes/post.routes';
import authRouters from './routes/auth.routes';
import passport from 'passport';
import JWTStrategy from './middlewares/passport-jwt';


const app: Application = express();

// settings
app.set('port', 4000);

// // Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize())
passport.use('my-auth-jwt',JWTStrategy)

// Routes
app.use('/auth/', authRouters)
app.use('/tasks/', postRouters)


export default app;