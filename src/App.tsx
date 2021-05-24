import './App.scss';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import  {RecipeSingle}  from "./components/recipe-single/recipeSingle";
import {NewRecipe} from "./components/new-recipe/newRecipe";
import {RecipeList} from "./components/recipe-list/recipeList";
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="container my-3">
        <Link to={'/'}><HomeIcon style={{fontSize:50}} /></Link>  
      </div>
        <Switch>
          <Route path="/add-recipe">{<NewRecipe />}</Route>
          <Route path="/:id">{<RecipeSingle />}</Route>
          <Route path="/">{<RecipeList />}</Route>
        </Switch>
      </ BrowserRouter>
    </div>
  );
}

export default App;
