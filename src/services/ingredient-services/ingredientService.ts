import axios from "axios";
import { CIngredient } from "../../models/ingredients/CIngredients";
import { capitalizeFirstLetter } from "../helpers";

export const ingredientService = (url:string = 'http://localhost:3004/ingredients') =>{
    const getIngredients = async(ingreds:any[] = [])=>{
        try{
            let response = await axios.get(url)
            let IngredientsRes = []
            if(ingreds.length === 0){
                IngredientsRes = response.data.map((elem:any)=>{
                   return new CIngredient(elem.name, undefined ,elem.id)
               });
            }else {
                ingreds.forEach((ingr) => {
                    let temp = response.data.filter((elem:any)=>{
                        return ingr.id === elem.id
                    }).map((elem:any)=>{
                        return new CIngredient(elem.name , ingr.quantity , elem.id )
                    });
                    IngredientsRes.push(temp);
                })
            }
            return IngredientsRes
        }catch(error){
            console.error(error)
        }
    }
    const getIngredientsByID = async (param:string | number) => {
        try{
            return await axios.get(url + "?id=" + param)
        }catch(error){
            console.error(error)
        }
    }
    const addNewIngredient = async (name:string)=>{
        try{
            let temp = new CIngredient(capitalizeFirstLetter(name))
             await axios.post(url , {name:temp.name , id:temp.id})
             return temp
        }catch(error){
            console.error(error)
        }
    }
    return{
        getIngredients,
        getIngredientsByID,
        addNewIngredient
    }
}