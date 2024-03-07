const express = require('express');
const jwt = require('jsonwebtoken');
const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/user');
const authorize = require('./src/security/token');

const app = express();

app.use(express.json());

app.use('/v1/admin', authorize, adminRoutes);
app.use('/v1/user', authorize, userRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
