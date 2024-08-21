import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';

import { getRecipeDetailsbyId } from '../../utils/spoonacular';

interface Equipment {
    name: string;
    image: string;
}

interface Ingredient {
    name: string;
    image: string;
}

interface Step {
    number: number;
    step: string;
    ingredients: Ingredient[];
    equipment: Equipment[];
}

interface AnalyzedInstruction {
    step: ReactNode;
    number: ReactNode;
    name: string;
    steps: Step[];
}

interface Recipe {
    image: string;
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    extendedIngredients: { original: string }[];
    instructions: string;
    equipment?: Equipment[];
    analyzedInstructions: AnalyzedInstruction[];
}

export default function RecipeDetail() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    const { recipeid } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Recipe Detail',
        });

        const fetchRecipesbyId = async () => {
            const fetchedRecipe = await getRecipeDetailsbyId(recipeid);
            setRecipe(fetchedRecipe);
            setLoading(false);
        };

        fetchRecipesbyId();
    }, [recipeid]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="green" style={styles.loadingIndicator} />
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {recipe && (
                        <>
                            <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                            <Text style={styles.title}>{recipe.id}</Text>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoText}>Ready in {recipe.readyInMinutes} minutes</Text>
                                <Text style={styles.infoText}>Servings: {recipe.servings}</Text>
                            </View>

                            <Text style={styles.subheading}>Ingredients:</Text>
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <Text key={index} style={styles.ingredientText}>
                                    - {ingredient.original}
                                </Text>
                            ))}

                            {recipe.analyzedInstructions.length == 0 ? null :
                                <Text style={styles.subheading}>Instructions:</Text>
                            }
                            {recipe.analyzedInstructions.map((instruction, index) => (
                                <View key={index} style={styles.stepContainer}>

                                    {instruction.steps.map((step, stepIndex) => (
                                        <View key={stepIndex} style={styles.stepDetail}>
                                            <Text style={styles.stepNumber}>Step {step.number}:</Text>
                                            <Text style={styles.stepText}>{step.step}</Text>

                                            {step.equipment.map((equip, equipIndex) => (
                                                equip.image ? (
                                                    <View key={equipIndex} style={styles.equipmentContainer}>
                                                        <Image style={styles.equipmentImage} source={{ uri: equip.image }} />
                                                        <Text style={styles.equipmentName}>{equip.name}</Text>
                                                    </View>
                                                ) : null
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            ))}

                        </>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    contentContainer: {
        paddingBottom: 30,
    },
    recipeImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        marginVertical: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    infoText: {
        fontSize: 16,
        color: '#495057',
    },
    subheading: {
        fontSize: 22,
        fontWeight: '600',
        color: '#343a40',
        marginTop: 16,
        marginBottom: 8,
    },
    ingredientText: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 4,
    },
    stepContainer: {
        marginBottom: 16,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: '600',
        color: '#343a40',
    },
    stepText: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 8,
    },
    stepDetail: {
        marginBottom: 12,
    },
    equipmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    equipmentImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    equipmentName: {
        fontSize: 16,
        color: '#495057',
    },
});
