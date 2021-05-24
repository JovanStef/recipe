import React, { FC, ReactNode, useEffect, useState } from "react"
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, MenuItem } from "@material-ui/core";
import { ingredientService } from "../../services/ingredient-services/ingredientService";
import { CIngredient } from "../../models/ingredients/CIngredients";
import { IIngredient } from "../../models/ingredients/IIngredient";
import { IngredientsList } from "../../partial-components/ingredients-list/ingredientsList";
import Recipe from "../../models/recipe/CRecipe";
import { recipeService } from "../../services/recipe-services/recipeService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
			padding: '5px',
      width: '50%',
    },
		time:{
			padding: '5px',
      		width: '25%',
			  [theme.breakpoints.down("xs")]:{
				  width:'50%'
			  }
		},
		textArea: {
			padding: '5px',
				width:'100%',
				
		},
		button:{
			margin: '5px',
		}
  }),
);
export const NewRecipe:FC<ReactNode> = () =>{
		const [recipeName , setRecipeName] = useState('');
		const [ingredientName , setIngredientName] = useState('');
		const [hours , setPrepTimeHours] = useState('0');
		const [minutes , setPrepTimeMin] = useState('0');
		const [recipeSource , setRecipeSource] = useState('');

		const [prepInstructions , setPrepIstructions] = useState('');
		
		const [submitDisabled , setSubmitDisabled] = useState(true);

		const [ingredients ,setIngredients] = useState([]);
		const [ingredientQuantity , setIngredientQuantity] = useState('')
		const [newIngredientForm , setNewIngredientForm] = useState(false);
		const [newIngredient , setNewIngredient] = useState('');
		const [chosenIngredients , setChosenIngredients] = useState<IIngredient[]>([]);


		const handleSubmitDisabled =()=>{
			if(((hours && hours !== '0') || (minutes && minutes !== '0')) && chosenIngredients.length !== 0 && recipeName && prepInstructions){
				setSubmitDisabled(false)
				return true
			}else{
				setSubmitDisabled(true)
				return false
			}
		}


		const addNewIngredient=async()=>{
			let newChosenIngred:CIngredient | any = await ingredientService().addNewIngredient(newIngredient)
			loadIngridients();
			setChosenIngredients([...chosenIngredients , {id:newChosenIngred.id ,name:newChosenIngred.name,quantity:ingredientQuantity}])
			setNewIngredient('');
			setIngredientQuantity('')
			setNewIngredientForm(false)

		}

		const addChosenIngredient =()=>{
			let ingredient:IIngredient[] | any[] = ingredients.filter((ingred:any) => ingred.id === ingredientName)
			ingredient[0].quantity = ingredientQuantity
			setChosenIngredients([...chosenIngredients , ingredient[0]])
			setIngredientName('');
			setIngredientQuantity('')
		}
		const handleRecipeSubmit = async (_evt:any) =>{

			_evt.preventDefault();
			if(handleSubmitDisabled()){
				console.log(hours +":"+ minutes)
				let tempRecipe = new Recipe(recipeName , recipeSource , hours +":"+ minutes,prepInstructions , chosenIngredients);
				console.log(tempRecipe)
				await recipeService().setRecipe(tempRecipe).then((e)=>{
					if(!e){
						alert('Recipe was not added')
					}else
					alert('Recipe succesfully added')
					window.location.href = '/'
				});
			}

    }

		const ingredientsNameHandler = (_evt:any) =>{
			if(_evt.target.value === 'new'){
				setNewIngredientForm(true)
			}else{
				setIngredientName(_evt.target.value);
				setNewIngredientForm(false)
			}
		}

		const loadIngridients = async() =>{
			let response: CIngredient[] | any = await ingredientService().getIngredients([]);
			setIngredients(response)

		}

    useEffect(()=>{
			loadIngridients();
				},[]);

    const classes = useStyles();

    return (
        <div className="d-flex flex-wrap justify-content-center ">
        <div className="new-recipe d-flex flex-column flex-wrap justify-content-center p-3">
        <div className="border-bottom mb-3"><h5>Add Recipe:</h5></div>
        

        <form noValidate autoComplete="off" onSubmit={handleRecipeSubmit} onChange={handleSubmitDisabled}>
				<div>
					<TextField 
						className={classes.input}
						required 
						id="recipe-name" 
						label="Recipe name" 
						variant="filled" 
						helperText={!recipeName && "Recipe name is required."}
						onChange={(_evt:any) => setRecipeName(_evt.target.value)}
					/>
					
					<TextField 
						className={classes.input}
						id="recipe-source" 
						label="Recipe source" 
						variant="filled"
						value={recipeSource}
						onChange={(_evt:any) => setRecipeSource(_evt.target.value)}
					/>
				</div>
				<hr />
				<div>
				<div>Ingredients:</div>
					{chosenIngredients.length > 0 && <IngredientsList list={chosenIngredients}/>}
				</div>
				{
				!newIngredientForm ? 
				<div>
					
						<TextField
							className={classes.input}
							required
							id="filled-select-currency-native"
							select
							label="Ingredients"
							variant="filled"
							helperText={chosenIngredients.length === 0 && "Ingredients are required."}
							value={ingredientName}
							onChange={ingredientsNameHandler}
						>
							{ingredients.map((option:IIngredient) => (
								<MenuItem key={option.name} value={option.id}>
									{option.name}
								</MenuItem>
							))}
							<MenuItem key="new" value="new">
							Add new ingredient
							</MenuItem>
						</TextField>

						<TextField 
								className={classes.time}
								id="ingredQuantity" 
								label="Quantity" 
								variant="filled" 
								placeholder="eg. 500 gr"
								value={ingredientQuantity}
								onChange={(_evt:any)=>setIngredientQuantity(_evt.target.value)}

								/>
				<div>
				<Button 
				className={classes.button} 
				onClick={addChosenIngredient} 
				disabled={ingredientName ? false :true } 
				variant="contained" color="primary">Add ingredient</Button>
				</div>
				</div> : 				
				<div>
						<div>Add new ingredient:</div>
						<TextField 
						required
						className={classes.input}
						id="newIngredientName" 
						label="Ingredient name" 
						variant="filled"
						value={newIngredient} 
						helperText={!newIngredient && "Name is required."}
						onChange={(_evt:any)=>setNewIngredient(_evt.target.value)}
						/>
						
						<TextField 
						className={classes.time}
						id="newIngredQuantity" 
						label="Quantity" 
						variant="filled" 
						value={ingredientQuantity}
						onChange={(_evt:any)=>setIngredientQuantity(_evt.target.value)}

						/>
						<div>
						<Button className={classes.button}onClick={addNewIngredient} disabled={newIngredient === ''} variant="contained" color="primary">Add ingredient</Button>
						<Button className={classes.button}onClick={()=> setNewIngredientForm(false)} variant="contained" color="primary">x</Button>

						</div>
				</div>
				}
						<hr />
				<div>
						<div>Prepartion time* :</div>
						<TextField
						className={classes.time}
						id="hours" 
						label="Hours" 
						inputProps={{ min: 0, max: 12 }}
						type="number"
						value={hours}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(_evt:any) => setPrepTimeHours(_evt.target.value)}
						/>
						<TextField
						className={classes.time}
						id="minutes" 
						label="Minutes" 
						value={minutes}
						inputProps={{ min: 0, max: 55 ,step:5}}
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(_evt:any) => setPrepTimeMin(_evt.target.value)}
						/>
				</div>

				<div>

				<TextField
					required
					className={classes.textArea}
          id="recipe-instructions"
          label="Recipe preparation instructions"
          placeholder="Write your recipe instructions"
          multiline
          variant="filled"
					helperText={!prepInstructions && "Instructions are required."}
					onChange={(_evt:any) => setPrepIstructions(_evt.target.value)}
					/>
					</div>
					<div className="m-3">
						<Button type="submit" disabled={submitDisabled} variant="contained" color="primary">Save recipe</Button>
					</div>
        </form>
        </div>
        </div>
    )
}