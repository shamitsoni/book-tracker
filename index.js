import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booktracker",
    password: "1234",
    port: 5432
});
db.connect();

let books = [];

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM books");
    books = result.rows;
    console.log(books);
    res.render("index.ejs", { books : books });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});