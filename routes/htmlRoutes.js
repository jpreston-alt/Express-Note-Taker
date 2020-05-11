const path = require("path");

module.exports = function(app) {

    // notes route
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // home route (or if other route is not found redirect to home)
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    

};