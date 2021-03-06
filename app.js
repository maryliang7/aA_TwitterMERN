const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const passport = require('passport');


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const user = new User({
    handle: 'jim',
    email: 'jim@jim.com',
    password: 'password'
  });
  user.save();
  res.send("Hello World!")
});

// app.user(passport.initialize());
// require('./config/passport')(passport);



app.use("/api/users", users);
app.use("/api/tweets", tweets);


app.listen(port, () => console.log(`Server is running on port ${port}`));