// user controllers
import User from '../models/user'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { envVariables } from '../../config/env'
import {
  validateUserEmail,
  oEmailContextTexts,
  sendEmail,
  TokenTypes,
  validateToken,
  validateUser,
} from './apiHelper'
import Q from 'q'
import Item from '../models/item'
const stripe = require('stripe')("sk_test_51Iiee4SAPK4NnRb1aF4E4NbekFeZHCFFVswPQnnMQh8cuVqoLNAq7WVc2rR8cdmA0NW5LM663hy8QIil8LmLuJZ7007yioY6R7");

export function signup(req, res) {
  try {
    let userInfo = req.body
    userInfo.email = userInfo.email.toLowerCase()
    if (
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.name ||
      userInfo.password.length < 8
    ) {
      if (userInfo.password.length < 8) {
        res.status(422)
        return res.send({ error: 'Password Too Short' })
      } else {
        res.status(400)
        return res.send({ error: 'Required Fields Error' })
      }
    }
    axios
      .get(`https://open.kickbox.com/v1/disposable/${userInfo.email}`)
      .then(function (response) {
        return response.data
      })
      .then(function (isDisposedData) {
        if (!isDisposedData.disposable) {
          validateUserEmail(userInfo.email, true, true)
            .then((isValid) => {
              if (isValid) {
                let newUser = new User()
                newUser.name = userInfo.name
                newUser.email = userInfo.email
                newUser.password = newUser.generateHash(userInfo.password)
                newUser.activationToken = jwt.sign(
                  {
                    email: userInfo.email,
                    type: TokenTypes.ActivationToken,
                  },
                  envVariables.jwt_secret,
                  { expiresIn: '100 days' }
                )
                newUser.authToken = jwt.sign(
                  {
                    email: userInfo.email,
                    type: TokenTypes.authToken,
                  },
                  envVariables.jwt_secret,
                  { expiresIn: '100 days' }
                )
                newUser.save(function (err) {
                  if (err) {
                    return res.status(400).send({ error: err.stack })
                  } else {
                    let activationLink =
                      envVariables.base_origin +
                      '/activateUser?activationToken=' +
                      newUser.activationToken
                    let htmlText =
                      oEmailContextTexts.activation +
                      "<div style='text-align:center;'><a href='" +
                      activationLink +
                      "' style='text-decoration: none;padding: 0.75rem;background: green;color: white;font-size: large;border-radius:0.5rem' target='_blank'>Verify Email</a></div><br/>" +
                      "Or click on the link below:<br/><br/><a target='_blank' href='" +
                      activationLink +
                      "'>" +
                      activationLink +
                      '</a><br/><br/>Cheers!<br/> MedZone Team <br/><br/>' +
                      "P.S. We're always here for you"
                    let subjectText = 'Hey Just One Step To Join Our Family'
                    sendEmail(newUser.email, htmlText, subjectText)
                      .then((result) => {
                        return res
                          .status(200)
                          .send({
                            message:
                              'Verify your Account by Clicking the link send to your Email',
                          })
                      })
                      .catch((err) => {
                        return res.status(200).send({ error: err.stack })
                      })
                  }
                })
              } else {
                return res
                  .status(200)
                  .send({ error: 'Cannot create an Email with this Email!' })
              }
            })
            .catch((err) => {
              return res
                .status(200)
                .send({ error: 'User Already Exists with this Email' })
            })
        } else {
          return res.status(400).send({ error: 'Error Saving the info!' })
        }
      })
      .catch((err) => {
        return res.status(400).send(err.stack)
      })
  } catch (err) {
    return res.status(400).send(err.stack)
  }
}

export function activateToken(req, res) {
  try {
    let token = req.params.activationToken
    validateToken(token, TokenTypes.ActivationToken).then((response) => {
      if (response.isValid) {
        return res.status(200).send({ valid: true })
      } else {
        return res.status(400).send({ valid: false })
      }
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ valid: false })
  }
}

export function login(req, res) {
  try {
    let userInfo = req.body
    if (!userInfo || !userInfo.email || !userInfo.password) {
      return res.status(400).send({ error: 'Missing Fields!' })
    }
    User.findOne({
      email: userInfo.email,
    })
      .then((user) => {
        if (!user) {
          return res.status(200).send({ error: 'Email Id not found!' })
        } else if (!user.isActive) {
          return res
            .status(200)
            .send({
              error:
                'You have not activated your account,Click on the Link sent to your Email',
            })
        } else if (user.validPassword(userInfo.password)) {
          validateUser(req, res, user, false)
        } else {
          return res.status(200).send({ error: 'Password Invalid!' })
        }
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).send({ error: err.stack })
      })
  } catch (err) {
    return res.status(400).send({ error: err.stack })
  }
}

export function forgotPassword(req, res) {
  var email = req.body.email.toLowerCase()
  try {
    User.findOne(
      {
        email: email,
        isActive: true,
      },
      function (err, user) {
        if (err || !user) {
          return res.status(400).send({ error: err })
        }
        if (user) {
          user.passwordResetToken = jwt.sign(
            {
              email: email,
              type: TokenTypes.passwordResetToken,
            },
            envVariables.jwt_secret,
            {
              expiresIn: 60 * 60 * 24,
            }
          )
          user.save(function (err, updatedUser) {
            if (err) {
              return res.status(400).send({ error: err })
            }
            let resetPasswordLink =
              envVariables.base_origin +
              '/resetPassword?passwordResetToken=' +
              updatedUser.passwordResetToken
            var emailText =
              'Hey ' +
              updatedUser.name +
              '!<br/><br/>' +
              "It looks like you might have forgotten your password for MedZone. Don't worry, we’ve got your back.<br/><br/>Click the button below to change your password:<br/>" +
              "<br/><div style='text-align:center;'><a href='" +
              resetPasswordLink +
              "' style='text-decoration: none;padding: 0.75rem;background: #3f51b5;color: white;font-size: large;border-radius:0.5rem' target='_blank'>Reset Password</a></div><br/>" +
              "Or click on the link below:<br/><br/><a target='_blank' href='" +
              resetPasswordLink +
              "'>" +
              resetPasswordLink +
              '</a><br/><br/>Always here for you,<br/> MedZone Team <br/><br/>'
            let subjectText = 'Password Reset Link'
            sendEmail(email, emailText, subjectText)
              .then(function (isValid) {
                if (isValid) {
                  res.status(200)
                  return res.json({
                    status: 'Mail Sent to the registered email',
                  })
                }
              })
              .catch(function () {
                res.status(400)
                return res.send({ error: err })
              })
          })
        }
      }
    )
  } catch (err) {
    res.status(400)
    return res.send({ error: err.stack })
  }
}

export function Payment(req, res) {
  const user = req.user
  stripe.customers
    .create({
      email: user.email,
      source: req.body.token,
      name: user.name,
      address: {
        line1: 'TC 9/4 Old MES colony',
        postal_code: '110092',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: req.body.amount, // Charing Rs 25
        description: 'Demo medical Bill',
        currency: 'INR',
        customer: customer.id,
      })
    })
    .then(async (charge) => {
      try {
        if (user.pastOrders.length == 0) {
          user.pastOrders = []
        }
        let cartItems = await req.body.items.map(oItem=>{
          return {item : mongoose.Types.ObjectId(oItem.item._id),
          qty: oItem.qty}
        });
        user.pastOrders.push({
          transactionId : charge.id,
          items : cartItems
        })
        user.cart = [];
        user.save(async (err) => {
          if (err) {
            console.log(err)
            res.status(400).json({ message: err.message })
          } else {
            await Q.all(
              req.body.items.map(async (oItem) => {
                try {
                  await Item.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(oItem.item._id) },
                    { $inc: { qty: -oItem.qty } }
                  )
                } catch (err) {
                  console.log(err)
                }
              })
            )
            console.log('Transaction Successfull')
            res.status(200).json({ message: 'successful' ,success: true})
          }
        })
      } catch (err) {
        res.status(400).json({ message: err })
      }
    }).catch(err=>{
      console.log(err);
      return res.status(400).send({error : err});
    })
    .catch(err=>{
      console.log(err);
      return res.status(400).send({error : err});
    })
}

export function verifyPasswordToken(req, res) {
  if (req.body.token) {
    validateToken(req.body.token, TokenTypes.passwordResetToken)
      .then((response) => {
        if (response.isValid) {
          return res.status(200).send({ isValid: true })
        }
      })
      .catch((err) => {
        return res.status(200).send({ isValid: false })
      })
  } else {
    return res.status(200).send({ isValid: false })
  }
}
export function resetPassword(req, res) {
  var userInfo = req.body
  try {
    validateToken(userInfo.token, TokenTypes.passwordResetToken)
      .then((response) => {
        if (response.isValid) {
          userInfo.email = response.payload.email
          return true
        }
      })
      .then((isValid) => {
        if (isValid) {
          User.findOne({
            email: userInfo.email,
            passwordResetToken: userInfo.token,
            isActive: true,
          })
            .then((oUser) => {
              oUser.passwordResetToken = ''
              oUser.password = oUser.generateHash(userInfo.password)
              oUser.save((err) => {
                if (err) {
                  return res.status(400).send({ error: err })
                } else {
                  return res.send({ success: true })
                }
              })
            })
            .catch((err) => {
              return res.status(400).send({ error: err })
            })
        } else {
          return res.status(200).send({ error: 'Token is Invalid' })
        }
      })
      .catch((err) => {
        return res.status(200).send({ error: 'Token Expired' })
      })
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}
