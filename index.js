const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.json({
    message: 'meower 😹'
  });
});

app.post('/meowers', (request, response) => {
  console.log(request.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
