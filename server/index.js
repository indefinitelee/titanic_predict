const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('public'));
app.listen(PORT, () => console.log(`serving titanic app on ${PORT}`));