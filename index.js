const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("MongoDB runnning as well.."))
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json())

const cors = require("cors");




app.use(cors());
app.use(express.json());

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running....");
});
