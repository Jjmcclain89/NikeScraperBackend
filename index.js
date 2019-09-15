const express = require('express');
const mongoose = require('mongoose');
const getNikeData = require('./lib/getNikeData');
const app = express();
const PORT = 3000;

// mongoose.connect(process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);
app.get('/', async (req, res) => {
	data = await getNikeData();
	res.json({ data });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
