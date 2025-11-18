import { View, Text,  StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, } from 'expo-router';
import TrainListCard from "@/src/components/ui/trainListCard";
import { useAppSelector } from "@/src/store/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

const TrainList = () => {
    const { fromCode, toCode, fromName, toName  } = useLocalSearchParams<{
        fromCode: string; toCode: string; fromName:string; toName:string
    
    }>();

    const { dateSelect } = useAppSelector((state) => state.locationFetch);

    
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#5b66d9" />

            <Stack.Screen
                options={{
                    headerTitle: 'Search Results',
                    headerTitleAlign: 'center',
                    animation: 'flip',
                    headerStyle: {
                        backgroundColor: '#101621',
                    },
                    headerTintColor: '#fff',
                }}
            />
            
            <SafeAreaView className="flex-1 bg-[#101621]">
                <View className="bg-[#101621] pb-6 px-4">
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


                    <TrainListCard fromCode={fromCode} toCode={toCode}  date={dateSelect}/>

                
            </SafeAreaView>
        </>
    );
};

export default TrainList;