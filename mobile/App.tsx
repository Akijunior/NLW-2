import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AppLoading } from "expo"; // fica mostrando a splashscreen do app enquanto as fontes carregam.

import { Archivo_400Regular, Archivo_700Bold, useFonts } from "@expo-google-fonts/archivo/index";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins/index";
import AppStack from "./src/routes/AppStack";

export default function App() {

    let [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    else {
        return (
            <>
                <AppStack />
                <StatusBar style="light" />
            </>
        );
    }


}
