import React, { useState } from "react";
import {ScrollView, Text, TextInput, View, Picker } from "react-native";
// import { Picker } from "@react-native-community/picker";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import api from "../../services/api";

import styles from "./styles";

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {

        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    }


    function handleToggleFiltersVisible() {

        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {

        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF"/>
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <Picker
                                    selectedValue={week_day}
                                    style={styles.input}
                                    onValueChange={(itemValue, itemIndex) => setWeekDay(itemValue)}
                                >
                                    <Picker.Item label="Domingo" value={0} />
                                    <Picker.Item label="Segunda-feira" value={1} />
                                    <Picker.Item label="Terça-feira" value={2} />
                                    <Picker.Item label="Quarta-feira" value={3} />
                                    <Picker.Item label="Quinta-feira" value={4} />
                                    <Picker.Item label="Sexta-feira" value={5} />
                                    <Picker.Item label="Sábado" value={6} />
                                </Picker>
                                {/*<TextInput*/}
                                {/*    style={styles.input}*/}
                                {/*    value={week_day}*/}
                                {/*    onChangeText={text => setWeekDay(text)}*/}
                                {/*    placeholder="Qual o dia?"*/}
                                {/*    placeholderTextColor="#c1bccc"*/}
                                {/*/>*/}
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton
                            onPress={handleFiltersSubmit}
                            style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ // aplicar conteúdo na scroll view
                    // (melhor pra padding)
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />)
                }
                )}
            </ScrollView>
        </View>
    );
}

export default TeacherList;
