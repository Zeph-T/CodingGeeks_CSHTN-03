import Q, { defer } from 'q';
import * as EmailValidator from 'email-validator';
import User from '../models/user';
import nodemailer from 'nodemailer';
import { envVariables } from '../../config/env';
import jwt from 'jsonwebtoken';

export const oEmailContextTexts = {
    activation : 'You’re almost there!<br>Thank you for signing up with us. Get started with MedZone today! Verify your account clicking on the link below.<br><br><br>'
}
export const TokenTypes = {
  AuthToken : 'authToken',
  ActivationToken  : 'activationToken'
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

export function validateToken(token,tokenType,shouldIgnoreExpiration=false){
  var deferred = Q.defer();
  jwt.verify(token,envVariables.jwt_secret,{ignoreExpiration : shouldIgnoreExpiration},(err,decoded)=>{
    if(!err && decoded && (!tokenType || tokenType == decoded.type)){
      if(tokenType === 'activationToken'){
        User.findOneAndUpdate({ActivationToken : token},{$set : {isActive : true}},(err,user)=>{
          if(err){
            deferred.reject({
              errors : { name: {message : "Invalid User"} }
            })
          }else{
            deferred.resolve({isValid : true , payload : decoded})
          }
        })
      }
    }
  })
  return deferred.promise;
}