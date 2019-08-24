const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const isValid = (meower) => {
  const { name, content } = meower;
  return name && name.toString().trim() !== '' && content && content.toString().trim() !== '';
};

app.get('/', (request, response) => {
  response.json({
    message: 'meower 😹'
  });
});

app.post('/meowers', (request, response) => {
  console.log(request.body);
  if (isValid(request.body)) {
    const meower = {
      name: request.body.name.toString(),
      content: request.body.content.toString()
    }
  } else {
    response.status(422);
    response.json({
      message: 'Name and Content required!'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
