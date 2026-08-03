import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Calendar } from 'react-native-calendars'
import CustomCalendarHeader from '../components/CustomCalendarHeader'
import { Plus, Trash2, Pencil } from 'lucide-react-native'
import CategoryBtn from '../components/CategoryBtn'
import { SwipeListView } from 'react-native-swipe-list-view'
import TaskItem from '../components/TaskItem'
import { useRouter } from 'expo-router'

const index = () => {

    // used to navigate between pages
    const router = useRouter()

    // loads all the tasks from storage
    const tasks = ([
        {
            id: 0,
            title: 'Biology exam',
            location: 'UoB, C4.01',
            description: 'Lorem ipsum, dolor sit amet cons ectetur adipisicing elit',
            time: '10:00 AM',
            category: 'Education',
            date: '2026-09-22'
        },
        {
            id: 1,
            title: 'Clean the house',
            location: 'Home',
            description: 'Lorem ipsum, dolor sit amet cons ectetur adipisicing elit',
            time: '10:00 AM',
            category: 'Chores',
            date: '2026-09-22'
        },
        {
            id: 2,
            title: 'Finish the fyp project',
            location: 'Richmond',
            description: 'Lorem ipsum, dolor sit amet cons ectetur adipisicing elit',
            time: '01:00 PM',
            category: 'Education',
            date: '2026-09-22'
        },
        {
            id: 3,
            title: 'Finish the calendar component design',
            location: 'Richmond',
            description: 'Lorem ipsum, dolor sit amet cons ectetur adipisicing elit Lorem ipsum, dolor sit',
            time: '01:00 PM',
            category: 'Work',
            date: '2026-09-22'
        }
    ])

    const [filtered_tasks, set_filtered_tasks] = useState([])

    // const [selected_date, set_selected_date] = useState(new Date().toISOString().substring(0,10)) 
    const [selected_date, set_selected_date] = useState('2026-09-22')    


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
    const format_date = () => {
        const date = new Date(selected_date);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
    };

    // gets the current day name from the selected_date 
    const handle_day_names = () => {

        const currentDayName = new Date(selected_date).getDay()

        if (selected_date === new Date().toISOString().substring(0,10)) {
            return 'Today'
        }
        else {
            return dayNames[currentDayName]
        }

    }

    // used for filtering task based on their category
    const handle_category_select = (cat) => {

        if (selected_category === cat) {
            set_selected_category('None')
        }
        else {
            set_selected_category(cat)
        }

    }

    // used to make text shorter
    const truncateText = () => {

    }

    // filters tasks based on their category
    const handle_filter_tasks = () => {

        if (selected_category === 'None') {            
            const filtered_tasks = tasks.filter((task) => {
                return task.date === selected_date
            })

            set_filtered_tasks(filtered_tasks)
        }
        else {
            const filtered_tasks = tasks.filter((task) => {
                return (task.date === selected_date) && (task.category === selected_category)
            }) 

            set_filtered_tasks(filtered_tasks)

        }

    }

    useEffect(() => {
        handle_filter_tasks(selected_date,selected_category)
    }, [])

    // useEffect(() => {
    //     console.log('selected_category: ', selected_category)
    //     console.log('selected_date: ', selected_date)
    //     console.log('filtered_tasks: ', filtered_tasks)
    //     handle_filter_tasks(selected_date,selected_category)
    // }, [selected_category, selected_date])

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
                        onPress={() => router.push({
                            pathname: '/modifyTask',
                        })} // navigates to the modifyTask page with an empty object to create a new task
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
                                    {format_date()}
                                </Text>

                                {/* day */}
                                <Text
                                    className='text-xl text-text font-medium'
                                >
                                    {handle_day_names()}
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
                                        onPress={() => handle_category_select(item)}
                                        isActive={selected_category === item}
                                    />
                                )}
                                contentContainerClassName='flex gap-2 w-9/10 h-fit p-0.5'
                            />    

                        </View>
                    </View>

                    <View
                        className='w-full h-full flex-1 pb-10'
                    >
                        <SwipeListView
                            data={filtered_tasks}
                            contentContainerClassName='flex flex-col gap-2 p-1 w-full'
                            renderItem={(rowData) => (
                                <TaskItem
                                    data={rowData.item}
                                />
                            )}
                            renderHiddenItem={(rowData, rowMap) => (
                                <View
                                    className='flex-1 gap-3 w-full h-full flex flex-row items-center justify-end pr-1'
                                >
                                    <TouchableOpacity
                                        className=' px-4 h-[5.8rem] rounded-md flex items-center justify-center bg-background shadow shadow-text/40'
                                    >
                                        <Trash2
                                            color={'#f43f5e'}
                                            strokeWidth={1}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className=' px-4 h-[5.8rem] rounded-md flex items-center justify-center bg-background shadow shadow-text/40'
                                        onPress={() => router.push({
                                            pathname: '/modifyTask',
                                            params: rowData.item
                                        })} // navigates to the modifyTask page with object to modify the task
                                    >
                                        <Pencil
                                            color={'#3b82f6'}
                                            strokeWidth={1}
                                        />
                                    </TouchableOpacity>
                                </View>   
                            )}
                            leftOpenValue={20}
                            rightOpenValue={-125}
                            keyExtractor={(item) => item.id}
                            disableRightSwipe={true}
                        />
                    </View>
                </View>


            </View>

        </SafeAreaView>
    )
}

export default index