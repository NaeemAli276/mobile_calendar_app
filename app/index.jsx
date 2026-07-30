import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft } from 'lucide-react-native'
import { Calendar } from 'react-native-calendars';

const index = () => {

    const [selected_date, set_selected_date] = useState(new Date().toISOString().substring(0,10))
    const [selected_month, set_selected_month] = useState(new Date().toISOString().substring(0,10))

    useEffect(() => {
        console.log(selected_date)
    }, [])

    return (
        <SafeAreaView
            className='flex relative h-screen w-full font-regular'
        >

            <View
                className='relative bg-darker_background flex flex-col py-5 gap-8'
            >

                {/* blue mini background */}
                <View className='bg-primary w-full h-56 absolute top-0 left-0'></View>

                {/* header/greeting */}
                <Text
                    className='w-full h-fit text-background font-semibold text-2xl pl-6'
                >
                    Hello Naeem
                </Text>

                {/* main content */}
                <View
                    className='w-full h-full flex flex-col gap-5 px-8 py-10'
                >

                    {/* month/year view and month change btns */}
                    <View
                        className='w-full h-fit flex flex-row items-center justify-between'
                    >

                        {/* month and year */}
                        <View
                            className='flex flex-row items-center gap-1 w-fit h-fit'
                        >
                            
                            <Text
                                className='text-2xl text-background font-medium'
                            >
                                {/* placeholder */}
                                July
                            </Text>
                            <Text
                                className='text-2xl text-background font-medium'
                            >
                                {/* placeholder */}
                                2026
                            </Text>

                        </View>

                        {/* month change btns */}
                        <View
                            className='flex flex-row items-center gap-1 w-fit h-fit'
                        >
                            <TouchableOpacity
                                className='p-1'
                                onPress={() => {}} // decrement month
                            >
                                <ChevronLeft
                                    color={'#ffffff'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className='p-1 rotate-180'
                                onPress={() => {}} // increment month
                            >
                                <ChevronLeft
                                    color={'#ffffff'}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* main calendar component */}
                    <Calendar
                        current={selected_month}
                        // current={'2026-06-20'}
                        theme={{
                            backgroundColor: '#eff6ff',
                            calendarBackground: '#eff6ff',
                            textDayFontFamily: 'Poppins',
                            selectedDayBackgroundColor: '#3b82f6',
                            selectedDayTextColor: '#eff6ff',
                        }}
                        style={{
                            borderRadius: 8,
                            shadowColor: '#172554',
                            // iOS shadow
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            // Android shadow (elevation)
                            elevation: 3,
                            // Add some rounding for better visual effect
                            borderRadius: 10, 
                            paddingBottom: 4
                        }}
                        renderHeader={() => null}
                        hideArrows={true}
                    />

                </View>

            </View>

        </SafeAreaView>
    )
}

export default index