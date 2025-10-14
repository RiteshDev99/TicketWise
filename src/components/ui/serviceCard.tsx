import {View, Text, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {ReactElement} from "react";

export type serviceProps = {
    id?: string;
    text?: string;
    icon?: ReactElement;
    onPress?: () => void;
}

export default  function ServiceCard(Props: serviceProps) {
    return(
        <>
            <TouchableOpacity className='w-[90vw] h-20 bg-white rounded-2xl shadow-lg mt-6 flex-row justify-between items-center px-5'
                              activeOpacity={0.8}
                              onPress={Props.onPress}
            >
                <View className=' flex-row gap-x-4'>
                    {Props.icon}
                    <Text className='text-lg'>{Props.text}</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
            </TouchableOpacity>
        </>
    )

}
