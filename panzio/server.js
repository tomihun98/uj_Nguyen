const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: 3307,
    password: "",
    database: "fogado"
});


app.get("/", (req, res) => {
    res.send("A szerver működik!")
});


app.get("/szobak", (req, res) => {
    const query = "SELECT sznev, agy FROM szobak"; 
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Hiba a lekérdezés során.");
            return;
        }
        res.json(results); 
    });
});



app.get('/api/szoba-kihasznaltsag', (req, res) => {
    const sql = `
        SELECT s.sznev, COUNT(f.vendeg) AS vendegek, SUM(DATEDIFF(f.tav, f.erk)) AS vendegejszakak
        FROM szobak s
        JOIN foglalasok f ON s.szazon = f.szoba
        GROUP BY s.sznev
        ORDER BY vendegejszakak ASC, vendegek ASC
    `;
    db.query(sql, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});



app.get('/api/szoba/:id', (req, res) => {
    const szobaId = req.params.id;
    const sql = `
        SELECT v.vnev AS nev, f.erk AS erkezes, f.tav AS tavozas
        FROM foglalasok f
        JOIN vendegek v ON f.vendeg = v.vsorsz
        WHERE f.szoba = ?
        ORDER BY v.vnev ASC
    `;
    db.query(sql, [szobaId], (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});




app.listen(3000, () => {
    console.log('A szerver a 3000 porton fut!');
});
