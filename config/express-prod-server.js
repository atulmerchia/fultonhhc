const port = process.env.port || 3000;
const express = require('express');
const app = express();

app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(port, () => console.log(`Server running on port ${port}!`));
