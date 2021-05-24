import { IIngredient } from "../ingredients/IIngredient";
import { IRecipe } from "./IRecipe";
import { v4 as uuidv4 } from "uuid";
import { arrayToCSV, excerpt, formatClockTime } from "../../services/helpers";
import { recipeService } from "../../services/recipe-services/recipeService";


export default class Recipe implements IRecipe{
    id?: string | undefined;
    name: string;
    source: string;
    ingredients: IIngredient[];
    preparationTime: string;
    preparationInstructions: string;

    constructor(
        name:string , 
        source:string , 
        preparationTime:string ,
        preparationInstructions:string ,
        ingredients: IIngredient[],
        id?:string | undefined 
        ){
        id ? this.id = id : this.id = uuidv4();
        this.name = name;
        this.source = source;
        this.ingredients = ingredients;
        // this.setIngredients();
        this.preparationTime = preparationTime;
        this.preparationInstructions = preparationInstructions;
    }
    getID = ():string | undefined =>{
        return this.id;
    }
    getName = ():string =>{
        return this.name;
    }
    setName = (newName:string):void =>{
        this.name = newName;
    }
    getSource = ():string =>{
        return this.source;
    }
    setSource = (newSource:string):void =>{
        this.source = newSource;
    }
    getIngredients = ():any =>{
        // short and long version
        const short =()=>{
            return arrayToCSV(this.ingredients , 'name', 3);
            
        }
        const full =()=>{
            return arrayToCSV(this.ingredients , 'name');
        }

        const obj = () =>{
            return this.ingredients;

        }
        return {
            short,
            full,
            obj
        }
    }
    setIngredients = async ():Promise<void> =>{
    }
    getPreparationTime = ():string =>{
        return formatClockTime(this.preparationTime);
    }
    setPreparationTime = (newTime:string):void =>{
        this.preparationTime = formatClockTime(newTime);
    }

    getPrepInstructions = ():any =>{
        const short = () =>{
            return excerpt(this.preparationInstructions , 5)
            
        }
        const full =()=>{
            return this.preparationInstructions;
        }
        return {
            short,
            full
        }
    }
    setPrepInstructions = (newPrepInstructions:string):void =>{
        this.preparationInstructions = newPrepInstructions
    }
    deleteRecipe = async ():Promise<any> => {
         return await recipeService('http://localhost:3004/recipes').deleteRecipeByID(this.id)
    }
}