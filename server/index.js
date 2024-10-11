const e = require('express')
const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
const mysql=require('mysql')

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'root123',
    database:'employeeSystem'
})

app.listen(3002, ()=>{
    console.log('server running at port number 3002')
})

app.post('/create',(req,res)=>{
    const name=req.body.name;
    const age=req.body.age;
    const country=req.body.country;
    const position=req.body.position;
    const wage=req.body.wage;

    db.query('INSERT INTO employees(name,age,country,position,wage) VALUES(?,?,?,?,?)',[name,age,country,position,wage],(err,results)=>{
        if(err){
            console.log(err)
        }
        if(results){
            console.log('values inserted succesfuly')
            res.send('you are succuess!')
        }
    })
})

app.get('/employees',(req,res)=>{
    db.query('SELECT * from employees',(err, result)=>{
        if(err){
            console.log(err)
        }
        if(result){
            res.send(result);
        }
    })
})

app.put('/update', (req, res) => {
    const { id, name, age, country, position, wage } = req.body;

    const sql = 'UPDATE employees SET name = ?, age = ?, country = ?, position = ?, wage = ? WHERE id = ?';
    db.query(sql, [name, age, country, position, wage, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Employee updated...');
    });
  });

  app.delete('/delete/:id', (req, res) => {

    db.query('DELETE FROM employees WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Employee deleted...');
    });
  });