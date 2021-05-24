import { FC } from "react";
import { IPropsIngrediensList } from "../../models/IProps";

export const IngredientsList:FC<IPropsIngrediensList> = ({list}) =>{
    const printList = () =>{
        return list.map(ingred =>{
            return(
                <tr key="ingred.id">
                    <td>{ingred.name}</td>
                    <td>{ingred.quantity}</td>
                </tr>
            )
        })
    }
    return (
        <div id="ingredients-list">

        <table>
            <tr>
            <th>Name</th>
            <th>Quantity</th>
            </tr>
            {printList()}
        </table>
        </div>
    )
}