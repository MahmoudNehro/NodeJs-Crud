require('dotenv').config()
const sequelize = require("./database/database");
const express = require("express");
const userRoutes = require("./Routers/user");
const authRoutes = require("./Routers/auth");
const User = require('./Models/User');
const PORT = process.env.PORT || 5000;
const app = express();

sequelize.sync({ force: true }).then(async () => {
    const [user, created] = await User.findOrCreate({
        where: { email: process.env.ADMIN_EMAIL },
        defaults: {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            is_admin: true
        }
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/api", (request, response) => { response.status(200).json({ data: 'Home Page', message: 'Home Page' }); });
app.use("/api/users", userRoutes.routes);
app.use("/api/auth", authRoutes.routes);

app.use((request, response) => {
    response.status(404).json({ data: [], message: 'Request Not found' })
});
app.use((error, request, response, next) => {
    response.status(500).json({ Error: error + '' })
});