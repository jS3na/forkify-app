import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { findHealthnessRecipes } from '../../utils/spoonacular';

interface Recipe {
    image: string;
    id: number;
    title: string;
}

export default function CardsHomeOne() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedRecipes = await findHealthnessRecipes('vegetarian', 20);
            setRecipes(fetchedRecipes);
        };

        fetchData();
    }, []);

    return (
        <View>
            <FlatList<Recipe>
                data={recipes}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.recipeCard}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    recipeCard: {
        margin: 10,
    },
    image: {
        width: 180,
        height: 120,
        borderRadius: 8,
    },
    title: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
