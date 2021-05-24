import axios from "axios"
import CRecipe from "../../models/recipe/CRecipe"
import { IRecipe } from "../../models/recipe/IRecipe"
import { ingredientService } from "../ingredient-services/ingredientService"

export const recipeService = (url:string = 'http://localhost:3004/recipes') =>{
    const getRecipes = async()=>{
        try{
            let response = await axios.get(url)
            let nn =  response.data.map(async(elem:any)=>{
                return await ingredientService()
                .getIngredients(elem.ingredients).then((ingredients)=>{
                    return new CRecipe(elem.name , elem.source , elem.preparationTime , elem.preparationInstructions , ingredients , elem.id)
                });
            });
            return await Promise.all(nn)
        }catch(error){
            console.error(error)
        }
    }
    const getRecipebyID = async (param:string | number) => {
        try{
            let response:any = await axios.get(url + "?id=" + param)
            let nn = response.data.map(async(elem:any)=>{
                return await ingredientService()
                .getIngredients(elem.ingredients).then((ingredients)=>{
                    return new CRecipe(elem.name , elem.source , elem.preparationTime , elem.preparationInstructions , ingredients , elem.id)
                });
            });
            return await Promise.all(nn)
        }catch(error){
            console.error(error)
        }
    }
    const setRecipe = async (payload:IRecipe | any) => {
        try{
            return await axios.post(url ,{...payload})
        }catch(error){
            console.error(error)
        }
    }
    const deleteRecipeByID = async (id:string | number | undefined) => {
        try{
            console.log('delete fired')
            return await axios.delete(url+"/"+id)
        }catch(error){
            console.error(error)
        }

    }
    return{
        getRecipes,
        getRecipebyID,
        setRecipe,
        deleteRecipeByID
    }
}