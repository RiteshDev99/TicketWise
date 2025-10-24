import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const TrainList = () => {
    const { fromCode, toCode, fromName, toName  } = useLocalSearchParams<{ 
        fromCode: string; toCode: string; fromName:string; toName:string
    
    }>();


    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#5b66d9" />

            <Stack.Screen
                options={{
                    headerTitle: 'Search Results',
                    headerTitleAlign: 'center',
                    animation: 'slide_from_right',
                    headerStyle: {
                        backgroundColor: '#5b66d9',
                    },
                    headerTintColor: '#fff',
                    headerRight: () => (
                        <View className="flex-row items-center gap-4 mr-2">
                            <TouchableOpacity className="p-2">
                                <Ionicons name="share-social-outline" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-2">
                                <Ionicons name="ellipsis-vertical" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />

            <View className="flex-1 bg-gray-50">
                <View className="bg-[#5b66d9] pb-6 pt-3">
                    <View className="px-4">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-1 items-center">
                                <Text className="text-white text-lg font-semibold"  numberOfLines={1}>{fromCode} - {fromName}</Text>
                                <Text className="text-white text-sm opacity-90">Junction</Text>
                            </View>

                            <View className="px-4">
                                <Ionicons name="arrow-forward" size={24} color="white" />
                            </View>

                            <View className="flex-1 items-center">
                                <Text className="text-white text-lg font-semibold"  numberOfLines={1}>{toCode} - {toName}</Text>
                                <Text className="text-white text-sm opacity-90">Junction</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Train List Content */}
            
            </View>
        </>
    );
};

export default TrainList;