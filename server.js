const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { request } = require("http");
const { error } = require("console");
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        port: 3307,
        password: "",
        database: "covid"
    }
)

app.get("/", (req, res) => {
    res.send("Szerver a 8080-as Porton fut !")
}

)

app.get("/c", (req, res) => {

    const sql = "SELECT * FROM `eu_zonak`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    }

    )

}
)

app.get("/c1", (req, res) => {

    const sql = "SELECT * FROM `eu_adatok`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    }
    )
}
)

app.get("/c2", (req, res) => {

    const sql = "SELECT * FROM `magyar_havi_adatok`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    }
    )
}
)





app.listen(8080, () => {
    console.log('Szerver a 8080-as Porton fut !')
})