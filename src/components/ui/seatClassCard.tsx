import React from 'react';
import { View, Text } from 'react-native';

interface SeatClassCardProps {
    name: string;
    price?: string;
    available: string;
    isTatkal?: boolean;
    updatedAgo: string;
}

const SeatClassCard = ({
                           name,
                           price,
                           available,
                           isTatkal,
                           updatedAgo,
                       }: SeatClassCardProps) => {
    return (
        <View
            className={`rounded-2xl border shadow-sm mx-2 mb-3 p-3 min-w-[150px] min-h-[100px] ${
                available?.toLowerCase().includes('avail')
                    ? 'bg-green-50 border-green-200'
                    : available?.toLowerCase().includes('wl')
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-red-50 border-red-200'
            }`}
        >
            <View className='flex-row justify-between items-center '>
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold text-gray-800">{name}</Text>

                    {isTatkal && (
                        <View className="bg-orange-500 px-2 py-0.5 rounded-full">
                            <Text className="text-white text-[10px] font-semibold">Tatkal</Text>
                        </View>
                    )}
                </View>

                <Text className="text-base font-semibold text-gray-700">
                    {price ? `₹${price}` : '—'}
                </Text>
            </View>


            <Text
                className={`font-bold text-base mt-1 `}
            >
                {available || '—'}
            </Text>

            <Text className="text-gray-400 text-xs mt-2">{updatedAgo}</Text>
        </View>
    );
};

export default SeatClassCard;
