import express from 'express';
import {routes} from './api/index.js';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', routes.router);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});