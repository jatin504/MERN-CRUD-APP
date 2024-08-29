const Todomodel = require("../model/todo.model")

const todopost= async(req,res)=>{
    try{
        const {user_data} = req.body
        console.log(user_data)

        if(!user_data){
            return res.status(500).send({"message":"data is not found"})
        }

        const data = new Todomodel({
            user_data
        })

        await data.save();

        res.status(201).send({"message":"Todo created successfully",data});
    }
    catch(err){
        console.log(err);
        res.staus(500).send({"message":"Internal Server Error"})
    }
}

module.exports=todopost