import React from 'react';
import { View, Text } from 'react-native';

interface SeatClassCardProps {
    name: string;
    price?: string;
    available: boolean;
    isTatkal?: boolean;
    updatedAgo: string;
}

const SeatClassCard: React.FC<SeatClassCardProps> = ({
                                                         name,
                                                         price,
                                                         available,
                                                         isTatkal,
                                                         updatedAgo,
                                                     }) => {
    return (
        <View className="bg-red-50 border border-red-200 rounded-lg p-2 min-w-[160px]">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-lg font-bold text-gray-800">{name}</Text>
                
                {isTatkal && (
                    <View className="bg-green-500 px-2 py-0.5 rounded-full">
                        <Text className="text-white text-xs font-semibold">Tatkal</Text>
                    </View>
                )}
            </View>
            
            {price ? (
                <Text className="text-base font-semibold text-gray-700">{price}</Text>
            ) : (
                <Text className="text-base font-semibold text-gray-700">—</Text>
            )}
            
            <Text
                className={`font-bold text-base mt-1 ${
                    available ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {available ? 'Available' : 'Not Available'}
            </Text>
            
            <Text className="text-gray-400 text-xs mt-2">{updatedAgo}</Text>
        </View>
    );
};

export default SeatClassCard;
