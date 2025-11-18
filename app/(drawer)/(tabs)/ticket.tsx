import {View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '@/global.css'

const TicketTab = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#101521]">
            <View className="flex-1 items-center justify-center">
                <Text className='text-3xl text-[#fff]'>Welcome to Ticket Counter</Text>
            </View>
        </SafeAreaView>
    )
}

export default TicketTab
