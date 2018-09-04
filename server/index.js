const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const PORT = process.env.PORT || 5000
const app = express()
const axios = require('axios')
const moment = require('moment')

let host = process.env.production_host || "localhost"
let user = process.env.production_user || "root" // your username
let password = process.env.production_password || "root" // your password

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '../client/build')));

let connection = mysql.createConnection({
  host      : host,
  user      : user,
  password  : password
})

// create database
connection.query('CREATE DATABASE IF NOT EXISTS mydb', (err) => {
  if (err) throw err;
  connection.query('USE mydb', (err) => {
    if (err) throw err;
    // create table to store tow lots API into
    connection.query(`CREATE TABLE IF NOT EXISTS current_vehicles (
      vehicle_id varchar(255) PRIMARY KEY,
      year varchar(255),
      make varchar(255),
      model varchar(255),
      reason varchar(255),
      tow_reference varchar(255),
      vin varchar(255),
      lot varchar(255),
      k varchar(255),
      comments varchar(255),
      front_pic varchar(255),
      back_pic varchar(255))`, (err, results) => {
        if (err) throw err
    });
  })
})

setTimeout(() => {
  connection.query('USE mydb', (err) => {
    if (err) throw err;
    connection.query('SELECT * FROM current_vehicles', (err, results) => {
        // if table is already up to date with data, then do nothing
        if (err) throw err
        if (results.length > 0) {
          console.log('Database is connected and up to date.')
        } else {
          // if table is empty, push data into sql table with GET request and for loop
          axios.get('https://data.kcmo.org/resource/xpwx-fzzw.json')
            .then((res) => {
              for(let i in res.data) {
                let query = `INSERT INTO current_vehicles(
                  vehicle_id,
                  year,
                  make,
                  model,
                  reason,
                  tow_reference,
                  vin,
                  lot,
                  k,
                  comments,
                  front_pic,
                  back_pic)
                  VALUES ?`;
                let values = [
                  [
                    res.data[i].vehicle_id,
                    res.data[i].year,
                    res.data[i].make,
                    res.data[i].model,
                    res.data[i].reason,
                    res.data[i].tow_reference,
                    res.data[i].vin,
                    res.data[i].lot,
                    res.data[i].k === 'K' ? 'Yes' : 'No',
                    res.data[i].comments,
                    `https://s3.us-east-2.amazonaws.com/kctowlots/${moment().format('MMMM')}_${moment().format('YYYY')}_Front/${res.data[i].lot}_f.jpg`,
                    `https://s3.us-east-2.amazonaws.com/kctowlots/${moment().format('MMMM')}_${moment().format('YYYY')}_Back/${res.data[i].lot}_b.jpg`
                  ]
                ]
                connection.query(query, [values], (err, results) => {
                    if (err) throw err;
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
          console.log('New vehicles have been added to the database.')
        }
    });
  })
}, 500)

// create table to store saved/bookmarked vehicles into
connection.query('USE mydb', (err) => {
  if (err) throw err;
  connection.query(`CREATE TABLE IF NOT EXISTS saved_vehicles (
    vehicle_id char(255),
    user_id int)`, (err, results) => {
    if (err) throw err;
  });
})

// create table of users information
connection.query('USE mydb', (err) => {
  if (err) throw err;
  connection.query(`CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    password varchar(255))`, (err, results) => {
    if (err) throw err;
  })
})

// return vehicles data to display on frontend
app.post('/current_vehicles', (req, res) => {
  let reqOptions = {
    make: req.body.make,
    model: req.body.model,
    reason: req.body.reason,
    year: req.body.year,
    key: req.body.key
  };

  const buildConditions = params => {
    let conditions = [];
    let values = [];

    if (typeof params.year !== 'undefined') {
      conditions.push("year = ?");
      values.push(params.year);
    }

    if (typeof params.make !== 'undefined') {
      conditions.push("make = ?");
      values.push(params.make);
    }

    if (typeof params.model !== 'undefined') {
      conditions.push("model = ?");
      values.push(params.model);
    }

    if (typeof params.reason !== 'undefined') {
      conditions.push("reason = ?");
      values.push(params.reason);
    }

    if (typeof params.key !== 'undefined') {
      conditions.push("k = ?");
      values.push(params.key);
    }

    return {
      where: conditions.length ? conditions.join(' AND ') : '1',
      values: values
    };
  }

  let conditions = buildConditions(reqOptions);
  let sql = 'SELECT * FROM current_vehicles WHERE ' + conditions.where;

  connection.query(sql, conditions.values, (err, results) => {
    if (err) throw err;
    res.send(results)
  });
})

// return bookmarked vehicles
app.get('/saved_vehicles', (req, res) => {
  connection.query('SELECT * FROM saved_vehicles', (err, results) => {
    if (err) throw err;
    res.send(results)
  })
})

// user registration
app.post('/users', (req, res) => {
  let query = `INSERT INTO users(
    first_name,
    last_name,
    email,
    password) VALUES ?`
  let values = [[req.body.username, 'blank', req.body.email, req.body.password]]
  connection.query(query, [values], (err, results) => {
    if (err) throw err;
  })
})

// insert vehicle id into saved vehicles table
app.post('/save_vehicle', (req, res) => {
  let query = `INSERT INTO saved_vehicles(
    vehicle_id, user_id) SELECT * FROM(
    SELECT ?, ?) AS temp WHERE NOT EXISTS(
    SELECT vehicle_id FROM saved_vehicles WHERE vehicle_id = ?) LIMIT 1`;
  let values = [req.body.vehicle_id, 1, req.body.vehicle_id]
  query = mysql.format(query, values)
  connection.query(query, (error, results, fields) => {
    if (error) throw error
  })
})

app.listen(PORT, () => {
  console.error(`Listening on port ${PORT}`);
});
