import { View, Text, TouchableOpacity, TextInput, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ChevronDown } from 'lucide-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

const createTask = () => {

  const categories = [
    'Work',
    'Fun',
    'Chores',
    'Health',
    'Education'
  ]

  const router = useRouter()
  const params = useLocalSearchParams()

  const [task, set_task] = useState({})

  const [hide_categories, set_hide_categories] = useState(true) // hides or show the categories dropdown
  const [hide_picker, set_hide_picker] = useState(true) // hides or show the categories dropdown
  const [picker_mode, set_picker_mode] = useState('date')

  // just converts the date string into a more readable format
  const format_date = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  };
  
  const handle_change_task = (type, val) => {

    set_task({ ...task, [type]: val })

    // doesnt happen with every input, but it just here for the categories input
    set_hide_categories(true)

  }

  // Function to show the date picker
  const show_date_picker = () => {
    set_picker_mode('date');
    set_hide_picker(false);
  };

  // Function to show the time picker
  const show_time_picker = () => {
    set_picker_mode('time');
    set_hide_picker(false);
  };

  // Handler for when the user selects a value or dismisses the picker
  const handle_picker_change = (event, selectedDate) => {
    // On Android, the picker is dismissed automatically after selection.
    // On iOS, you need to hide it manually.
    set_hide_picker(true);

    // If the user selected a date (not just dismissed), update the state
    if (selectedDate) {
      set_task({...task, time: selectedDate});
    }
  };

  useEffect(() => {
    
    if (Object.keys(params).length === 0) { // checks if the object is empty
      set_task({
        id: new Date().toISOString(),
        title: '',
        description: '',
        category: 'None',
        date: new Date().toISOString().substring(0,10),
        time: 'Not set',
        location: ''
      })
    }
    else {
      set_task(params)
    }

  }, [])

  useEffect(() => {
    console.log(new Date(task.time))
  }, [task])

  return (
    <SafeAreaView
      className='flex relative h-screen w-full font-regular '
    >
      <View
        className='relative bg-darker_background flex flex-col pt-5 gap-0'
      >
        {/* blue mini background */}
        <View className='bg-primary w-full h-48 absolute top-0 left-0'></View>

        {/* main content */}
        <View
          className={'flex flex-col w-full h-full px-6 gap-[10%]'}
        >

          {/* back button */}
          <View
            className={'w-full h-fit flex'}
          >
            <TouchableOpacity
              className={'p-2 bg-background self-start rounded-md text-text shadow shadow-text/20'}
              onPress={() => router.back()}
            >
              <ArrowLeft
                color={'#172554'}
                strokeWidth={1.25}
              />
            </TouchableOpacity>
          </View>

          {/* main content */}
          <View
            className={`flex flex-col gap-8 w-full h-full `}
          >
            
            {/* title */}
            <Text
              className={'text-background text-3xl font-semibold'}
            >
              {
                Object.keys(params).length === 0
                ? 'Create new task'
                : 'Update task'
              }
            </Text>

            {/* fields */}
            <View
              className={'w-full h-full flex flex-col gap-4'}
            >

              {/* title field */}
              <View
                className={`w-full h-auto relative`}
              >
                <Text
                  className={`absolute top-2 left-4 z-10 text-text/50 text-sm font-regular`}
                >
                  Task title
                </Text>
                <TextInput
                  numberOfLines={1}
                  value={task.title}
                  onChangeText={(text) => handle_change_task('title', text)}
                  className={'bg-background text-text border-text/20 border rounded-md placeholder:text-text/50 pl-4 font-regular pb-2 pt-7'}
                  placeholder='Enter a title...'
                />
              </View>

              {/* description field */}
              <View
                className={`w-full h-auto relative`}
              >
                <Text
                  className={`absolute top-2 left-4 z-10 text-text/50 text-sm font-regular`}
                >
                  Description
                </Text>
                <TextInput
                  numberOfLines={1}
                  value={task.description}
                  onChangeText={(text) => handle_change_task('description', text)}
                  className={'bg-background text-text border-text/20 border rounded-md placeholder:text-text/50 pl-4 font-regular pb-2 pt-7 h-40 text-start '}
                  multiline={true}
                  placeholder='Enter a description...'
                  textAlignVertical='top'
                  maxLength={128}
                />
              </View>

              {/* category field */}
              <View
                className={`w-full h-auto relative`}
              >

                {/* category btn */}
                <Pressable
                  className='bg-background border border-text/20 p-2 pl-4 rounded-md relative'
                  onPress={() => set_hide_categories(!hide_categories)}
                >
                  <Text
                    className={`text-text/50 text-sm font-regular`}
                  >
                    Category
                  </Text>
                  <Text
                    className={`font-regular text-text`}
                  >
                    {task.category}
                  </Text>
                  <View
                    className={`absolute top-4 right-3`}
                  >
                    <ChevronDown
                      strokeWidth={1}
                      color={'#172554'}
                    />
                  </View>
                  
                </Pressable>

                <View
                  className={`absolute z-10 top-20 right-0`}
                >
                  <FlatList
                    data={categories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <Pressable
                        className={`p-2 px-4 ${task.category === item ? 'bg-primary' : 'bg-background'}`}
                        onPress={() => handle_change_task('category', item)}
                      >
                        <Text
                          className={`font-medium ${task.category === item ? 'text-background' : ' text-text'}`}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    )}  
                    className={`bg-background shadow-text/50 shadow w-44 rounded-md ${hide_categories ? 'hidden' : 'flex'}`}
                  />
                </View>
              </View>

              {/* date and hour */}
              <View
                className={`w-full h-fit flex flex-row gap-4`}
              >
                
                {/* date */}
                <Pressable
                  className='bg-background border border-text/20 p-2 pl-4 rounded-md relative w-1/2'
                  onPress={() => show_date_picker()}
                >
                  <Text
                    className={`text-text/50 text-sm font-regular`}
                  >
                    Date
                  </Text>
                  <Text
                    className={`font-regular text-text`}
                  >
                    {format_date(task.date)}
                  </Text>
                  <View
                    className={`absolute top-4 right-3`}
                  >
                    <ChevronDown
                      strokeWidth={1}
                      color={'#172554'}
                    />
                  </View>
                  
                </Pressable>

                {/* time */}
                <View
                  className={`w-full h-auto pr-8`}
                >
                    <Pressable
                      className='bg-background border border-text/20 p-2 pl-4 rounded-md relative w-1/2 mr-10'
                      onPress={() => show_time_picker()}
                    >
                      <Text
                        className={`text-text/50 text-sm font-regular`}
                      >
                        Time
                      </Text>
                      <Text
                        className={`font-regular text-text`}
                      >
                        {task.time}
                      </Text>
                      <View
                        className={`absolute top-4 right-3`}
                      >
                        <ChevronDown
                          strokeWidth={1}
                          color={'#172554'}
                        />
                      </View>
                      
                    </Pressable>
                </View>
                
              </View>

            </View>

          </View>

        </View>

      </View>

      {
        hide_picker === false && picker_mode === 'time'
        &&    <DateTimePickerAndroid
                  value={task.time === 'Not set' ? new Date() : new Date(task.time)}
                  mode={picker_mode}
                  is24Hour={true}
                  onChange={handle_picker_change}
              />
      }

    </SafeAreaView>
  )
}

export default createTask