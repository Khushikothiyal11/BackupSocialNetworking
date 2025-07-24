const PostModel=require('../models/postModel')
const UserModel=require('../models/userModel')
const uuid = require("uuid").v4;
const cloudinary=require('../utils/cloudinary')
const fs=require('fs')
const path=require('path')
const HttpError = require('../models/errorModel')
 
 
 
//CREATE POST
//POST:api/posts
//PROTECTED




const createPost=async(req,res,next)=>{
  try{
    //console.log('**********',req);
   const{body,creator}=req.body;
    // const { body } = req.body;
    // const userId = req.user?._id;


   
    if(!body){
      return next(new HttpError("Fill in the text field and choose image",422))
    }
    if(!req.files.image)
    {
      return next(new HttpError("Please choose an image",422));
    }
    else{
      const{image}=req.files;
      //imags should be less than 1mb
      if(image.size>1000000)
      {
        return next(new HttpError("Profile picture too big.Should be less thgan 500kb"),422);
      }
   
    //rename image
    let fileName = image.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];
    await image.mv(path.join(__dirname, '..','uploads', fileName), async(err)=>{
      if(err)
      {
        return next(new HttpError(err))
      }
      //store image on cloudinary
      const result = await cloudinary.uploader.upload(path.join(__dirname, '..', 'uploads', fileName),{resource_type:"image"})
      if(!result.secure_url)
        {
          return next(new HttpError("couldn't upload image to cloudinary",422))
        }
      //save the post to db
     
      const postmodel = new PostModel({
        creator: creator,
        // createdBy: {
        //   fullName: user.fullName,
        //   _id: user._id,
        //   profilePhoto: user.profilePhoto
        // },      
        body,
        image: result.secure_url
      });
      console.log("Post model created:", postmodel);
      postmodel.save().then(async (post) => {
        console.log("Post saved successfully:", post);
        res.status(201).json(post);
      }).catch((error) => {
        console.error("Error saving post:", error);
        return next(new HttpError("Failed to save post", 500));
      });
      
      // Now update the user to include this post
      await UserModel.findByIdAndUpdate(creator, {
        $push: { posts: postmodel._id }
      });
      
      //update user posts
      // const newPost = await PostModel.create({creator: userid, body, image: result.secure_url});
      // await UserModel.findByIdAndUpdate(newPost?.creator, {$push: {posts: newPost?._id}})
       //res.json(newPost)
 
      })
    }
 
 } catch(error){
  console.log(error)
    return next(new HttpError(error))
  }
}
 
   
  //GET POST
  //GET: api/posts//PROTECTED
  const getPost=async (req,res,next)=>{
    try{
      const{id}=req.params;
      const post= await PostModel.findById(id).populate('creator')
      //const post=await PostModel.findById(id).populate("creator").populate({path:"comments",options:{sort:{createdAt:-1}}})
      res.json(post)
    }
    catch(error){
      return next(new HttpError(error))
    }
  }
 
 
  //GET POSTS
  //GET: api/posts
  // //PROTECTED
  const getPosts=async(req,res,next)=>{
    try{
      const posts=await PostModel.find().populate('creator').then((posts)=>{
        return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }); 
      res.json(posts)
    }
    catch(error){
      return next(new HttpError(error))
    }
  }
 
 
  //UPDATE POSTS
  //PATCH: api/posts
  // //PROTECTED
  const updatePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const { body, userid } = req.body;
 
      if (!body) {
        return next(new HttpError("Text field is required", 422));
      }
 
      let updatedFields = { body };
 
      if (req.files?.image) {
        const { image } = req.files;
 
        if (image.size > 1000000) {
          return next(new HttpError("Image too large. Must be under 1MB", 422));
        }
 
        // Rename image
        let fileName = image.name.split(".");
        fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];
 
        await image.mv(path.join(__dirname, '..', 'uploads', fileName));
 
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(
          path.join(__dirname, '..', 'uploads', fileName),
          { resource_type: "image" }
        );
 
        if (!result.secure_url) {
          return next(new HttpError("Image upload failed", 422));
        }
 
        updatedFields.image = result.secure_url;
      }
 
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        updatedFields,
        { new: true }
      );
 
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
 
      res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      console.error(error);
      return next(new HttpError(error));
    }
  };
 
 
 
 
  //DELETE POSTS
  //PATCH: api/posts/:id
  // //PROTECTED
  const deletePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const deletedPost = await PostModel.findByIdAndDelete(postId);
     
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
 
      res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
      next(error);
    }
  };
 
 
//GET FOLLOWING POSTS
//GET: api/posts/following
//Protected
const getFollowingPosts = async(req,res,next)=>{
    try{
        const user = await UserModel.findById(req.user.id);
        const posts= await PostModel.find({creator: {$in:user?.following}})
        res.json(posts)
    }catch(error){
        return next(new HttpError(error))
    }
}
 
  //LIKE/DISLIKE  POSTS
  //GEt: api/posts/:id/like
  // //PROTECTED
  // LIKE/DISLIKE POST
// PUT: api/posts/:id/like
// PROTECTED

const likeDislike = async (req, res, next) => {
  try {
    console.log("Like endpoint hit");

    const postId = req.params.id;
    const userId = req.user?.id;

    console.log("Post ID:", postId);
    console.log("User ID:", userId);

    const post = await PostModel.findById(postId);
    if (!post) {
      console.log("Post not found");
      return next(new HttpError("Post not found", 404));
    }

    let updatedPost;
    let action;

    if (post.likes.includes(userId)) {
      console.log("User already liked this post");
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
      action = "disliked";
    } else {
      console.log("User has not liked this post yet");
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true }
      );
      action = "liked";
    }

    res.status(200).json({
      message: `Post successfully ${action}`,
      liked: action === "liked",
      likesCount: updatedPost.likes.length,
      likes: updatedPost.likes,
    });

  } catch (error) {
    console.error("Error in likeDislikePost:", error);
    return next(new HttpError("Unable to toggle like. Please try again.", 500));
  }
};
 
  //GET USER POSTS
  //GEt: api/users/:id/posts
  // //PROTECTED
  const getUserPosts=async(req,res,next)=>{
    try{
      const userId=req.params.id;
      const posts=await UserModel.findById(userId).populate({path: "posts",options: {sort:{createdAt:-1}}})
    res.json
  }
    catch(error){
      return next(new HttpError(error))
    }
  }
 
 
  module.exports={createPost,getPost,getPosts,updatePost,deletePost,getUserPosts,likeDislike};