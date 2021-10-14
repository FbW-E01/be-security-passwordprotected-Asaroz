import  mongoose  from "mongoose";

const required = true
const unique = true
const messageSchema = mongoose.Schema({
    userid:{type:String,required},
    message:{type:String,required}
})

messageSchema.statics.newMessage = async function({userid,message}){

    return Message.create({userid:userid,message:message})
    
}

const Message = mongoose.model("Messages",messageSchema)
export default Message