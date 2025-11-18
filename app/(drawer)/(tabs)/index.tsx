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
            icon: <FontAwesome6 name="building-circle-check" size={22} color="#135ced" />,
        },
        {
            id: "2",
            text: "My Bookings",
            icon: (
                <MaterialCommunityIcons
                    name="ticket-confirmation-outline"
                    size={24}
                    color="#135ced"
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
    }, [selected, dispatch]);

    return (
        <ScrollView className="flex-1 bg-[#101521]">
            <View className="flex-1 items-center pb-20">
                <View className="px-6 py-8 w-[90vw] bg-[#192233] mt-6 rounded-3xl shadow-lg">
                    <View className="mb-4 relative z-20 border border-gray-600 rounded-xl">
                        <TouchableOpacity
                            className="flex-row items-center bg-[#101521] rounded-xl px-4 py-2 "
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
                            <View className='border-r border-gray-600 pr-3'>
                                <MaterialIcons name="train" size={24} color="#135ced" />
                            </View>
                            <TextInput
                                className="flex-1 ml-3 text-lg text-[#fff]"
                                placeholder="From Station"
                                value={fetchFromLocation}
                                editable={false}
                                placeholderTextColor="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* To Station */}
                    <View className="mb-4 relative z-10 border border-gray-600 rounded-xl">
                        <TouchableOpacity
                            className="flex-row items-center bg-[#101521] rounded-xl px-4 py-2 "
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
                            <View className='border-r border-gray-600 pr-3'>
                                <MaterialIcons name="location-on" size={24} color="#135ced" />
                            </View>
                            <TextInput
                                className="flex-1 ml-3 text-lg text-[#fff]"
                                placeholder="To Station"
                                value={fetchToLocation}
                                placeholderTextColor="#fff"
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Date Selector */}
                    <View className="mb-8 relative z-20 border border-gray-600 rounded-xl">
                        <View className="flex-row  items-center bg-[#101521] rounded-xl px-4 py-2  overflow-hidden gap-x-2 pb-6">
                            <View className='border-r border-gray-600 pr-3'>
                                <MaterialIcons name="calendar-month" size={24} color="#135ced" />
                            </View>

                            <Text className="text-[#fff] font-medium text-sm">
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
                                                ? "border-[#5b66d9] bg-[#135ced]"
                                                : "border-gray-600"
                                        }`}
                                    >
                                        <Text
                                            className={`text-[10px] ${
                                                selected === item.label
                                                    ? "text-[#fff] font-semibold"
                                                    : "text-[#fff]"
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
                                ? "bg-[#135bec]"
                                : "bg-[#135bec]"
                        }`}
                        onPress={() =>
                            router.push({
                                pathname: "/(screens)/trainList",
                                params: {
                                    fromName: fetchFromLocation,
                                    toName: fetchToLocation,
                                    fromCode: fetchFromLocationCode,
                                    toCode: fetchToLocationCode,
                                    travelDate: formattedDate, 
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
