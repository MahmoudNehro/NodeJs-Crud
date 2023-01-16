require('dotenv').config()
const sequelize = require("./database/database");
const express = require("express");
const userRoutes = require("./Routers/user");
const PORT = process.env.PORT || 5000;
const app = express();

sequelize.sync().then(async () => { });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/api", (request, response) => { response.status(200).json({ data: 'Home Page', message: 'Home Page' }); });
app.use("/api/users", userRoutes.routes);
app.use((request, response) => {
    response.status(404).json({ data: [], message: 'Request Not found' })
});
app.use((error, request, response, next) => {
    response.status(500).json({ Error: error + '' })
});