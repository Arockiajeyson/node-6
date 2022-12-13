const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


// router.get('/blog',(req,res)=>{
//     res.json({ok:'blog'})
// })
router.get('/blog',async (req,res)=>{
    const {page=1,search=new RegExp("[a-z]","i")}=req.query
    try{
        const data=await Blog.find({topic:new RegExp(search)}).skip((page-1)*5).limit(5)
        if(data){
            return res.json({
                status:"success",
                result:data
            })
        }else{
            return res.status(404).json({
                status:"success",
                result:"there is no such topic"
            })
        }
    }catch(e){
        return res.status(404).json({
            status:"failed",
            mess:e.message
        })
    }
})
router.post('/blog',async (req,res)=>{
    try{
        const data =await Blog.create({
            "topic":req.body.topic,
            "description":req.body.description,
            "posted_at":req.body.posted_at,
            "posted_by":req.body.posted_by
        })
        return res.json({
            status:"success",
            data
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})
router.put('/blog/:id',async (req,res)=>{
    try{
        const data =await Blog.updateOne({_id:req.params.id},{
            "topic":req.body.topic,
            "description":req.body.description,
            "posted_at":req.body.posted_at,
            "posted_by":req.body.posted_by
        })
        return res.json({
            status:"success",
            data
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})
router.delete('/blog/:id',async (req,res)=>{
    try{
        const data =await Blog.deleteOne({_id:req.params.id})
        return res.json({
            status:"success",
            data
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})
module.exports = router;