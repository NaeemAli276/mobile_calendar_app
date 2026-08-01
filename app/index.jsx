import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Calendar } from 'react-native-calendars'
import CustomCalendarHeader from '../components/CustomCalendarHeader'
import { Plus } from 'lucide-react-native'
import CategoryBtn from '../components/CategoryBtn'
import { SwipeListView } from 'react-native-swipe-list-view'
import TaskItem from '../components/TaskItem'

const index = () => {

    const [selected_date, set_selected_date] = useState(new Date().toISOString().substring(0,10))
    const [tasks, set_tasks] = useState([
        {
            id: 0,
            title: 'Go to the biology exam',
            location: 'University of Bradford, C4.01',
            description: 'Lorem ipsum, dolor sit amet cons ectetur adipisicing elit',
            start_time: '10:00',
            end_time: '12:30',
            category: 'Education'
        }
    ])
    const [selected_category, set_selected_category] = useState('None')

    // day names for the specifying the day
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    const categories = [
        'Work',
        'Fun',
        'Chores',
        'Health',
        'Education'
    ]

    // function to change selected_date to the date selected
    const handle_day_select = (day) => {
        console.log(day)

        set_selected_date(day)   
    }

    const handle_increment_month = () => {
        set_selected_date(prevDate => {

            // get the current date
            const date = new Date(prevDate);

            // increments the month
            date.setMonth(date.getMonth() + 1);

            // changes it to the new date
            return date.toISOString().substring(0, 10);
        });
    };

    const handle_decrement_month = () => {
        set_selected_date(prevDate => {
            // get the current date
            const date = new Date(prevDate);

            // increments the month
            date.setMonth(date.getMonth() - 1);

            console.log(date)

            // changes it to the new date
            return date.toISOString().substring(0, 10);
        });
    };

    // converts the date into this format 'Jul 27 2026'
    const formatDate = () => {
        const date = new Date(selected_date);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
    };

    // gets the current day name from the selected_date 
    const handleDayNames = () => {

        const currentDayName = new Date(selected_date).getDay()

        if (selected_date === new Date().toISOString().substring(0,10)) {
            return 'Today'
        }
        else {
            return dayNames[currentDayName]
        }

    }

    // used for filtering task based on their category
    const handleCategorySelect = (cat) => {

        if (selected_category === cat) {
            set_selected_category('None')
        }
        else {
            set_selected_category(cat)
        }

    }

    // used to make text shorter

    return (
        <SafeAreaView
            className='flex relative h-screen w-full font-regular'
        >

            <View
                className='relative bg-darker_background flex flex-col pt-5 gap-0'
            >

                {/* blue mini background */}
                <View className='bg-primary w-full h-48 absolute top-0 left-0'></View>

                

                <View
                    className='w-full h-fit flex flex-row items-center justify-between px-8 pr-16'
                >
                    {/* header/greeting */}
                    <Text
                        className='w-full h-fit text-background font-semibold text-2xl'
                    >
                        Hello Naeem
                    </Text>

                    {/* create new task btn */}
                    <TouchableOpacity
                        className='p-1 '
                    >
                        <Plus
                            color={'#ffffff'}
                        />
                    </TouchableOpacity>

                </View>

                {/* main content */}
                <View
                    className='w-full h-full flex flex-col gap-5 px-8 py-10'
                >

                    {/* main calendar component */}
                    <Calendar
                        current={selected_date}
                        key={selected_date} // forces the calendar to change when the index changes
                        onDayPress={day => handle_day_select(day?.dateString)}
                        hideArrows={true}
                        markedDates={{
                            [selected_date]: {
                                selected: true,
                            }
                        }}
                        customHeader={(props) => (
                            <CustomCalendarHeader
                                date={props.month}
                                onPressArrowLeft={() => handle_decrement_month()}
                                onPressArrowRight={() => handle_increment_month()}
                            />
                        )}
                        theme={{
                            backgroundColor: '#eff6ff',
                            calendarBackground: '#eff6ff',
                            textDayFontFamily: 'Poppins',
                            selectedDayBackgroundColor: '#3b82f6',
                            selectedDayTextColor: '#eff6ff',
                            todayTextColor: '#3b82f6'
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
                            paddingBottom: 4,
                        }}
                    />

                    <View
                        className='flex flex-col gap-3 w-full h-fit'
                    >
                        {/* date, dayname */}
                        <View
                            className='flex flex-col gap-0 w-full h-fit'
                        >

                            <View
                                className='flex flex-row-reverse items-center justify-between'
                            >
                                {/* date in mm/dd/yyyy */}
                                <Text
                                    className=' text-text/50'
                                >
                                    {formatDate()}
                                </Text>

                                {/* day */}
                                <Text
                                    className='text-xl text-text font-medium'
                                >
                                    {handleDayNames()}
                                </Text>
                            </View>

                            <View className='w-full h-px rounded-full bg-text/20 mt-2'></View>

                        </View>

                        {/* category options and task items */}
                        <View
                            className='flex flex-col gap-2 w-full h-fit'
                        >

                            {/* category filter menu */}
                            <FlatList
                                horizontal
                                data={categories}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => (
                                    <CategoryBtn
                                        name={item}  
                                        onPress={() => handleCategorySelect(item)}
                                        isActive={selected_category === item}
                                    />
                                )}
                                contentContainerClassName='flex gap-2 w-9/10 h-fit p-0.5'
                            />    

                        </View>
                    </View>

                    <SwipeListView
                        data={tasks}
                        className='p-1 py-2'
                        renderItem={(rowData) => (
                            <TaskItem
                                data={rowData.item}
                            />
                        )}
                    />
                </View>


            </View>

        </SafeAreaView>
    )
}

export default index