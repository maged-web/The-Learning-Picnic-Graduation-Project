const User = require("../models/user.model")
const asyncWrapper = require("../middleware/asyncWrapper")
const httpStatusText = require("../utils/httpStatusText")
const appError = require("../utils/appError")
const bcrypt = require("bcryptjs")
const generateJWT = require("../utils/generateJWT")
const userRoles = require("../utils/userRoles")
const userAnswers = require("../models/userAnswers.model")
const quizResults = require("../models/quizResult.model")

const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, role } = req.body
    const oldUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
    if (oldUser) {
        const error = appError.create("User already exists", 400, httpStatusText.FAIL)
        // return next(error)
        return res.status(error.statusCode).json({error})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(
        {
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role,
        }
    )
    const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role })
    newUser.token = token;

    await newUser.save()
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { user: newUser } })


});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = appError.create("email and password are required", 400, httpStatusText.FAIL)
        // next(error);
        return res.status(error.statusCode).json({error})
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = appError.create("user not found", 400, httpStatusText.FAIL)
        // return next(error)
        return res.status(error.statusCode).json({error})
    }
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (user && matchedPassword) {
        const token = await generateJWT({ email: user.email, id: user._id, role: user.role })
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { token : token , role : user.role} })
        //blacklist.removeTokenFromBlacklist(token)

    }
    else {
        const error = appError.create("something wrong", 500, httpStatusText.ERROR)
        // return next(error)
        return res.status(error.statusCode).json({error})
    }
});


const viewAccount = asyncWrapper(async (req,res,next)=> {
    const userId = req.currentUser.id
    const user = await User.findById(
       { _id : userId },
       {token:0,password:0}
        )
    if(!user){
        const error = appError.create("No user found",400,httpStatusText.FAIL)
        return res.status(error.statusCode).json({error})
    }
    else {
        res.status(200).json({status : httpStatusText.SUCCESS ,data : user})
    }

});

const getAllUser = asyncWrapper(async (req,res,next)=> {
    const  {role} = req.query;
    if(role === "teacher"){
        const users = await User.find({role : userRoles[role.toUpperCase()]});
        res.status(200).json({users})

    } else if ( role === "student"){
        const users = await User.find({role : userRoles[role.toUpperCase()]});
        res.status(200).json({users})

    } else if ( role === "parent"){
        const users = await User.find({role : userRoles[role.toUpperCase()]});
        res.status(200).json({users})
    } else {
         const users = await User.find();
         res.status(200).json({users})

    }
});

const deleteUser = asyncWrapper(async(req,res,next)=>{
    const {id} = req.params.id
    const user = await User.findById(req.params.id)
    if(!user){
        const error = appError.create("No user found",400,httpStatusText.FAIL)
        return res.status(error.statusCode).json({error})
    } else {
        await User.deleteOne({_id:req.params.id})
        await userAnswers.deleteOne({userId : req.params.id})
        await quizResults.deleteOne({userId : req.params.id})
     res.json({ status: httpStatusText.SUCCESS, data: null })

    }
});

const updateUser = asyncWrapper(async(req,res,next)=>{
    const { id } = req.params; 
    const updates = req.body; 

    const user = await User.findById(id);

    if (!user) {
        const error = appError.create("No user found",400,httpStatusText.FAIL)
        return res.status(error.statusCode).json({ error});
    }

    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save();

return res.status(200).json({status : httpStatusText.SUCCESS , data :{user}});
});

const addChildEmail = asyncWrapper(async(req,res,next)=>{
    const {childernEmails} = req.body
    const id = req.params.id

    const parent = await User.findOne({_id : id , role : "PARENT"})
    if(!parent){
        const error = appError.create("No user found",400,httpStatusText.FAIL)
        return res.status(error.statusCode).json({ error});
    }

    if (childernEmails && childernEmails.length > 0) {
        const existingChildren = await User.find({ email: { $in: childernEmails } });
        const newEmails = childernEmails.filter(email => !parent.childernEmails.includes(email));

        if (newEmails.length > 0) {
            parent.childernEmails = parent.childernEmails.concat(newEmails);
        }

        if (existingChildren.length !== childernEmails.length) {
            const error = appError.create("Check again your child emails", 400, httpStatusText.FAIL);
            return res.status(error.statusCode).json({ error });
        }
    }
    await parent.save();
    res.json({ status: httpStatusText.SUCCESS, data: { childernEmails : childernEmails } });
});

/* const logout = (req, res,) => {
    // const token = req.headers['Authorization'] || req.headers['authorization'] 
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    const token = authHeader.split(' ')[1]

    if (!token) {
        const error = appError.create("Token is missing from the request", 500, httpStatusText.ERROR)
        return next(error)
    }

    blacklist.setBlacklistedTokens(token)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: 'Logged out successfully' })

} */

module.exports = {
    register,
    login,
    viewAccount,
    getAllUser,
    deleteUser,
    updateUser,
    addChildEmail
    //logout
}