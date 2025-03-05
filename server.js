const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, Express Backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
