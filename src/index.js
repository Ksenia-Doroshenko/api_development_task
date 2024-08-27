import express from 'express';
import {routes} from './api/index.js';

const app = express();
const PORT = 8000;

app.use('/api', routes.router);

app.get('/', (req, res) => {
    res.send('Hello World!')

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});