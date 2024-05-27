const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {check , validationResult} = require('express-validator'); 
const User = require('../models/user')

const forgetPassRoute = express.Router(); 
const validate = [
    check("email").isEmail().withMessage("Invalid Email "),
    check("Username").isAlpha().withMessage("Invalid Username"), 
    check("newPass").isAlphanumeric().withMessage("Invalid Password").isLength({max:14 , min:3}).withMessage("Password is not of right length")
]

forgetPassRoute.post('./forget-password', async(req, res, next) =>{
    try{
          const { username , email, newPass, ConfirPass } = req.body; 
          const result = validationResult(req); 

          if(!result.isEmpty()){
            return res.status(402).json({error : result.array()[0].msg})
          }
          if(!username || !email){
            return res.status(400).json({error : 'Invalid Email Address or Username '})
          }
          if(!newPass || !ConfirPass){
            return res.status(404).json({
                error : "PassWord Not found"
            })
          }

          if(!result.isEmpty() && username && email){
            const user = await User.findOne({username : username , email : email});
            if(!user){
                return res.status(404).json({ error : 'User not found.'})

            }
            else {
                if(newPass !== ConfirPass){
                    return res.status(401).json({error : 'Provide the same password in fields'})
                }
                else if(newPass == ConfirPass){
                   const salt = await bcrypt.genSalt(10)
                   const hashedPassword = await bcrypt.hash(newPass, salt)
                   // setting hte new password for the same user.........
                   user.password = hashedPassword; 
                   return res.status(200).redirect('./signIn'); 
                }
            }
          }


    }
     catch(err){
              return res.status(500).json({
                error : 'internal server error'
              })
    }
})
