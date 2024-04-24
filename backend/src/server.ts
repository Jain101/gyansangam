import express from 'express';
import { signUp, logIn } from './handlers/user';
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'

const app = express();
const port = 3000;

app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // allows client to send json data to server
app.use(express.urlencoded({ extended: true })) // converts url encoded data to json

app.get('/', (req, res) => {
    res.send('Hello MITS!');
});

app.use('/api', protect, router)

app.post('/signup', signUp) // sign up
app.post('/login', logIn)   // sign in

export default app;

