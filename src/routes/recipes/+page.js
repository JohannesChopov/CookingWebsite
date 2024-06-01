/** @type {import('./$types').PageLoad} */
export async function load( {data} ) {

    const recipes = data.recipes

    return {
        recipes: recipes
    };
};