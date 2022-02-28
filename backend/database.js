// Express - web framework for node = router, POST,GET, etc
// Sequelizer + Sequelizer cli - writing/reading DB

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routes
const userRouter = require("./routes/Users");
const registerRouter = require("./routes/Register");
app.use("/users", userRouter);
app.use("/register", registerRouter);

// Run database
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server port 3001");
  });
});
