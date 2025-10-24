import {TouchableOpacity, View, Text, TextInput, FlatList, ActivityIndicator} from "react-native";
import '@/global.css'
import {FontAwesome6, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import ServiceCard, {serviceProps} from "@/src/components/ui/serviceCard";
import {router} from "expo-router";
import { getStationSuggestions } from "@/src/api/station-search-suggestionApi";

const IndexTab = () => {

    const serviceData: serviceProps[] = [
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

    

    return (
        <View className='flex-1 items-center'>
            <View className="px-6 py-8 w-[90vw] bg-[#ffffff] mt-6 rounded-3xl shadow-lg">
                <View className="mb-4 relative z-20">
                    <TouchableOpacity className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-gray-200"
                                      activeOpacity={1.6}

                                      onPress={() => router.push({
                                          pathname: '/(screens)/searchScreen',
                                          params: {
                                              PlaceHolderName: "From Station",
                                              fieldType: "from",
                                          }
                                      })}
                    >
                        <MaterialIcons name="train" size={24} color="#999" />
                        <TextInput
                            className="flex-1 ml-3 text-lg text-gray-800"
                            placeholder="From Station"
                            editable={false}
                            placeholderTextColor="#999"
                        />
                    </TouchableOpacity>
                </View>
                
                <View className="mb-8 relative z-10">
                    <TouchableOpacity className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-gray-200"
                                      activeOpacity={1.6}

                                      onPress={() => router.push({
                                          pathname: '/(screens)/searchScreen',
                                          params: {
                                              PlaceHolderName: "To Station",
                                              fieldType: "to",
                                          }
                                      })}
                    >
                        <MaterialIcons name="location-on" size={24} color="#999" />
                        <TextInput
                            className="flex-1 ml-3 text-lg text-gray-800"
                            placeholder="To Station"
                            placeholderTextColor="#999"
                            editable={false}
                        />
                    </TouchableOpacity>
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