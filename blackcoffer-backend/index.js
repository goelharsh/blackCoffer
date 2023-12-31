const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
const PORT = process.env.port || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
// Increase payload size limit
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// mongodbconnection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connection established');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.use(require("./routes/analyticsData"));




app.listen(PORT, () => {
  console.log("Server is running port no " + PORT);
});