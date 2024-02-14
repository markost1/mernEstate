export const test = (req,res)=>{
    res.json({
        message:"Hello WORLD"
    })
}
//kod provjravanja korisnika imamo dodadne provjere, da li je korisnik autentifikovan ili nije,
//koristimo token koji je kreiran u cookie , taj token je kreiran prilikom sign in korisnika
//koristimo taj token da bi vertifikovali korisnika
// da bi provjerili token pravimo funkciju verifyUser u utills 
export const updateUser = (req,res,next) =>{

}