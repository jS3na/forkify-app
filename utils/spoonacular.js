import { useState, useEffect } from 'react';

const apiKey = process.env.EXPO_PUBLIC_SPOONACULAR_KEY;

const findByNutrients = async (action, quantMin, quantMax, number) => {
    const url = `https://api.spoonacular.com/recipes/findByNutrients?min${action}=${quantMin}&max${action}=${quantMax}&number=${number}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const findHealthnessRecipes = async (diet, maxReadyTime) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&maxReadyTime=${maxReadyTime}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export { findByNutrients, findHealthnessRecipes };
