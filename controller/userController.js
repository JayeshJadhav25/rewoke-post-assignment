const connection = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = ( req,res ) => {
    console.log('login data ',req.body);
    try {
        const { email , password } = req.body ;

        connection.query('select * from user where email=?',[email],async (error,result) => {
            if(error) {
                res.status(404).json({
                    status:404,
                    succes:false,
                    error:error,
                    message:"Database Error"
                })
            }
            if(result.length == 0)  {
                res.status(404).json({
                    status:404,
                    succes:false,
                    message:"Username and password are invalid"
                })
            } else {
                const checkPassword = await bcrypt.compare(password,result[0].password);
                console.log('checkPassword',checkPassword);
                if( checkPassword ) {
                    const payload = {
                        id: result[0].id
                    }
            
                    const token = jwt.sign(payload, process.env.JWT_SECREAT);
                    res.json({
                        status:200,
                        succes:true,
                        token:token,
                        message:'Login Succesfull'
                    })
                } else {
                    res.status(404).json({
                        status:404,
                        succes:false,
                        message:"Username and password are invalid"
                    })

                }
            }
        })
    } catch (e) {
        return {
            status:404,
            message:'something went wrong',
            status:false,
            err : e
        }
    }
}

const register = async ( req,res ) => {
    console.log('register user',req.body);

    try {
        const { name,email,password } = req.body;

        bcrypt.hash(password, 8).then(hashpw => {
            connection.query('select * from user where email=?',[email],(error,result) => {
                if(error) {
                   res.status(500).json('server error')
                }
        
                if(result.length ==0){
                    connection.query('insert into user(name,email,password) value(?,?,?)',[name,email,hashpw],(error,iresult)=>{
                        if(error) {
                            res.status(400).json({
                                'success':false,
                                'status':400,
                                "Error":error})
                        }
                        res.status(200).json({
                            'success':true,
                            'status':200,
                            'message':'Register successfully..!!',

                        })               
                    })
                }else {
                    res.status(400).json({
                        'success':false,
                        'status':400,
                        "message":"Email already registered"
                    })
                }
                
            })
      })
    } catch (e) {
        return {
            statusCode:404,
            message:'Something Went Wrong',
            error : e,
            status: false
        }
    }
}
module.exports = {
    login,
    register
}