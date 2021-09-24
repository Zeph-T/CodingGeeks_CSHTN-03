import Q, { defer } from 'q';
import * as EmailValidator from 'email-validator';
import User from '../models/user';
import nodemailer from 'nodemailer';
import { envVariables } from '../../config/env';
import jwt from 'jsonwebtoken';
import Item from '../models/item';

export const oEmailContextTexts = {
    activation : 'You’re almost there!<br>Thank you for signing up with us. Get started with MedZone today! Verify your account clicking on the link below.<br><br><br>'
}
export const TokenTypes = {
  authToken : 'authToken',
  ActivationToken  : 'activationToken',
  passwordResetToken  :'passwordResetToken'
}

export function sendEmail(email,context,subjectText){
    var deferred = Q.defer();
    var transpoter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : envVariables.senderEmail,
            pass : envVariables.senderPassword
        }
    });
    var mailOptions = {
        from  : envVariables.senderEmail,
        to : email,
        subject : subjectText,
        html : context
    }
    transpoter.sendMail(mailOptions , function(err,info){
        if(err){
            console.log(err);
            deferred.reject(err.message);
        }else{
            console.log("Email Sent " + info.response);
            deferred.resolve(true);
        }
    })
    return deferred.promise;
}

export const validateUserEmail = (email, checkForExistingUser) => {
    var deferred = Q.defer();
    if (!EmailValidator.validate(email)) {
      deferred.reject('Invalid Email Provided');
    } else {
    if (checkForExistingUser) {
        User.findOne({
          'email': email
        }, (err, user) => {
          if (err)
            deferred.reject('Invalid Email Provided');
          if (user) {
            deferred.reject('Existing User');
          } else {
            deferred.resolve(true);
          }
        });
      } else {
        deferred.resolve(true);
      }
    }
  
    return deferred.promise;
  }


  export function validateUser(req,res,user){
    validateToken(user.authToken , TokenTypes.authToken).then(response=>{
        if(response.isValid){
            res.status(200);
            return res.send(user);
        }
    }).catch(function(){
        user.authToken = jwt.sign({
            email :  user.email,
            type:TokenTypes.authToken
        },ConfigAuth.token.secret,{expiresIn : '10 days'});
        user.save(function(err){
            if(err){
                return res.status(400).send({error:err});
            }else{
                res.status(200);
                return res.send(user);
            }
        })
    })
}

export function checkForLoggedInUser(req,res){
  try{
      if(req.user){
          let user = req.user;
          res.status(200);
          return res.json(user);
      }else{
          res.status(400);
          return res.send({error : 'Not LoggedIn'});
      }
  }catch(err){
      return res.status(400).send({error : err});
  }
}
export function isAuthenticatedUser(req){
  var deferred = Q.defer();
  this.validateToken(req.headers.accesstoken,TokenTypes.authToken).then(response=>{
      if(response.isValid){
          req.user = response.payload;
          deferred.resolve(true);
      }else{
          deferred.resolve(false);
      }
  }).catch(err=>{
      deferred.resolve(false);
  })
  return deferred.promise;
}
export function validateToken(token,tokenType,shouldIgnoreExpiration=false){
  var deferred = Q.defer();
  jwt.verify(token,envVariables.jwt_secret,{ignoreExpiration : shouldIgnoreExpiration},(err,decoded)=>{
    if(!err && decoded && (!tokenType || tokenType == decoded.type)){
      if(tokenType === 'activationToken'){
        User.findOneAndUpdate({activationToken : token},{$set : {isActive : true}},(err,user)=>{
          if(err){
            deferred.reject({
              errors : { name: {message : "Invalid User"} }
            })
          }else{
            deferred.resolve({isValid : true , payload : decoded})
          }
        })
      }else if(tokenType === 'authToken' || tokenType === 'passwordResetToken'){
        User.findOne({email : decoded.email}).then(oUser=>{
          deferred.resolve({isValid : true , payload : oUser});
        }).catch(err=>{
          deferred.reject({errors : {name : {message : err.stack}}});
        })
      }
    }
  })
  return deferred.promise;
}

