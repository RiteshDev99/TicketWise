import { Tabs } from 'expo-router';
import { FontAwesome6,  Feather  , MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "@/src/components/customHeader";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#5b66d9',
                header: ({ route, options }) => (
                    <CustomHeader
                        routeName={route.name}
                        title={options.title || route.name}
                    />
                ),
                tabBarStyle: {
                    paddingBottom: insets.bottom,
                    height: 60 + insets.bottom,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Feather name="search" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ticket"
                options={{
                    title: 'Ticket',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="ticket-confirmation-outline"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
