import React, { useState } from "react";
import {ScrollView, View} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";

import styles from "./styles";

function Favorites() {

    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {

        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);

                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect( // executa o método toda vez que a tela entrar em foco.
        React.useCallback(() => { // Ajuste pra evitar que a tela entre em looping
            loadFavorites();
        }, [])
    )

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos"/>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ // aplicar conteúdo na scroll view
                    // (melhor pra padding)
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    );

}

export default Favorites;
