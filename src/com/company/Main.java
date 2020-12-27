package com.company;
import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Express app = new Express();
        Database db = new Database();

        app.get("/rest/notes", (req, res) -> {

            List<Note> notes = db.getNotes();

            res.json(notes);

        });

        app.post("/rest/notes", (req, res) -> {

            Note note = (Note) req.getBody(Note.class);

            db.createNote(note);

            res.send("Note added");

        });

        app.delete("/rest/notes/:id", (req, res) -> {

            Note note = (Note) req.getBody(Note.class);

            db.deleteNote(note);

            res.send("Note deleted");
        });


        try {
            app.use(Middleware.statics(Paths.get("src/web").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3000);
        System.out.println("The server has started at port 3000.");
    }
}
