import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = ({ routeName, title }) => {
    const navigation = useNavigation();

    const titles = {
        index: "Ticket-Wise",
        ticket: "Ticket",
        profile: "Profile",
    };

    const headerTitle = titles[routeName] ?? title;

    return (
        
        <>
            <StatusBar backgroundColor="#101621" barStyle="light-content" />

      
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <View style={styles.header}>
                {/*<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>*/}
                {/*    <Ionicons size={28} name="menu-outline" color="#fff" />*/}
                {/*</TouchableOpacity>*/}

                <Text style={styles.title}>
                    <Text style={styles.title}>{headerTitle}</Text>
                </Text>

                <TouchableOpacity
                    className='flex-row items-center justify-evenly px-3  py-2 rounded-full bg-[#192233] gap-x-2 border border-[0.5px] border-gray-600'
                    onPress={() => router.push("/(screens)/Notification")}
                    activeOpacity={0.6}
                >
                   <Image
                          className='w-6 h-6'
                       source={require("../../assets/images/coin.png")}
                       
                   />
                    <Text className='text-[#fff]'>56088</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#101621",
    },
    header: {
        height: 56,
        width: "100%",
        backgroundColor: "#101621",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: "600",
    },
  
});

export default CustomHeader;
