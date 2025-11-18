import {View,Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#101521]">
            <View className="flex-1 items-center justify-center">
                <Text className='text-3xl text-[#fff]'>Welcome to Your Profile</Text>
            </View>
        </SafeAreaView>
    )
}
export default ProfileTab
