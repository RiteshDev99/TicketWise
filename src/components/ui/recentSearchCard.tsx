import { View ,Text} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

const RecentSearchCard = () => {
    return(
        <View className='w-[90vw] h-20 bg-white rounded-2xl shadow-lg mt-6 flex-row justify-between items-center px-5'>
            <View className='flex-col gap-2'>
                <Text className='text-lg font-semibold'>Marudhar Express</Text>
                <Text>#7687687</Text>
            </View>

            <View className='flex-row items-center gap-4'>
                <Text>AY</Text>
               <Ionicons name="arrow-forward-outline" size={18} color="black" />
            </View>

            <View>
                
            </View>

        </View>
        )

}

export default RecentSearchCard