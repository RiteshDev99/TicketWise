import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
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
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons size={28} name="menu-outline" color="#14223B" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    <Text style={styles.title}>{headerTitle}</Text>
                </Text>

                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={() => router.push("/(screens)/Notification")}
                    activeOpacity={0.6}
                >
                    <Ionicons name="notifications-outline" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#f7f7f7",
    },
    header: {
        height: 56,
        width: "100%",
        backgroundColor: "#f7f7f7",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "600",
    },
    notificationButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#5b66d9",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CustomHeader;
