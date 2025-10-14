import { Stack } from 'expo-router';
import '@/global.css'
import {StatusBar} from "react-native";
export default function Layout() {
    return (
        <>

            <StatusBar backgroundColor="#000" barStyle="dark-content" />
        <Stack

        >
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        </>
    );
}
