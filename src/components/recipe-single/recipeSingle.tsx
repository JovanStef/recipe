import { FC, ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import CRecipe from "../../models/recipe/CRecipe";
import { IngredientsList } from "../../partial-components/ingredients-list/ingredientsList";
import { recipeService } from "../../services/recipe-services/recipeService"
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export const RecipeSingle:FC<ReactNode> = () =>{

	const classes = useStyles();

	const [recipe , setRecipe] = useState<CRecipe>();
	const [ingredients , setIngrdients] = useState([]);

    let id:any  = useParams();

    let loadRecipe = async() =>{
        let response:CRecipe | any =  await recipeService('http://localhost:3004/recipes').getRecipebyID(id.id)
				if(response){
					console.log(response[0])
					setRecipe(response[0]);
					setIngrdients(response[0].ingredients[0])

				}
    }

		const deleteRecipe =() =>{
			if (window.confirm("Delete Recipe ?")){
					recipe?.deleteRecipe().then((data) =>{
						if(data.status === 200){
							alert("Recipe deleted succesfully")
							window.location.href="/";
						}else{
							alert("Recipe not deleted succesfully")
						}
					})
			}
	}

    useEffect(()=>{
			loadRecipe();
		},[])
    return (
        <div className="container recipe-single">
					<h1 className="col-12">{recipe?.getName()}</h1>
					<div className="row">
					<div className="col-12 col-md-6">
						
						<table>
							<thead>
										<tr>
											<th>Name</th>
											<th>Source</th>
											<th>Preparation time</th>
										</tr>
							</thead>
								<tbody>
										<tr>
											<td>{recipe?.getName()}</td>
											<td>{recipe?.getSource()}</td>
											<td>{recipe?.getPreparationTime()}</td>
										</tr>
								</tbody>
						</table>
						<IngredientsList list={ingredients}/>
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
							startIcon={<DeleteIcon />}
							onClick={deleteRecipe}
						>
							Delete Recipe
						</Button>
					</div>
					<div className="col-12 col-md-6">
						<table>
							<thead>
								<tr>
									<th>Preparation Instructions</th>
								</tr>
								<tr>
									<td>{recipe?.getPrepInstructions().full()}</td>
								</tr>
							</thead>
							<tbody>
										</tbody>
						</table>
					</div>
					</div>
        </div>
    )
}