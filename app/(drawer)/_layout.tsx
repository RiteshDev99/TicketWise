import { Drawer } from "expo-router/drawer";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerContentComponentProps,
} from "@react-navigation/drawer";
import {Feather,  MaterialCommunityIcons} from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, StyleSheet, } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const insets = useSafeAreaInsets();
    const [activeBtn, setActiveBtn] = useState("Train");

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={[
                styles.scrollContentContainer,
                { paddingTop: insets.top },
            ]}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.userInfo}>
                <Image
                    source={require('../../assets/images/drawerImage.png')}
                    style={styles.bgImg}
                    contentFit="cover"
                    transition={300}
                />
                {/*<View style={styles.overlay} />*/}
            </View>
            <View style={styles.drawerItemsContainer}>
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons
                            size={20}
                            name="train-variant"
                            color={activeBtn === "Train" ? "#fff" : "#000"}
                        />
                    )}
                    label="Train"
                    labelStyle={[
                        styles.drawerLabel,
                        { color: activeBtn === "Train" ? "#fff" : "#000" },
                    ]}
                    style={{
                        backgroundColor: activeBtn === "Train" ? "#5b66d9" : "transparent",
                        borderRadius: 8,
                        marginHorizontal: 8,
                    }}
                    onPress={() => {
                        router.push("/(drawer)/(tabs)");
                        setActiveBtn("Train");
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons
                            size={20}
                            name="ticket-confirmation-outline"
                            color={activeBtn === "Ticket" ? "#fff" : "#000"}
                        />
                    )}
                    label="Ticket"
                    labelStyle={[
                        styles.drawerLabel,
                        { color: activeBtn === "Ticket" ? "#fff" : "#000" },
                    ]}
                    style={{
                        backgroundColor: activeBtn === "Ticket" ? "#5b66d9" : "transparent",
                        borderRadius: 8,
                        marginHorizontal: 8,
                    }}
                    onPress={() => {
                        router.push("/(drawer)/(tabs)/ticket");
                        setActiveBtn("Ticket");
                    }}
                />

                <DrawerItem
                    icon={() => (
                        <Feather
                            name="user"
                            size={25}
                            color={activeBtn === "Profile" ? "#fff" : "#000"}
                        />
                    )}
                    label="Profile"
                    labelStyle={[
                        styles.drawerLabel,
                        { color: activeBtn === "Profile" ? "#fff" : "#000" },
                    ]}
                    style={{
                        backgroundColor: activeBtn === "Profile" ? "#5b66d9" : "transparent",
                        borderRadius: 8,
                        marginHorizontal: 8,
                    }}
                    onPress={() => {
                        router.push("/(drawer)/(tabs)/profile");
                        setActiveBtn("Profile");
                    }}
                />


            </View>
        </DrawerContentScrollView>
    );
};

export default function Layout() {
    return (
        <Drawer
            screenOptions={{
                headerShown: false,
                drawerStyle: styles.drawerStyle,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        />
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
        alignItems: "center",
    },
    drawerStyle: {
        width: 300,
        backgroundColor: "#fff",
    },
    userInfo: {
        height: 160,
        width: 300,
        borderBottomRightRadius: 10,
        position: "relative",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    bgImg: {
        width: "100%",
        height: 160,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    headerContent: {
        padding: 20,
        gap: 4,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: "center",
    },
    profileWrapper: {
        width: 73,
        height: 73,
        borderRadius: 73 / 2,
        overflow: "hidden",
    },
    profileGradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "500",
    },
    drawerItemsContainer: {
        flex: 1,
        width: 300,
        paddingTop: 8,
    },
    drawerLabel: {
        fontSize: 16,
        fontWeight: "500",
    },
});
