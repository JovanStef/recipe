import React, { FC } from "react"
import { Link } from "react-router-dom"
import CRecipe from "../../models/recipe/CRecipe"
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

export const RecipeItem:FC< CRecipe> = (recipe , changeHandler) =>{
const deleteRecipe =() =>{
    if (window.confirm("Delete Recipe ?")){
        recipe.deleteRecipe().then((x) =>{
            window.location.reload(false);
        })
    }
}
    return (
        <>
            <td>{recipe.getID()}</td>
            <td>{recipe.getName()}</td>
            <td>{recipe.getSource()}</td>
            <td>{recipe.getIngredients().obj().length}</td>
            <td>{recipe.getIngredients().short()}</td>
            <td>{recipe.getPrepInstructions().short()}</td>
            <td>{recipe.getPreparationTime()}</td>
            <td><table><tbody><tr><td><Link to={`/${recipe.getID()}`}><InfoIcon /></Link>
            </td><td onClick={ deleteRecipe} ><DeleteIcon /></td></tr></tbody></table></td>
        </>
    )
}


