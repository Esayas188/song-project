require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const songrouter = require("./routes/song");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", songrouter);

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb..");
    app.listen(process.env.PORT, () => {
      console.log("listening on port 4000...");
    });
  });
