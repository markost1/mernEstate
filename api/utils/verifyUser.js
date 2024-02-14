//da bi dobili podatke iz cookie koristimo paket cookie-parser tako imamo rpistup tokenu access_token
//ovaj paket mora de inicijalizuje u index.js

import jwt from "jsonwebtoken";
import { errorHandler } from "./error"

export const verifyToken = (req,res,next) =>{
    const token = req.cookie.access_token //uzimamo podatke iz cookie vezane za token
    //sliedi vertifikacija tokena
    //ako nema tokena
    if(!token)  return next(errorHandler('401','Unautorized'));
    //ako postoji token da provjrimo da li je ispravan ili ne,importujemo jwt 
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler('403','Forbidden'))
// u koliko je token ispravan izdvajamo korisnika i idemo na sledecu funkciju
        req.user = user // sacuvali smo usera 
        next();
    })
    

    
}