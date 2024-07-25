require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const errorMiddleware = require('./middlewares/error-middleware');
const authRoute = require('./router/auth-router');
const adminRoute=require("./router/admin-router");
const ratingRoute = require('./router/rating-router');
const connectDb = require('./utils/db');
const contactRoute=require("./router/contact-router");


const port = 5000;

const corOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credential: true,
};
app.use(cors(corOptions));
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/rate', ratingRoute);
app.use('/api/form',contactRoute);
app.use('/api/admin',adminRoute);
app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Database connection failed', error);
});
