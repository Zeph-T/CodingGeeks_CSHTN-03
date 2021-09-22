// user controllers
import User from "../models/user";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import  {envVariables} from "../../config/env";
import { validateUserEmail , oEmailContextTexts, sendEmail ,TokenTypes, validateToken} from "./apiHelper";
export function signup(req,res){
    try{
        let userInfo = req.body;
        userInfo.email = userInfo.email.toLowerCase();
        if(!userInfo.email || !userInfo.password || !userInfo.name || userInfo.password.length<8){
            if(userInfo.password.length < 8){
                res.status(422);
                return res.send({error:"Password Too Short"});
            }else{
                res.status(400);
                return res.send({error :"Required Fields Error"});
            }
        }
        axios.get(`https://open.kickbox.com/v1/disposable/${userInfo.email}`).then(function (response) {
                return response.data;
            }).then(function(isDisposedData){
                if(!isDisposedData.disposable){
                    validateUserEmail(userInfo.email,true,true).then(isValid=>{
                        if(isValid){
                            let newUser = new User;
                            newUser.name = userInfo.name;
                            newUser.email = userInfo.email;
                            newUser.password = newUser.generateHash(userInfo.password);
                            newUser.activationToken = jwt.sign({
                                email: userInfo.email,
                                type: TokenTypes.ActivationToken
                              }, envVariables.jwt_secret, {expiresIn: "100 days"});
                              newUser.authToken = jwt.sign({
                                email: userInfo.email,
                                type: TokenTypes.AuthToken
                              }, envVariables.jwt_secret, {expiresIn: "100 days"});
                            newUser.save(function(err){
                                if(err){
                                    return res.status(400).send({error:err.stack});
                                }else{
                                    let activationLink = envVariables.base_origin + '/activateUser?activationToken=' + newUser.activationToken;
                                    let htmlText =  oEmailContextTexts.activation + "<div style='text-align:center;'><a href='"+ activationLink +"' style='text-decoration: none;padding: 0.75rem;background: green;color: white;font-size: large;border-radius:0.5rem' target='_blank'>Verify Email</a></div><br/>" + "Or click on the link below:<br/><br/><a target='_blank' href='"+ activationLink +"'>"+activationLink+ "</a><br/><br/>Cheers!<br/> MedZone Team <br/><br/>"+"P.S. We're always here for you"; 
                                    let subjectText = 'Hey Just One Step To Join Our Family';
                                    sendEmail(newUser.email , htmlText,subjectText).then(result=>{
                                        return res.status(200).send({message : 'Verify your Account by Clicking the link send to your Email'});
                                    }).catch(err=>{
                                        return res.status(200).send({error : err.stack});
                                    })
                                }
                            })
                        }else{
                            return res.status(200).send({error : 'Cannot create an Email with this Email!'})
                        }
                    }).catch(err=>{
                        return res.status(200).send({error : 'User Already Exists with this Email'});
                    })
                }else{
                    return res.status(400).send({error : 'Error Saving the info!'});
                }
            }).catch(err=>{
                return res.status(400).send(err.stack);
            })
    }catch(err){
        return res.status(400).send(err.stack);
    }
}


export function activateToken(req,res){
    try{
        let token = req.params.activationToken;
        validateToken(token , TokenTypes.ActivationToken).then(response=>{
            if(response.isValid){
                return res.status(200).send({valid : true});
            }else{
                return res.status(400).send({valid : false});
            }
        })
    }catch(err){
        console.log(err);
        return res.status(400).send({valid : false});  
    }
}