const fs = require("fs");
const path = require("path");

// GET
module.exports = function(app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
            if(err) throw err;
            let notesData = JSON.parse(data);
            res.json(notesData);
        });
    });

    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
            if (err) throw err;
            let notesData = JSON.parse(data);
            notesData.push(newNote);
            newNote.id = notesData.indexOf(newNote) + 1;

            let jsonData = JSON.stringify(notesData, null, 2);
            fs.writeFile(path.join(__dirname, "../db/db.json"), jsonData, function(err) {
                if (err) throw err;
            });

            res.json(notesData);
        });
    });

    app.delete("/api/notes/:id", function(req, res) {
        let deleteNoteID = req.params.id;

        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
            if (err) throw err;
            let notesData = JSON.parse(data);
            for (var i = 0; i < notesData.length; i++) {
                if (deleteNoteID == notesData[i].id) {
                    notesData.splice(i, 1);
                }
            }

            let jsonData = JSON.stringify(notesData, null, 2);
            fs.writeFile(path.join(__dirname, "../db/db.json"), jsonData, function (err) {
                if (err) throw err;
            });

            res.json(notesData);
        });
    })
};

