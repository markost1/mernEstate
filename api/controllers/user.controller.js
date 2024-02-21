import bcrypt  from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from "../utils/error.js";

export const test = (req,res)=>{
    res.json({
        message:"Hello WORLD"
    })
}
//kod provjravanja korisnika imamo dodadne provjere, da li je korisnik autentifikovan ili nije,
//koristimo token koji je kreiran u cookie , taj token je kreiran prilikom sign in korisnika
//koristimo taj token da bi vertifikovali korisnika
// da bi provjerili token pravimo funkciju verifyUser u utills 

export const updateUser = async (req,res,next) =>{

    // u verifyToken dobijamo req.user korisnika kome je ispravan token
    //prvo uporedjuemo id tog korisnika sa id em iz rute :id

    if(req.user.id !== req.params.id) return next(errorHandler('401','You are not autentificated,update your own acount'))

    //ako se podudara id koristimo try catch
    try {
      //ako korisnik zeli da promjeni svoj password moramo da hashujemo password
      if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password, 10)

        //updejtovacemo kornisnika imamo User model koristimo mongoose funkciju findByIdAndUpdate
        //prvo odredjujemo koji cemo id da updejtujemo a onda pastujemo podatke 
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email:req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        },{new: true}   // updejtuje bazu sa podacima koji predstavljaju nove informacije.
        ) 

        //nakon ovoga moramo da odvojimo password od ostalog
        const {password, ...rest} = updatedUser._doc

        //saljemo odgovor 
        res.status(200).json(rest);
        //prelazim na testiranje api rute sa insomnijom
      }  
    } catch (error) {
        next(error)
    }

}

// ovo je odgovor servera podaci bez password koji predstavlja povjerljivu informaciju
/* {
	"avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	"_id": "65b37cf0a74839ed6d95dff1",
	"username": "test2",
	"email": "test2@gmail.com",
	"createdAt": "2024-01-26T09:35:44.263Z",
	"updatedAt": "2024-01-26T09:35:44.263Z",
	"__v": 0
}*/

//uzimam id i idem u insomiju da updejtujem podatke korisnika preko id-a


//ne radi dobro ne mogu da mjenjam podatke