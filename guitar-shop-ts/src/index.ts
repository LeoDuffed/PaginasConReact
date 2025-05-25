// Definimos valores:  
export type Guitar = {
  id : number;
  name : string;
  image : string;
  description : string;
  price : number;
} 

export type CartItem = Guitar &{
    quiantity : number;
} 
