const TodoModel = require("../model/todo.model")

const getTodo = async(req,res)=>{
    try{
        const data = await TodoModel.find()
        res.status(200).send({"message":"Data fetch succefully",data})
    }
    catch(err){
        console.log(err)
        res.status(500).send({"message":"An error occured while fetching data"})
    }
}

module.exports = getTodo