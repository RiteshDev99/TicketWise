import React, { useState, useEffect } from "react";
import { StatusBar, TextInput, View, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useAppDispatch   } from '@/src/store/hooks'
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import {
    fetchStationSuggestions,
} from "@/src/store/features/trainServices/train-info-thunk";
import { clearStations } from "@/src/store/features/trainServices/train-info-slice";
import { Station } from "@/src/store/features/trainServices/train-info-API";
import { setFromLocation, setToLocation } from "@/src/store/features/locationFetchSlice";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [searched, setSearched] = useState(false);
    const {PlaceHolderName} = useLocalSearchParams<{ PlaceHolderName: string }>();
    const {fieldType} = useLocalSearchParams<{ fieldType: "from" | "to" }>();

    
    const dispatch = useAppDispatch();
    const { stations, loading } = useSelector((state: RootState) => state.trainInfo);

    useEffect(() => {
        dispatch(fetchStationSuggestions(""));
    }, [dispatch]);

    useEffect(() => {
        if (!query.trim()) {
            dispatch(clearStations());
            setSearched(false);
            return;
        }

        const delayDebounce = setTimeout(() => {
            setSearched(true);
            dispatch(fetchStationSuggestions(query));
        }, 200);

        return () => clearTimeout(delayDebounce);
    }, [query, dispatch]);


    const handleResultPress = (result: Station, fieldType: "from" | "to") => {
        const payload = {
            name: result.stationName,
            code: result.stationCode,
        };

        if (fieldType === "from") {
            dispatch(setFromLocation(payload));
        } else {
            dispatch(setToLocation(payload));
        }

        router.push("/(drawer)/(tabs)");
    };
    
    const renderSearchResult = ({item}: { item: Station }) => (
        <TouchableOpacity className="p-4 border-b border-gray-600 flex-row items-center gap-4"
                          onPress={() => handleResultPress(item, fieldType)}
        >
            <View className="w-16 h-8 bg-[#135ced] rounded-lg justify-center items-center">
                <Text className="text-[13px] text-white  ">{item.stationCode}</Text>
            </View>
            <Text className="text-[15px] text-[#fff]">{item.stationName}</Text>
        </TouchableOpacity>
    );
    
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                    contentStyle: { backgroundColor: "#101621" },
                }}
            />

            <StatusBar backgroundColor="#2E8BC0" barStyle="light-content" />

            <SafeAreaView className="flex-1 bg-[#101621]">
                <View className="flex-row items-center border-b border-gray-600 px-4 pb-4 pt-4">
                    <Ionicons
                        name="arrow-back-outline"
                        size={25}
                        color="#fff"
                        style={{ marginRight: 12 }}
                        onPress={() => router.back()}
                    />
                    <TextInput
                        placeholder={PlaceHolderName}
                        className="flex-1 text-lg text-[#fff] py-2 px-2"
                        placeholderTextColor="#fff"
                        autoFocus
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        selectTextOnFocus
                        value={query}
                        onChangeText={setQuery}
                    />
                    {
                        loading ?
                            <ActivityIndicator size="small" color="#135ced" />
                            : 
                            <Entypo 
                                name="cross" size={24} color="#fff"
                                onPress={() => setQuery('')}

                            />
                    }

                </View>

                {!loading && searched && stations?.length === 0 && (
                    <View className="mt-10 items-center">
                        <Text className="text-gray-500 text-lg">No stations found</Text>
                    </View>
                )}
                <FlatList
                    data={stations}
                    keyExtractor={(item) => `${item.stationCode}-${item.stationName}`}
                    renderItem={renderSearchResult}
                />
            </SafeAreaView>
        </>
    );
}
