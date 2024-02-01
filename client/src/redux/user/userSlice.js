import { createSlice } from "@reduxjs/toolkit";

//prvi korak je kreiranje iniciajlnog stanja (pocetnog stanja) jer zelimo da imamo loading false i error false

const initialState = {
    currentUser : null, //trenutni korisnik nema ga kad ga budemo imali povucemo ga iz baze podataka
    error:null, //
    loading:false
}

//koristeci pocetno stanje mozemo da kreiramo korisnicki isjecak

const userSlice = createSlice({

    name:'user',
    initialState,
    reducers:{ //funkcije
        signInStart : (state)=>{
            state.loading = true;
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload, // trenutno korisnik podatke dobijamo iz action
            state.loading = false; //nema ocitavanja vise jer smo dobili podatke
            state.error = null; // bitno jer smo mozda imali error za predhodno prijavljivanje pa ga uklanjamo
        },
        signInFailure : (state,action)=>{ //funkcija za neuspjesno prijavljivanje
            state.error = action.payload; // greska koja dobijamo u slucaju da je neupsjesno prijavljivanje
            state.loading = false;
        }
    } 
});

//potrebno je izvesti reduktore odnosno funkcije i njih cemo koristiti na drugim mjestima kao sto je SignIn.js npr

export const { signInStart,signInSuccess,signInFailure } = userSlice.actions ;

// potrebno je izvesti reducer korisnika tj dodajemo korisnicki dio slice

export default userSlice.reducer;