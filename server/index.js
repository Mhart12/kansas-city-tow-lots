const bodyParser = require('body-parser')
const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(PORT, () => {
  console.error(`Listening on port ${PORT}`);
});
