import { CardMeal } from "components/CardMeal/CardMeal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLimitedRecipesByCategory } from "redux/outerRecipes/outerRecipesOperations";
import { getLimitedRecipes } from "redux/outerRecipes/outerRecipesSelectors";
import { CardTableWrap, RowTable } from "./CategoriesByName.styled";


const CategoriesByName = () => {
const dispatch = useDispatch();
    const { categoryName } = useParams();
    const limitedRecipes = useSelector(getLimitedRecipes);
// console.log();
    useEffect(() => {
        const params = { category: categoryName, limit: 12 };
        if (categoryName === 'desserts') {dispatch(getLimitedRecipesByCategory({ category: 'dessert', limit: 12 }))}
        else {dispatch(getLimitedRecipesByCategory(params))};
       
    }, [dispatch, categoryName] );

    return (
        <RowTable>
            {limitedRecipes.slice(0, 8).map(meal => (
                <CardTableWrap key={meal.idMeal}>
                    <CardMeal meal={meal}  />
                </CardTableWrap>
            ))}
        </RowTable>
    );
  
};

export default CategoriesByName;