import React, { useState, useEffect } from "react";
import { StatusBar, TextInput, View, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Station } from "@/src/api/station-search-suggestionApi";
import { getStationSuggestions } from "@/src/api/station-search-suggestionApi";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (query && query.trim().length > 2) { 
                setLoading(true);
                setSearched(true);
                try {
                    const results = await getStationSuggestions(query);
                    setStations(results);
                    console.log("Fetched stations:", results);
                } catch (error) {
                    console.error(error);
                    setStations([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setStations([]);
                setSearched(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);
    
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                }}
            />

            <StatusBar backgroundColor="#2E8BC0" barStyle="dark-content" />

            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-row items-center border-b border-gray-600 px-4 pb-4 pt-4">
                    <Ionicons
                        size={25}
                        name="arrow-back-outline"
                        color="black"
                        onPress={() => router.dismiss()}
                        style={{ marginRight: 12 }}
                    />
                    <TextInput
                        placeholder='search for station'
                        className="flex-1 text-lg text-gray-800 py-2 px-2"
                        placeholderTextColor="#9CA3AF"
                        autoFocus
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        selectTextOnFocus
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>

                {loading && (
                    <View className="mt-6 items-center">
                        <ActivityIndicator size="large" />
                    </View>
                )}

                {!loading && searched && stations.length === 0 && (
                    <View className="mt-10 items-center">
                        <Text className="text-gray-500 text-lg">No stations found</Text>
                    </View>
                )}
                <FlatList
                    data={stations}
                    keyExtractor={(item) => `${item.stationCode}-${item.stationName}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="p-4 border-b border-gray-200 flex-row items-center gap-4">
                            <View className="w-16 h-8 bg-[#5b66d9] rounded-lg justify-center items-center">
                                <Text className="text-[13px] text-white  ">{item.stationCode}</Text>
                            </View>
                            <Text className="text-[15px] text-gray-500">{item.stationName}</Text>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </>
    );
}
