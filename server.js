const http = require("http");
const express = require('express');
const connectdatabase = require("./src/config/database");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname +"/public"));

const routerUser = require("./src/routers/routerUser");
const routerpost = require("./src/routers/routerPost");
const royterImage = require("./src/routers/RouterImage");
const logIn = require("./src/routers/TokenRouter");

app.use("/",routerUser());
app.use("/product", routerpost());
app.use("/s", royterImage());
app.use("/login", logIn());



connectdatabase();
http.createServer(app).listen(PORT, () => console.log(`Server listening on port ${PORT}`));
