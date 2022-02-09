const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// connect with mongodb by mongoose
mongoose
  .connect("mongodb://localhost:27017/Goditect")
  .then(() => console.log("Mongodb is connected !"))
  .catch(() => console.log("Sorry Mongodb has error !"));

//   Server run

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is start... !");
});
