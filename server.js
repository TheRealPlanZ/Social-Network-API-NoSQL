const routes = require('./routes');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});