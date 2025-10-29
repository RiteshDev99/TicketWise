import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import SeatClassCard from './seatClassCard';
import { TrainLists } from '../../api';
import { Trains } from '../../api/train-list';
import {MaterialIcons} from "@expo/vector-icons";
import {useLocalSearchParams} from 'expo-router';

const TrainListCard = ({fromCode, toCode, date}:any) => {
    const [trains, setTrains] = useState<Trains[]>([]);
    
    useEffect(() => {
        console.log('From Code:', fromCode, 'To Code:', toCode);
    }, []);

    useEffect(() => {
        if (!fromCode || !toCode) return;
        const fetchTrainData = async (): Promise<void> => {
            try {
                const response = await TrainLists({ from: fromCode, to: toCode, date: date });

                const trainData: Trains[] =
                    response?.trainList?.map((train: any) => ({
                        avlClassesSorted: train.avlClassesSorted,
                        availabilityCache: train.availabilityCache,
                        availabilityCacheTatkal: train.availabilityCacheTatkal,
                        arrivalTime: train.arrivalTime,
                        trainName: train.trainName,
                        fromStnCode: train.fromStnCode,
                        toStnCode: train.toStnCode,
                        fromStnName: train.fromStnName,
                        toStnName: train.toStnName,
                        trainNumber: train.trainNumber,
                        trainType: train.trainType,
                        duration: train.duration,
                        distance: Number(train.distance),
                        fromCityName: train.fromCityName,
                        toCityName: train.toCityName,
                        departureTime: train.departureTime,
                    })) || [];

                setTrains(trainData);
            } catch (error) {
                console.error('Error fetching train data:', error);
            }
        };

        fetchTrainData();
    }, []);

    return (
        <ScrollView className="flex-1 p-4">
            {trains.map((train) => (
                <View
                    key={train.trainNumber}
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-4"
                >
                    <View className="px-4 py-3 border-b border-gray-200">
                        <View className="flex-row items-center mb-2">
                            <Text className="text-lg font-bold text-gray-800 mr-2">
                                {train.trainNumber}
                            </Text>
                            <Text className="text-sm text-gray-700">{train.trainName}</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={20} color="#999" />

                        </View>

                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                <Text className="text-xl font-bold text-gray-800">
                                    {train.arrivalTime}
                                </Text>
                                <Text className="text-green-600 text-xs mt-1">
                                    {train.fromStnCode}
                                </Text>
                            </View>

                            <View className="flex-1 items-center mx-4">
                                <View className="flex-row items-center">
                                    <View className="h-2 w-2 bg-gray-300 rounded-full" />
                                    <View className="h-0.5 flex-1 bg-gray-300 mx-1" />
                                    <Text className="text-xs text-gray-500">{train.duration}</Text>
                                    <View className="h-0.5 flex-1 bg-gray-300 mx-1" />
                                    <View className="h-2 w-2 bg-gray-300 rounded-full" />
                                </View>
                            </View>

                            <View className="flex-row items-center gap-3">
                                <Text className="text-xl font-bold text-gray-800">
                                    {train.departureTime}
                                </Text>
                                <Text className="text-green-600 text-xs mt-1">
                                    {train.toStnCode}
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                    >
                        {Object.entries(train.availabilityCache || {}).map(
                            ([classCode, data]) => (
                                <SeatClassCard
                                    key={classCode}
                                    name={classCode}
                                    available={data.prediction}
                                    updatedAgo={new Date(data.cacheTime).toLocaleTimeString()}
                                    price={data.fare}
                                />
                            )
                        )}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
};

export default TrainListCard;
