import {TouchableOpacity, View, Text, TextInput, Button} from "react-native";
import '@/global.css'
import {FontAwesome6, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import ServiceCard, {serviceProps} from "@/src/components/ui/serviceCard";
import { useState, useEffect } from "react";
import {Station} from "../../../src/api/station-search-suggestionApi";
import {getStationSuggestions} from '@/src/api/index'




const IndexTab = () => {
    
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [stations, setStations] = useState<Station[]>([]);

    const serviceData:serviceProps[] = [
        {
            id: '1',
            text: 'Check PNR Status',
            icon: <FontAwesome6 name="building-circle-check" size={22} color="#999" />
        },
        {
            id: '2',
            text: 'My Bookings',
            icon: <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color='#999'
            />
        },

    ]


    const handleSearch = async (text: string) => {
        setQuery(text);
        if (text.length < 2) return;

        setLoading(true);
        try {
            const data = await getStationSuggestions(text);
            setStations(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        handleSearch('del')
    }, []);


    return (
          <View className='flex-1 items-center'>
            <View className="px-6 py-8  h-[31vh] w-[90vw] bg-[#ffffff] mt-6 rounded-3xl shadow-lg">
                <View className="mb-4">
                    <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-gray-200">
                        <MaterialIcons name="train" size={24} color="#999" />
                        <TextInput
                            className="flex-1 ml-3 text-lg text-gray-800"
                            placeholder="From Station"
                            placeholderTextColor="#999"
                            value={query}
                            onChangeText={handleSearch}
                        />
                    </View>
                </View>
                <View className="mb-8 relative">
                    <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-gray-200">
                        <MaterialIcons name="location-on" size={24} color="#999" />
                        <TextInput
                            className="flex-1 ml-3 text-lg text-gray-800"
                            placeholder="To Station"
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>
                <TouchableOpacity className="bg-[#5b66d9] rounded-2xl py-4 flex-row justify-center items-center gap-x-1 shadow-lg">
                    <MaterialIcons name="train" size={22} color="#fff" />
                    <Text className="text-white text-lg font-semibold text-center">
                        Find Trains
                    </Text>
                </TouchableOpacity>

            </View>
            {serviceData.map((item) => (
                <View key={item.id}>
                    <ServiceCard {...item} />
                </View>
            ))}

        </View>



    )
}
export default IndexTab
