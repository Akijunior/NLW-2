import React, {useState} from "react";
import {ScrollView, Text, TextInput, TouchableHighlight, View} from "react-native";
import {Picker} from "@react-native-community/picker";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";

import {Feather, AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import api from "../../services/api";

import styles from "./styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";


interface TimeStateProps {
    DateDisplay?: string;
    visibility?: boolean;
}

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState<(string | number)>('');
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


    const [state, setState] = useState<TimeStateProps>();

    function addZero(i: string | number) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function handleConfirm(date: Date) {
        const timeValue = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
        setState({DateDisplay: timeValue });
        setTime(timeValue);
    }

    function onPressCancel() {
        setState({visibility: false})
    }

    function onPressButton() {
        setState({visibility: true})
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
                                <View style={styles.input}>
                                    <AntDesign name="down" size={20} style={styles.pickerIcon}/>
                                    <Picker
                                        mode="dropdown"
                                        style={styles.pickerContent}
                                        selectedValue={week_day}
                                        onValueChange={text => setWeekDay(text)}
                                    >
                                        <Picker.Item label="Domingo" value={0}/>
                                        <Picker.Item label="Segunda-feira" value={1}/>
                                        <Picker.Item label="Terça-feira" value={2}/>
                                        <Picker.Item label="Quarta-feira" value={3}/>
                                        <Picker.Item label="Quinta-feira" value={4}/>
                                        <Picker.Item label="Sexta-feira" value={5}/>
                                        <Picker.Item label="Sábado" value={6}/>
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <View style={styles.input}>
                                    <TouchableHighlight onPress={onPressButton}>
                                        <View>
                                            <AntDesign
                                                name="clockcircleo"
                                                size={20}
                                                color="black"
                                                style={styles.pickerTimeIcon}
                                            />
                                            <Text
                                                style={styles.hourDisplay}>
                                                {state?.DateDisplay ? state?.DateDisplay : '00:00'}
                                            </Text>
                                            <DateTimePickerModal
                                                onConfirm={handleConfirm}
                                                isVisible={state?.visibility}
                                                onCancel={onPressCancel}
                                                mode="time"
                                            />
                                        </View>
                                    </TouchableHighlight>
                                </View>
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
