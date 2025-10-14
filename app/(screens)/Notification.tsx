import {View, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Stack} from "expo-router";
import React from "react";

const Notification = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Notification",
                    headerTitleAlign: "center",
                    animation: "slide_from_right",
                }}
            />

            <View className='h-full w-full flex items-center justify-center gap-5'>
                <Ionicons name="notifications-off-sharp" size={38} color="#000" />
                <Text className='text-2xl'>Notification</Text>
            </View>
        </>

    )
}
export default Notification;
