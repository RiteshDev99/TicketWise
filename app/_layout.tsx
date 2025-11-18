import { Stack } from 'expo-router';
import '@/global.css';
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/src/store/store";

export default function Layout() {
    return (
        <>
            <Provider store={store}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />

                <Stack
                    screenOptions={{
                        animation:'default',
                        contentStyle: { backgroundColor: "#000" },
                        headerStyle: { backgroundColor: "#000" },
                        headerTintColor: "#fff",
                    }}
                >
                    <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                </Stack>
            </Provider>
        </>
    );
}
