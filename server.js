// install dependencies
const express = require("express");

// tell node we are creating an express server
const app = express();

// set up initial port
const PORT = process.env.PORT || 3000;

// set Express app up to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// set up routes
require("./routes/htmlRoutes")(app);

// set up listening - "starts" server
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});