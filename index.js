const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const monk = require('monk');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

const app = express();
const db = monk(process.env.MONGO_URI, { useUnifiedTopology: true });
const meowers = db.get('meowers');

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

app.get('/meowers', (request, response) => {
  meowers.find().then(meowers => response.json(meowers));
});

const limiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  max: 1 //limit each IP to 1 request per windowMs
});

app.use(limiter);

app.post('/meowers', (request, response) => {
  //console.log(request.body);
  if (isValid(request.body)) {
    const meower = {
      name: request.body.name.toString(),
      content: request.body.content.toString(),
      created: new Date()
    }

    meowers.insert(meower).then(createdMeower => response.json(createdMeower));
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
