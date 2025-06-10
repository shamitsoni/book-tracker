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

app.post("/add", async (req, res) => {
    var title = req.body.bookTitle;
    var author = req.body.bookAuthor;
    await db.query("INSERT INTO books (title, author) VALUES ($1, $2)", [title, author]);
    console.log("Book Added.");
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});