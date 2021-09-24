import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name:{type :String},
    type:{type:String},
    categories : [{type : String}],
    manufacturer : {type:String},
    category : {type :String},
    manufacturer : {type :  String},
    cost : { type: Number},
    qty : {type : Number}
})


export default mongoose.model('Medicine',itemSchema);