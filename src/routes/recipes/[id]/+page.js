/** @type {import('./$types').PageLoad} */
export async function load({params, data}) {
    return {id : params.id,
            recipe : data.recipe};
};