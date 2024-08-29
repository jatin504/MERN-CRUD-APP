const mongoose=require("mongoose")

const TodoSchema = new mongoose.Schema({
    user_data:{
        type:String,
    }
},{
    timestamps:true
})

const Todomodel = mongoose.model('Todo',TodoSchema);

module.exports = Todomodel