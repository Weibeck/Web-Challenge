// Express - web framework for node = router, POST,GET, etc
// Sequelizer + Sequelizer cli - writing/reading DB

const express = require("express");
const app = express()

app.use(express.json());

const db = require('./models')


// Routes
const userRouter = require('./routes/Users')
app.use("/users", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
    console.log("Server Up - 3001");
    });
});



