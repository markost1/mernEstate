import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";


export const signup = async (req, res,next) =>{

const {username,email,password} = req.body;
const hashedPassword = bcryptjs.hashSync(password,10);

const newUser = new User({username,email,password:hashedPassword});

try {
  await newUser.save();
res.status(201).json('korisnik je uspjesno kreiran')  
} catch (error) {
   next(error)
}
} 

export const signin = async (req,res,next) =>{
  const {email,password} = req.body; //izvrsena destrukcija emaila i passworda
  try {

    //prvo provjera da li email postoji ili ne i ako je ispravan provjerava se password
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404,'User not found!'));

    //provjera passworda
    const validPassword = bcryptjs.compareSync(password,validUser.password)
    if(!validPassword) return next(errorHandler(401,'Wrong credential!'));

    //u koliko su mail i password ispravni mmoramo da autentifikujemo korisnika to radimo tako sto dodamo cookie
    //u pretrazivac,kreiramo hash token koji obuhvata emeil korisnika,id korisnika,i cuvamo taj token u cookie pret
    //razivaca , to cinimo preko jwt json web token-a, koristimo taj paket da kreiramo token,instaliramo paket i kre
    //iramo token
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    //ne zelimo da saljemo nazad password korisnika cak i ako je hashovan vracamo sve osim passworda
    const {password:pass , ...rest} = validUser._doc

    //CUVAMO OVAJ TOKEN KAO COOKIE
    res.cookie('access_token', token,{httpOnly:true}).status(200).json(rest)//json(validUser) prepravljam kod gore

    

  } catch (error) {
    next(error)
  }
}

export const google = async (req,res,next) =>{
  try {
    //prvo provjera da li user postoji
    const user = await User.findOne({email:req.body.email})
    if(user){
//ako user postojo registrujemo ga, kkreiramo token sacuvamo ga u coocie
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
//ne zelimo da saljemo nazad password  odvajamo pasword od ostatka
  const{ password:pass, ...rest } = user._doc;
  res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

    }else{
//kreiramo novog korisnika
//password

const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//hasovanje passworda
const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
//sada da sacuvamo korisnicke podatke
const newUser = new User({
  username: req.body.name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4),
  email:req.body.email,
  password:hashedPassword,
  avatar:req.body.photo
})
//sada je potrebno sacuvati novog korisnika
await newUser.save()
//opet se kreira token kao ranije
const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
//odvajamo opet password i ostatak
const{password:pass, ...rest} = newUser._doc;
res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    }
  } catch (error) {
    next(error)
  }
}