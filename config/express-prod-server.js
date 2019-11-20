console.log('Starting production server');

const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));
app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
