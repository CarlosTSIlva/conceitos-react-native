import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import api from './services/api'




export default function App() {
    const [repositories, Setrepositories] = useState([])
    useEffect(() => {
        api.get('repositories').then(res => {
            console.log(res.data)
            Setrepositories(res.data)
        })
    }, [])


    async function handleLikeRepository(id) {
        const res = await api.post(`repositories/${id}/like`)
        const repositorieIndex = respositories.findIndex(repositorie => repositorie.id == res.data.id)
        repositories[repositorieIndex] = res.data
        Setrepositories([...repositories])
     }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <SafeAreaView style={styles.container}>
                
                <FlatList
                    data={repositories}
                    keyExtractor={repositorie => repositorie.id}
                    renderItem={({ item: repositorie }) =>(<View style={styles.repositoryContainer}>
                    <Text style={styles.repository}>{repositorie.title}</Text>

                    <View   style={styles.techsContainer}>
                        <Text style={styles.tech}>
                                {repositorie.techs}
                        </Text>
                        <Text style={styles.tech}>
                                {repositorie.url}
                            </Text>
                    </View>

                    <View style={styles.likeContainer}>
                        <Text
                            style={styles.likeText}
                            // Remember to replace "1" below with repository ID: {`repository-like-${repository.id}`}
                        >
                                Like:{repositorie.like}{repositorie.likes}
                        </Text>
                        </View> 
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleLikeRepository((repositorie.id))}
                        // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                            testID={`like-button-${repositorie.id}`}
                    >
                        <Text style={styles.buttonText}>Curtir</Text>
                    </TouchableOpacity>
                </View>
                        )}
                    />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7159c1",
    },
    repositoryContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        padding: 20,
    },
    repository: {
        fontSize: 32,
        fontWeight: "bold",
    },
    techsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    tech: {
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 10,
        backgroundColor: "#04d361",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#fff",
    },
    likeContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        textAlign:'center',
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
        color: "#fff",
        backgroundColor: "#7159c1",
        padding: 15,
    },
});

