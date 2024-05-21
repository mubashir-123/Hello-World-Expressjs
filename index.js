const express = require('express')
const app = express()
require("dotenv").config();

app.use(express.json())
const arr = []

//Render Data
app.get('/', (req, res) => {
    res.send('Hello Wolrd')
  })

app.get('/api/v1/todos', (req, res) => {
    res.send({todos: arr})
  })

  //Add Data
app.post('/api/v1/todos', (req, res) => {
    const {title} = req.body;
    if(title.length < 1){
       res.status(404).send('Please write a message first')
        return
    }
    obj = ({
        title : title,
        id: Date.now()
    })
    arr.push(obj);
    res.send('Message has send sccessfully')
  })

//Delete Data
app.delete('/api/v1/todos/:id',(req,res)=>{
    const {id} = req.params;
    const index = arr.findIndex((item)=>{
        return item.id == id;
    })
    if(arr.length != -1){
        arr.splice(index,1);
        res.send('Element has deleted successfully');
    }
    else{
        res.status(404).send('Please enter valid id');
    }
}) 

//Update Data
app.put('/api/v1/todos/:id',(req,res)=>{
    const {id} = req.params
    const {title} = req.body
    const index = arr.findIndex((item)=>{
        return item.id == id;
    })
    arr[index].title = title;
        res.send('Updated successfully',{todo:arr});

})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})