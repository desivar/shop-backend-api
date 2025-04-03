const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop Backend API', // You can change the title here
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Look for Swagger docs in routes and controllers
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_here',
  resave: false,
  saveUninitialized: false,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the Pet Shop Backend API!');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});