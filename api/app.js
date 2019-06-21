const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome To Todo'
  });
});


app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
});