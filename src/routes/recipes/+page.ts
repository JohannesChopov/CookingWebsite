
import type { Load } from '@sveltejs/kit';

type Recipe = {
    idMeal : number;
    strMeal: string;
    strMealThumb: string;
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

const API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

export const load = async ({ fetch }) => {
    const response = await fetch(API);
    const data = await response.json();
    
    // Extract only the relevant information from the data
    const recipes = data.meals.map(meal => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb
    }));

    return {
        recipes
    };
};

