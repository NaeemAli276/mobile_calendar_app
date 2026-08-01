import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MapPin, Circle } from 'lucide-react-native'

const TaskItem = ({ data }) => {

    const [hide_description, set_hide_description] = useState(false)

    // cleaner way to choose the colour for the category section
    const categoryColours = {
        Work: '#3b82f6',
        Fun: '#eab308',
        Chores: '#f97316',
        Health: '#10b981',
        Education: '#8b5cf6'
    }

    return (
        <Pressable
            onPress={() => set_hide_description(!hide_description)}
        >
            <View
                className='flex flex-row w-full h-fit bg-background rounded-md shadow-text/50 shadow'
            >
                
                {/* time it starts or due */}
                <View
                    className='w-fit h-fit p-4 py-6 flex items-center justify-center flex-col border-r border-text/40'
                >
                    <Text
                        className='text-2xl font-medium text-text'
                    >
                        {data.start_time}
                    </Text>
                    <Text
                        className='text-text/50'
                    >
                        AM
                    </Text>
                </View>

                {/* title, location, description, category, end_time */}
                <View
                    className='flex flex-col gap-2 w-full h-full p-2 px-3 justify-between'
                >
                    
                    {/* title, description, location */}
                    <View
                        className='flex flex-col w-full h-fit'
                    >
                        <Text
                            className='text-lg/tight font-semibold text-text flex-1 w-[75%] '
                        >
                            {data.title}
                        </Text>
                        <Text
                            className={`${hide_description === false && 'hidden'} w-[75%] h-fit text-text/50 text-sm flex-1`}
                        >
                            {data.description}
                        </Text>

                        <View
                            className='flex flex-row items-center pt-1 gap-1 w-full h-fit'
                        >
                            <MapPin
                                strokeWidth={1}
                                size={14}
                                color={'#3b82f6'}
                            />
                            <Text
                                className='text-primary/50 text-sm w-[75%] flex-1'
                            >
                                {data.location}
                            </Text>
                        </View>

                    </View>

                    {/* category, start_time and end_time */}
                    <View
                        className='flex flex-row items-center gap-2 w-fit h-fit'
                    >
                        <Circle
                            size={10}
                            color={categoryColours[data.category]}
                        />
                        <Text
                            className={`text-sm text-[${categoryColours[data.category]}]`}
                        >
                            {data.category}
                        </Text>
                    </View>

                </View>

            </View>
        </Pressable>
        
    )
}

export default TaskItem