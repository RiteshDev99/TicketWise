import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SeatClassCard from './seatClassCard';

interface SeatClass {
    name: string;
    price: string;
    available: boolean;
    isTatkal?: boolean;
    updatedAgo: string;
}

const TrainListCard = () => {
    const seatClasses: SeatClass[] = [
        { name: 'SL', price: '₹180', available: false, updatedAgo: '45 mins ago' },
        { name: 'SL', price: '', available: false, isTatkal: true, updatedAgo: '37 mins ago' },
        { name: '3E', price: '', available: false, updatedAgo: '10 mins ago' },
    ];

    return (
        <ScrollView className="flex-1 p-4">
            <View className="bg-white rounded-lg shadow-md overflow-hidden">
                <View className="px-4 py-3 border-b border-gray-200">
                    <View className="flex-row items-center mb-2">
                        <Text className="text-lg font-bold text-gray-800 mr-2">19489</Text>
                        <Text className="text-sm text-gray-700">Adi Gkp Exp</Text>
                        <Text className="text-gray-400 ml-1">›</Text>
                    </View>
                    
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                            <Text className="text-xl font-bold text-gray-800">12:50</Text>
                            <Text className="text-green-600 text-xs mt-1">BSB</Text>
                        </View>
                        
                        <View className="flex-1 items-center mx-4">
                            <View className="flex-row items-center">
                                <View className="h-2 w-2 bg-gray-300 rounded-full" />
                                <View className="h-0.5 flex-1 bg-gray-300 mx-1" />
                                <Text className="text-xs text-gray-500">5h 25m</Text>
                                <View className="h-0.5 flex-1 bg-gray-300 mx-1" />
                                <View className="h-2 w-2 bg-gray-300 rounded-full" />
                            </View>
                        </View>
                        
                        <View className="flex-row items-center gap-3">
                            <Text className="text-xl font-bold text-gray-800">18:15</Text>
                            <Text className="text-green-600 text-xs mt-1">GKP</Text>
                        </View>
                    </View>
                </View>
                
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                >
                    <View className="flex-row">
                        {seatClasses.map((seat, index) => (
                            <View key={index} className="mr-3">
                                <SeatClassCard {...seat} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

export default TrainListCard;
