import React, { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";
import SeatClassCard from "./seatClassCard";
import { RootState } from "../../store/store"; 
import { fetchTrainList } from "@/src/store/features/trainServices/train-info-thunk";
import { useAppDispatch } from "@/src/store/hooks";

const TrainListCard = ({ fromCode, toCode, date }: any) => {
    const dispatch = useAppDispatch();

    const { trainList, loading, error } = useSelector(
        (state: RootState) => state.trainInfo
    );

    useEffect(() => {
        if (!fromCode || !toCode || !date) return;

        dispatch(
            fetchTrainList({
                from: fromCode,
                to: toCode,
                date,
            })
        );
    }, [fromCode, toCode, date, dispatch]);

    const trains = trainList?.trainList || [];

    return (
        <ScrollView className="flex-1 p-4">
            {/* Loading */}
            {loading && (
                <ActivityIndicator size="large" color="#5b66d9" />
            )}

            {/* Error */}
            {!loading && error && (
                <Text className="text-center text-red-600 font-semibold">
                    {error}
                </Text>
            )}

            {/* Empty */}
            {!loading && !error && trains.length === 0 && (
                <Text className="text-center text-gray-500">
                    No trains found.
                </Text>
            )}

            {/* Train Cards */}
            {!loading &&
                trains.map((train) => (
                    <View
                        key={train.trainNumber}
                        className="bg-white rounded-xl shadow-md overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <View className="px-4 py-3 border-b border-gray-200">
                            <View className="flex-row items-center mb-2">
                                <Text className="text-lg font-bold text-gray-800 mr-2">
                                    {train.trainNumber}
                                </Text>
                                <Text className="text-sm text-gray-700 font-semibold">
                                    {train.trainName}
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    size={20}
                                    color="#999"
                                />
                            </View>

                            {/* Timeline */}
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
                                        <Text className="text-xs text-gray-500">
                                            {train.duration}
                                        </Text>
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

                        {/* Seat Classes */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                            }}
                        >
                            {Object.entries(train.availabilityCache || {}).map(
                                ([classCode, data]: any) => (
                                    <SeatClassCard
                                        key={classCode}
                                        name={classCode}
                                        available={data?.prediction}
                                        updatedAgo={new Date(
                                            data?.cacheTime
                                        ).toLocaleTimeString()}
                                        price={data?.fare}
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
