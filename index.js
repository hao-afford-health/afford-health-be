const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');

app.use(express.json());
app.use(cors());

const convertRouter = require('./routes/convert');
app.use('/api/convert', convertRouter);

const eventsRouter = require('./routes/events');
app.use('/api/events', eventsRouter);

const filesRouter = require('./routes/files');
app.use('/api/files', filesRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})