import {Constants} from "./constants";
import {Express} from "express";

const path = require('path');
const express = require('express');

const app: Express = express();

app.use(express.json({ extended: true }));
app.use('/api', require('./routes/routes'));

// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'client', 'build')))
//
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

app.listen(Constants.PORT, () => console.log(`Server is listening on port ${Constants.PORT}...`));
