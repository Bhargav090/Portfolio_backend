const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const url = require('./url')
// const path = require('path')
mongoose.connect(url,{dbName:'portfolio'})
    .then(()=>{
        console.log('connected to database')
    },
    (err)=>{
        console.log(err)
    }
)


app.post('/send-email', (req, res) => {
  axios.post('http://localhost:1000/send-email.php', req.body)
    .then((response) => {
      console.log('Email sent successfully');
      res.status(200).send('Email sent');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    });
});



app.get('/projects', async(req,res)=>{
    const projects = await mongoose.connection.db.collection('projects').find().toArray()
    return res.json(projects)
})


// app.get('/',(req,res)=>{
//   app.use(express.static(path.resolve(__dirname,"portfolio",'build')))
//   res.sendFile(path.resolve(__dirname,"portfolio","build","index.html"))
// })

app.listen('1000', ()=>{
    console.log('server is running')
})
