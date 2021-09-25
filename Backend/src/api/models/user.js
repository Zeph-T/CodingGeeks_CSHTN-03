import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name : {type:String,default : "",require : true},
    email  : {type:String,require : true},
    password : {type:String,require: true},
    activationToken : {type:String},
    authToken : {type:String},
    passwordResetToken : {type:String},
    isActive : {type:Boolean , default : false},
    cart  :[{
        item :{
            type:mongoose.Types.ObjectId,
            ref : 'Medicine'
        },
        qty : Number
    }],
    wishlist : [{
        type:mongoose.Types.ObjectId,
        ref : 'Medicine'
    }],
    scannedPrescriptions : [{
        prescription_url : String,
        extractedMedicines : [{type:mongoose.Types.ObjectId ,  ref : 'Medicine'}]
    }],
    pastOrders : [{
        transactionId : String,
        items  : [{
            item : {
                type:mongoose.Types.ObjectId,
                ref : 'Medicine'
            },
            qty : Number
        }]
    }]
})

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}


export default mongoose.model('User',userSchema);