import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { ChevronLeft } from 'lucide-react-native'
import { ChevronRight } from 'lucide-react-native'


const CustomCalendarHeader = ({
    date,
    onPressArrowLeft,
    onPressArrowRight
}) => {

    // month names for when the month changes by pressing the btns
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    // day names for the specifying the day
    const dayNames = [
        'SU',
        'MO',
        'TU',
        'WE',
        'TH',
        'FR',
        'SA',
    ]
    
    return (
        <View
            className='flex flex-col gap-2 w-full h-fit '
        >
            <View
                className='py-5 px-4 w-full h-fit flex flex-row items-center justify-between'
            >
                <View
                    className='flex flex-row items-center gap-2'
                >
                    {/* gets the current month index then gets the name */}
                    <Text
                        className='text-text text-2xl font-semibold'
                    >
                        {monthNames[new Date(date).getMonth()]} 
                    </Text>

                    {/* just gets the year */}
                    <Text
                        className='text-text text-2xl font-semibold'
                    >
                        {new Date(date).getFullYear()}
                    </Text>

                </View>
                

                {/* month increment and decrement btn */}
                <View
                    className='flex flex-row items-center gap-2 w-fit h-fit'
                >
                    <TouchableOpacity
                        className='p-1'
                        onPress={onPressArrowLeft}
                    >
                        <ChevronLeft/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        className='p-1'
                        onPress={onPressArrowRight}
                    >
                        <ChevronRight/>
                    </TouchableOpacity>
                </View>

            </View>

            {/* day names */}
            <FlatList
                contentContainerClassName='flex flex-row items-center justify-around mb-2'
                data={dayNames}
                renderItem={({ item }) => {
                    return (
                        <Text
                            className='text-text/50 '
                        >
                            {item}
                        </Text>
                    )
                }}
                key={(item, index) => index.toString()}
            />

        </View>
    )
}

export default CustomCalendarHeader