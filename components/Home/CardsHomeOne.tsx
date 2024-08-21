import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { findHealthnessRecipes } from '../../utils/spoonacular';
import { useRouter } from 'expo-router';

import { getCardFromFirebase } from '../../utils/getFromFirebase';

interface Recipe {
    image: string;
    id: number;
    title: string;
}

interface Card {
    diet: string;
    time: number;
    title: string;
}

export default function CardsHomeOne() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [firstCard, setFirstCard] = useState<Card | null>(null);

    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchCard = async () => {
            const fetchedCard = await getCardFromFirebase('firstHomePage');
            setFirstCard(fetchedCard);
            console.log(firstCard);
        };

        fetchCard();
    }, []);

    useEffect(() => {
        if (firstCard) {
            const { diet, time } = firstCard;
            const fetchData = async () => {
                const fetchedRecipes = await findHealthnessRecipes(diet, time);
                setRecipes(fetchedRecipes);
                setLoading(false);
            };

            fetchData();
        }
    }, [firstCard]);

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="green" style={styles.loadingIndicator} />
            ) : (
                <ScrollView>
                    {firstCard &&
                        <Text>{firstCard.title}</Text>
                    }
                    <FlatList<Recipe>
                        data={recipes}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => router.push('/recipedetail/' + item.id)} style={styles.recipeCard}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                                <Text style={styles.title}>{item.title}</Text>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </ScrollView>
            )}
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
});
