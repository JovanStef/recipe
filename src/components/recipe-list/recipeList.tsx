import { FC, ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import CRecipe from "../../models/recipe/CRecipe";
import {RecipeItem} from "../../partial-components/recipe-item/recipeItem";
import { recipeService } from "../../services/recipe-services/recipeService"
import Button from '@material-ui/core/Button';
export const RecipeList:FC<ReactNode> = () =>{
    const [recipes , setRecipes] = useState<CRecipe[] | any>([]);
    const printRecipes = (recipes:CRecipe[]) =>{
        return recipes.map((recipe)=>{
            return(
                <tr key={recipe.id}><RecipeItem {...recipe} /></tr>   
            )
        })
    }
    const loadRecipes = async() =>{
        let response:CRecipe[] | any = await recipeService()
        .getRecipes();
            setRecipes(response);
        
    }
    useEffect(()=>{
        loadRecipes();
    },[]);
    return (
        <div className="container ">
            <h1>Recipes</h1>
            <div className="table-container">

        <table>
            <tbody>

            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Source</th>
            <th>Number of Ingredients</th>
            <th>Ingredients</th>
            <th>Istructions</th>
            <th>Time</th>
            <th>Actions</th>
            </tr>
            <>{printRecipes(recipes)}</>
            </tbody>
            

        </table>
            </div>
        <div className="add-recipe mt-5">
                <Link to={"/add-recipe"}>
                    <Button variant="contained" color="primary">
                        Add recipe
                    </Button>
                </Link>
            </div>
        </div>
    )
}