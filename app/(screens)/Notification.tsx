import {View, Text, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Stack} from "expo-router";
import React from "react";

const Notification = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Coins",
                    headerTitleAlign: "center",
                    animation: "slide_from_right",
                    headerStyle: { backgroundColor: "#101521" },
                    headerTintColor: "#fff",

                }}
            />

            <View className=' flex-1 bg-[#101521] flex items-center justify-center gap-5'>
                <Image
                    className='w-40 h-40'
                    source={require("../../assets/images/coin.png")}

                />
                <Text className='text-2xl text-[#fff]'>Your Coins</Text>
            </View>
        </>

    )
}
export default Notification;
