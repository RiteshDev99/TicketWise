import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ScrollView,
} from "react-native";
import "@/global.css";
import {
    FontAwesome6,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import ServiceCard, { serviceProps } from "@/src/components/ui/serviceCard";
import { router } from "expo-router";
import { useAppSelector } from "@/src/store/hooks";
import { useDispatch } from "react-redux";
import { dateSelect } from "@/src/store/features/locationFetchSlice"; 

const IndexTab: React.FC = () => {
    const serviceData: serviceProps[] = [
        {
            id: "1",
            text: "Check PNR Status",
            icon: <FontAwesome6 name="building-circle-check" size={22} color="#999" />,
        },
        {
            id: "2",
            text: "My Bookings",
            icon: (
                <MaterialCommunityIcons
                    name="ticket-confirmation-outline"
                    size={24}
                    color="#999"
                />
            ),
        },
    ];

    type DayItem = {
        label: string;
        date: Date;
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
        });
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const days: DayItem[] = [
        { label: "Today", date: today },
        { label: "Tomorrow", date: tomorrow },
        { label: "Day After", date: dayAfter },
    ];

    const [selected, setSelected] = useState<string>("Today");
    const dispatch = useDispatch();

    const {
        fetchFromLocation,
        fetchToLocation,
        fetchFromLocationCode,
        fetchToLocationCode,
        dateSelect: selectedDateFromStore,
    } = useAppSelector((state: any) => state.locationFetch);
    
    const selectedDate = days.find((d) => d.label === selected)?.date ?? today;
    
    const formattedDate = `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
    
    useEffect(() => {
        dispatch(dateSelect(formattedDate));
        console.log("Selected Date:", formattedDate);
    }, [selected, dispatch]);

    return (
        <ScrollView className="flex-1 bg-[#f5f5f5]">
            <View className="flex-1 items-center pb-20">
                <View className="px-6 py-8 w-[90vw] bg-[#ffffff] mt-6 rounded-3xl shadow-lg">
                    <View className="mb-4 relative z-20">
                        <TouchableOpacity
                            className="flex-row items-center bg-white rounded-2xl px-4 py-2 border-b border-gray-200"
                            activeOpacity={1.6}
                            onPress={() =>
                                router.push({
                                    pathname: "/(screens)/searchScreen",
                                    params: {
                                        PlaceHolderName: "From Station",
                                        fieldType: "from",
                                    },
                                })
                            }
                        >
                            <MaterialIcons name="train" size={24} color="#999" />
                            <TextInput
                                className="flex-1 ml-3 text-lg text-gray-800"
                                placeholder="From Station"
                                value={fetchFromLocation}
                                editable={false}
                                placeholderTextColor="#999"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* To Station */}
                    <View className="mb-4 relative z-10">
                        <TouchableOpacity
                            className="flex-row items-center bg-white rounded-2xl px-4 py-2 border-b border-gray-200"
                            activeOpacity={1.6}
                            onPress={() =>
                                router.push({
                                    pathname: "/(screens)/searchScreen",
                                    params: {
                                        PlaceHolderName: "To Station",
                                        fieldType: "to",
                                    },
                                })
                            }
                        >
                            <MaterialIcons name="location-on" size={24} color="#999" />
                            <TextInput
                                className="flex-1 ml-3 text-lg text-gray-800"
                                placeholder="To Station"
                                value={fetchToLocation}
                                placeholderTextColor="#999"
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Date Selector */}
                    <View className="mb-8 relative z-20">
                        <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 border-b border-gray-200 overflow-hidden gap-x-2 pb-6">
                            <MaterialIcons name="calendar-month" size={24} color="#999" />

                            <Text className="text-gray-800 font-medium text-sm">
                                {formatDate(selectedDate)}
                            </Text>

                            <View className="flex-row flex-1 justify-evenly">
                                {days.map((item) => (
                                    <TouchableOpacity
                                        key={item.label}
                                        activeOpacity={0.6}
                                        onPress={() => setSelected(item.label)}
                                        className={`py-1 px-2 border rounded-xl ${
                                            selected === item.label
                                                ? "border-[#5b66d9] bg-blue-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <Text
                                            className={`text-[10px] ${
                                                selected === item.label
                                                    ? "text-blue-600 font-semibold"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Find Trains Button */}
                    <TouchableOpacity
                        className={`rounded-2xl py-4 flex-row justify-center items-center gap-x-1 shadow-lg ${
                            fetchFromLocation && fetchToLocation
                                ? "bg-[#5b66d9]"
                                : "bg-gray-400"
                        }`}
                        onPress={() =>
                            router.push({
                                pathname: "/(screens)/trainList",
                                params: {
                                    fromName: fetchFromLocation,
                                    toName: fetchToLocation,
                                    fromCode: fetchFromLocationCode,
                                    toCode: fetchToLocationCode,
                                    travelDate: formattedDate, // ✅ Use formatted date here
                                },
                            })
                        }
                        disabled={!fetchFromLocation || !fetchToLocation}
                    >
                        <MaterialIcons name="train" size={22} color="#fff" />
                        <Text className="text-white text-lg font-semibold text-center">
                            Find Trains
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Extra Service Cards */}
                {serviceData.map((item) => (
                    <View key={item.id}>
                        <ServiceCard {...item} />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default IndexTab;
