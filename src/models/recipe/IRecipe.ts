import { IIngredient } from "../ingredients/IIngredient";

export interface IRecipe{
    id?:string | undefined,
    name:string,
    source:string,
    ingredients?:IIngredient[] | undefined,
    preparationTime:string,
    preparationInstructions:string
}