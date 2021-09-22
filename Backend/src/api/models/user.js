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
        item : mongoose.Types.ObjectId,
        quantity : Number
    }],
    scannedPrescriptions : [{
        prescription_url : String,
        extractedMedicines : [{type:mongoose.Types.ObjectId}]
    }]
})

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}


export default mongoose.model('User',userSchema);