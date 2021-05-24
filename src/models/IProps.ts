import { IIngredient } from "./ingredients/IIngredient";

export interface IPropsRecipe {
    id?:string | undefined,
    name:string,
    source:string,
    preparationTime:string,
    preparationInstructions:string,
    ingredientsIDs:string[],
    ingredients:IIngredient[]
}

export interface IPropsIngrediensList {
    list:IIngredient[];
}
export interface IPropsModal{
    title:string,
    body:string,
    onOkTxt:string,
    callback():any
}