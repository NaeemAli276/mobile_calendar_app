import { View, Text, TouchableOpacity, TextInput, Pressable, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ChevronDown } from 'lucide-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

const modifyTask = () => {

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

    // Function to show the date picker using imperative API
  const show_date_picker = () => {
    DateTimePickerAndroid.open({
      value: task.date ? new Date(task.date) : new Date(),
      mode: 'date',
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          // Format the date for your task
          const formattedDate = selectedDate.toISOString().substring(0, 10);
          set_task({...task, date: formattedDate});
        }
      },
    });
  };

  // Function to show the time picker using imperative API
  const show_time_picker = () => {
    DateTimePickerAndroid.open({
      value: task.time === 'Not set' ? new Date() : new Date(`2000-01-01T${task.time}`),
      mode: 'time',
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          const hours = String(selectedDate.getHours()).padStart(2, '0');
          const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
          set_task({...task, time: `${hours}:${minutes}`});
        }
      },
    });
  };

  const get_am_pm_time = (timeString) => { 
    
    if (timeString === 'Not set' || timeString === undefined) {
      return 'Not set'
    }
    else {
      const [hours, minutes] = timeString.split(':').map(Number);
      const ampm = hours >= 0 && hours < 12 ? 'AM' : 'PM';
    
      // Convert to 12-hour format
      let hour12 = hours % 12;
      hour12 = hour12 === 0 ? 12 : hour12; // 0 becomes 12
      
      // Add leading zero if hour is less than 10
      const formattedHour = String(hour12).padStart(2, '0');
      
      return `${formattedHour}:${String(minutes).padStart(2, '0')} ${ampm}`;
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
        location: '',
      })
    }
    else {
      set_task(params)
    }

  }, [])

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
                  className={'bg-background text-text border-text/20 border rounded-md placeholder:text-text/50 pl-4 font-regular pb-2 pt-7 h-32 text-start '}
                  multiline={true}
                  placeholder='Enter a description (optional)...'
                  textAlignVertical='top'
                  maxLength={128}
                />
              </View>

              {/* location field */}
              <KeyboardAvoidingView
                className={`w-full h-auto relative`}
              >
                <Text
                  className={`absolute top-2 left-4 z-10 text-text/50 text-sm font-regular`}
                >
                  Location
                </Text>
                <TextInput
                  numberOfLines={1}
                  value={task.location}
                  onChangeText={(text) => handle_change_task('location', text)}
                  className={'bg-background text-text border-text/20 border rounded-md placeholder:text-text/50 pl-4 font-regular pb-2 pt-7'}
                  placeholder='Enter a location (optional)...'
                />
              </KeyboardAvoidingView>

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
                        className={`p-2.5 px-4 ${task.category === item ? 'bg-primary' : 'bg-background'}`}
                        onPress={() => handle_change_task('category', item)}
                      >
                        <Text
                          className={`${task.category === item ? 'text-background' : ' text-text'}`}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    )}  
                    className={`bg-background shadow-text shadow-md w-44 rounded-md ${hide_categories ? 'hidden' : 'flex'}`}
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
                        {get_am_pm_time(task.time)}
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


              {/* create btn */}
              <View
                className={`flex w-full`}
              >
                <TouchableOpacity
                  className={`bg-primary p-2 flex items-center justify-center rounded-md py-3`}
                  onPress={() => { console.log(task) }}
                >
                  <Text
                    className={'text-background font-semibold text-xl'}
                  >
                    Create
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>

        </View>

      </View>

    </SafeAreaView>
  )
}

export default modifyTask