import { IIngredient } from "./IIngredient";
import { v4 as uuidv4 } from "uuid";

export class CIngredient implements IIngredient{
    id?:string | undefined;
    name: string;
    quantity?: string | number;
     constructor(name:string , quantity?:string|number|undefined , id?:string | undefined){
         id ? this.id = id : this.id = uuidv4();
         this.name = name;
         this.quantity = quantity;
     }
     getName = () =>{
         return this.name;
     }
}