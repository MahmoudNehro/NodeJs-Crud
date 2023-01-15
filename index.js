const sequelize = require("./database/database");
const express = require("express");
const userRoutes = require("./Routers/user");
sequelize.sync({ force: true }).then(async () => { });
const app = express();
app.use(express.json());
app.use("/api", userRoutes.routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { });