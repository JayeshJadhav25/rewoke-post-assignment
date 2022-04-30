const connection = require("../database/db");

const createPost = (req,res) => {
    console.log('Create Post',req.body,req.user);
    try {
        const { postTitle,postDescription } = req.body;

        connection.query('insert into posts(postTitle,postDescription,createdBy) values(?,?,?)',[postTitle,postDescription,req.user],( error,result ) => {
            if( error ) {
                res.status(404).json({
                    status:404,
                    succes:false,
                    message:'Database Error',
                    error:error
                })
            } 
            
            res.status(200).json({
                status:200,
                succes:true,
                message:'Post created succesfully'
            })
        })
    } catch ( e ) {
        res.status(404).json({
            status:404,
            succes:false,
            message:'Something went wrong',
            error:e
        })
    }
}

const get = (req,res) => {
    console.log('getPost',req.user);
    try {

        connection.query('select * from posts',(error,result) => {
            if(error) {
                res.status(404).json({
                    status:404,
                    succes:false,
                    message:'Database Error',
                    error:error
                })
            }
            res.status(200).json({
                status:200,
                succes:true,
                result:result,
                message:'All Posts'
            })
        })
    } catch (e) {
        res.status(404).json({
            status:404,
            succes:false,
            message:'Something went wrong',
            error:e
        })
    }
}

const deletePost = (req,res) => {
    console.log('delete post',req.params,req.user)
    try {
        connection.query('delete from posts where id=?',[req.params.id],(error,result) => {
            if(error) {
                res.status(404).json({
                    status:404,
                    succes:false,
                    message:'Database Error',
                    error:error
                })
            }

            res.status(200).json({
                status:200,
                succes:true,
                message:'Post deleted succesfully'
            })
        })
    } catch ( e ) {
        res.status(404).json({
            status:404,
            succes:false,
            message:'Database Error',
            error:error
        })
    }
} 

const update = (req,res) => {
    try {
        const { postTitle,postDescription } =req.body;
        connection.query('update posts set postTitle=?,postDescription=?,modifiedOn=now() where id=?',[postTitle,postDescription,req.params.id],(error,result) => {
            if(error) {
                res.status(404).json({
                    status:404,
                    succes:false,
                    message:'Database Error',
                    error:error
                })
            }
            res.status(200).json({
                status:200,
                succes:true,
                message:'Post Updated succesfully',
                result:result
            })

        })
    } catch(error) {
        res.status(404).json({
            status:404,
            succes:false,
            message:'Database Error',
            error:error
        })
    }
}

module.exports = {
    createPost,
    get,
    deletePost,
    update
}