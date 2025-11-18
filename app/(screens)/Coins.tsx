import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Image
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

interface CoinPackage {
    id: number;
    coins: number;
    price: number;
    popular: boolean;
    bonus?: number;
    icon: string;
    iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5';
}

interface Transaction {
    id: number;
    type: 'spent' | 'earned';
    amount: number;
    description: string;
    date: string;
}

const Coins = () => {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [currentCoins] = useState<number>(1250);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

    const coinPackages: CoinPackage[] = [
        { id: 1, coins: 100, price: 0.99, popular: false, icon: 'cash-outline', iconFamily: 'Ionicons' },
        { id: 2, coins: 500, price: 3.99, popular: true, icon: 'star', iconFamily: 'FontAwesome5' },
        { id: 3, coins: 1000, price: 6.99, popular: false,  icon: 'flash', iconFamily: 'Ionicons' },
        { id: 4, coins: 5000, price: 29.99, popular: false,  icon: 'crown', iconFamily: 'MaterialCommunityIcons' }
    ];

    const recentTransactions: Transaction[] = [
        { id: 1, type: 'spent', amount: -50, description: 'Premium Feature Access', date: '2 hours ago' },
        { id: 2, type: 'earned', amount: 100, description: 'Purchased Coins', date: '1 day ago' },
        { id: 3, type: 'spent', amount: -25, description: 'Advanced Analysis', date: '2 days ago' },
        { id: 4, type: 'earned', amount: 20, description: 'Daily Bonus', date: '3 days ago' }
    ];

    const calculatePrice = (coins: number): string => {
        return (coins / 100).toFixed(2);
    };

    const handleCustomAmountChange = (value: string): void => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setCustomAmount(numericValue);
    };

    const handlePurchase = (): void => {
        const amount = showCustomInput ? customAmount : coinPackages.find(p => p.id === selectedPackage)?.coins;
        if (amount && parseInt(amount.toString()) > 0) {
            alert(`Processing purchase of ${parseInt(amount.toString()).toLocaleString()} coins`);
        }
    };

    const renderIcon = (iconFamily: string, iconName: any, size: number, color: string) => {
        switch(iconFamily) {
            case 'Ionicons':
                return <Ionicons name={iconName} size={size} color={color} />;
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            case 'FontAwesome5':
                return <FontAwesome5 name={iconName} size={size} color={color} />;
            default:
                return <Ionicons name={iconName} size={size} color={color} />;
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Coins",
                    headerTitleAlign: "center",
                    animation: "slide_from_right",
                    headerStyle: { backgroundColor: "#101521" },
                    headerTintColor: "#fff",
                }}
            />

            <StatusBar barStyle="light-content" />

            <View className="flex-1 bg-[#101521]">
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    <View className="px-4 py-6">
                        <View className="items-center mb-8 gap-y-4">
                            <Image
                                className='w-40 h-40'
                                source={require("../../assets/images/coin.png")}

                            />
                            <Text className="text-white text-5xl font-bold">{currentCoins.toLocaleString()}</Text>
                        </View>


                        <View className="mb-6">
                            <View className="flex-row items-center mb-4">
                                <Ionicons name="sparkles" size={20} color="#fbbf24" />
                                <Text className="text-white text-xl font-bold ml-2">Coin Packages</Text>
                            </View>

                            <View className="flex-row flex-wrap justify-between">
                                {coinPackages.map((pkg) => (
                                    <TouchableOpacity
                                        key={pkg.id}
                                        onPress={() => {
                                            setSelectedPackage(pkg.id);
                                            setShowCustomInput(false);
                                            setCustomAmount('');
                                        }}
                                        className={`w-[48%] p-5 rounded-2xl border-2 mb-4 ${
                                            selectedPackage === pkg.id && !showCustomInput
                                                ? 'border-[#135ced] bg-[#101521]'
                                                : 'border-slate-700 bg-slate-800'
                                        }`}
                                    >
                                        {pkg.popular && (
                                            <View className="absolute -top-2 -right-2 bg-[#135ced] px-3 py-1 rounded-full z-10">
                                                <Text className="text-white text-xs font-bold">POPULAR</Text>
                                            </View>
                                        )}

                                        <View className="items-center">
                                            <View className={`w-16 h-12 rounded-2xl items-center justify-center mb-3 ${
                                                selectedPackage === pkg.id ? 'bg-[#135ced]' : 'bg-slate-700'
                                            }`}>
                                                {renderIcon(pkg.iconFamily, pkg.icon, 32, 'white')}
                                            </View>

                                            <Text className="text-white text-2xl font-bold mb-1">
                                                {pkg.coins.toLocaleString()}
                                            </Text>

                                            <Text className="text-[#135ced] text-lg font-bold">
                                                ${pkg.price}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            
                            <View className="mt-2">
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowCustomInput(!showCustomInput);
                                        setSelectedPackage(null);
                                    }}
                                    className={`p-6 rounded-2xl border-2 ${
                                        showCustomInput
                                            ? 'border-[#135ced] bg-[#101521]'
                                            : 'border-slate-700 bg-slate-800'
                                    }`}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center">
                                            <View
                                                className="w-12 h-12 rounded-xl items-center justify-center bg-[#135ced]"
                                            >
                                                <Ionicons name="add" size={24} color="white" />
                                            </View>
                                            <View className="ml-3">
                                                <Text className="text-white font-bold text-lg">Custom Amount</Text>
                                                <Text className="text-slate-400 text-sm">Enter any amount you want</Text>
                                            </View>
                                        </View>
                                        <Ionicons
                                            name={showCustomInput ? "chevron-up" : "chevron-down"}
                                            size={24}
                                            color="white"
                                        />
                                    </View>
                                </TouchableOpacity>

                                {showCustomInput && (
                                    <View className="mt-4 p-6 bg-slate-800 rounded-2xl border border-slate-700">
                                        <Text className="text-slate-300 text-sm font-medium mb-2">
                                            Enter Coin Amount
                                        </Text>
                                        <View className="relative">
                                            <TextInput
                                                value={customAmount}
                                                onChangeText={handleCustomAmountChange}
                                                placeholder="1000"
                                                placeholderTextColor="#64748b"
                                                keyboardType="numeric"
                                                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white text-2xl font-bold text-center"
                                            />
                                        </View>

                                        {customAmount && parseInt(customAmount) > 0 && (
                                            <View className="flex-row items-center justify-between p-4 bg-slate-900 rounded-xl mt-4">
                                                <Text className="text-slate-400">Total Price:</Text>
                                                <Text className="text-amber-400 text-2xl font-bold">
                                                    ${calculatePrice(parseInt(customAmount))}
                                                </Text>
                                            </View>
                                        )}

                                        <TouchableOpacity
                                            onPress={handlePurchase}
                                            disabled={!customAmount || parseInt(customAmount) === 0}
                                            className="mt-4"
                                        >
                                            <View

                                                className="py-4 rounded-xl items-center bg-[#135ced]"
                                            >
                                                <Text className="text-white font-bold text-base">
                                                    Purchase {customAmount ? parseInt(customAmount).toLocaleString() : '0'} Coins
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                            {/* Purchase Button for Packages */}
                            {selectedPackage && !showCustomInput && (
                                <View className="mt-4">
                                    <TouchableOpacity onPress={handlePurchase}>
                                        <View
                                            className="py-4 rounded-xl items-center bg-[#135ced]"
                                        >
                                            <Text className="text-white font-bold text-base">
                                                Purchase {coinPackages.find(p => p.id === selectedPackage)?.coins.toLocaleString()} Coins
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Coins;