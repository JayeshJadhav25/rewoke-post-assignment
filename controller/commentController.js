const connection = require('../database/db');
const add = (req,res) => {
    console.log('Comment Add',req.body);
    try {
        const {postId,comment} = req.body;

        connection.query('insert into comments(postId,comment,addedBy) values(?,?,?)',[postId,comment,req.user],( error,result ) => {
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
                message:'Comment Added succesfully'
            })
        })
    } catch (e) {
        console.log(e);
        res.status(404).json({
            status:404,
            succes:false,
            message:'something went wrong',
            error:e
        })
    }
}

const getCommentByPost = (req,res) => {
    try {
        connection.query('select * from comments where postId=?',[req.params.id],(error,result) => {
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
                result:result,
                message:'Comment Fetch succesfully'
            })  
        })
    } catch (e) {
        console.log(e);
        res.status(404).json({
            status:404,
            succes:false,
            message:'something went wrong',
            error:e
        })
    }
}

const deleteComment = (req,res) => {
    console.log('delete comment',req.params,req.user)
    try {
        connection.query('delete from comments where id=?',[req.params.id],(error,result) => {
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
                message:'Comments deleted succesfully'
            })
        })
    } catch ( e ) {
        res.status(404).json({
            status:404,
            succes:false,
            message:'Something Went Wrong',
            error:error
        })
    }
} 

const updateComment = (req,res) => {
    console.log('update comments',req.body);
    try {
        const { postId,comment } =req.body;
        connection.query('update comments set comment=?, modifiedOn=now() where id=?',[comment,postId],(error,result) => {
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
                message:'Comment Updated succesfully',
                result:result
            })

        })
    } catch (e) {
        res.status(404).json({
            status:404,
            succes:false,
            message:'Something Went Wrong',
            error:error
        })
    }
}
module.exports={
    add,
    getCommentByPost,
    deleteComment,
    updateComment
}