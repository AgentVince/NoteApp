package com.company;
import express.Express;
import express.middleware.Middleware;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        Express app = new Express();
        Database db = new Database();

        app.get("/rest/notes", (req, res) -> {

            List<Note> notes = db.getNotes();

            res.json(notes);

        });


        app.listen(3000);
        System.out.println("The server has started at port 3000.");
    }
}
