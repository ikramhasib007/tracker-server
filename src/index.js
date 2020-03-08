require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

const mongoURI = 'mongodb+srv://admin:pass@cluster0-nemyo.mongodb.net/trackers?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log('Yeah! mongoose instance connected');
});
mongoose.connection.on("error", (err) => {
  console.log('Error connecting to mongo', err);
});

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get('/', requireAuth, (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});