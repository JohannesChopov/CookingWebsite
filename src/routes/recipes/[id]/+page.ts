
import type { Load } from '@sveltejs/kit';

type DetailedRecipe = {
    idMeal : number;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea : string;
    strInstruction : string;
    ingredients : {name: string}[];
}

/*
const recipes: Recipe[] = [
    { 
        idMeal:52771, 
        strMeal: 'Spicy Arrabiata Penne', 
        strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg'
    }
];

export const load = async() => {
    return {
        recipes
    }
}
*/

/*

const API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

export const load = async ({ fetch }) => {

    const response = await fetch(`${API}`);
    const recipes: Recipe[] = await response.json();

    return {
        recipes
    }
};
*/


/*
const API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export const load = async ({ fetch, params }) => {
    const { id } = params;
    const response = await fetch(`${API}${id}`);
    const data = await response.json();

    // Check if the recipe exists and extract only the relevant information
    const recipe = data.meals ? {
        idMeal: data.meals[0].idMeal,
        strMeal: data.meals[0].strMeal,
        strMealThumb: data.meals[0].strMealThumb,
        strCategory: data.meals[0].strCategory,
        strArea: data.meals[0].strArea,
        strInstruction: data.meals[0].strInstruction,
        ingredients: data.meals[0].ingredients,
    } : null;

    return {
        recipe
    };
};
*/

