const routes = require('./api/index.js');

const express = require("express");
const app = express();
const PORT = 8000;

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});