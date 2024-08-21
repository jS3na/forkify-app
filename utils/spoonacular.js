const apiKey = process.env.EXPO_PUBLIC_SPOONACULAR_KEY;

const findByNutrients = async (action, quantMin, quantMax, number) => {
    const url = `https://api.spoonacular.com/recipes/findByNutrients?min${action}=${quantMin}&max${action}=${quantMax}&number=${number}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('Fetching error:', e);
        return [];
    }
};

const findHealthnessRecipes = async (diet, maxReadyTime) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&maxReadyTime=${maxReadyTime}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (e) {
        console.error('Fetching error:', e);
        return [];
    }
};

const getRecipeDetailsbyId = async (recipeid) => {
    const url = `https://api.spoonacular.com/recipes/${recipeid}/information?apiKey=${apiKey}&includeNutrition=true`;
    console.log(url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error('Fetching error:', e);
        return [];
    }
}

export { findByNutrients, findHealthnessRecipes, getRecipeDetailsbyId };
