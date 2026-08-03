import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MapPin, Circle } from 'lucide-react-native'


const TaskItem = ({
    data
}) => {

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
            className='w-max h-fit rounded-md'
            onPress={() => set_hide_description(!hide_description)}
        >
            <View
                className='flex flex-row h-fit bg-background rounded-md shadow shadow-text/40'
            >

                {/* time */}
                <View
                    className='py-5 px-2 flex flex-col gap-1 border-r border-text/20 items-center justify-center'
                >

                    <Text
                        className='text-text font-medium text-lg w-14 text-center'
                    >
                        {data.time}
                    </Text>

                </View>

                {/* title, desc, location and category */}
                <View
                    className='h-fit w-full flex flex-col justify-between p-2 px-4 gap-4'
                >

                    {/* title and desc */}
                    <View
                        className='flex flex-col gap-0.5 w-max h-fit'
                    >
                        <Text
                            className='text-lg/tight font-semibold text-text w-[70%]'
                        >
                            {data.title}
                        </Text>
                        <Text
                            className={`${hide_description ? 'flex' : 'hidden'} text-text/50 w-[70%]`}
                        >
                            {data.description}
                        </Text>
                    </View>

                    {/* category and location */}
                    <View
                        className='flex flex-row items-center w-full justify-between'
                    >
                        <View 
                            className='w-max h-fit flex-row flex gap-1.5 items-center'
                        >  
                            <Circle
                                size={8}
                                color={categoryColours[data.category]}
                            />
                            <Text
                                className={`text-sm
                                    ${data.category === 'Education' && 'text-violet_primary'}
                                    ${data.category === 'Work' && 'text-primary'}
                                    ${data.category === 'Fun' && 'text-yellow_primary'}    
                                    ${data.category === 'Chores' && 'text-orange_primary'}    
                                `}
                            >
                                {data.category}
                            </Text>
                        </View>
                        <View
                            className='flex flex-row items-center mr-[4.5rem] gap-1'
                        >
                            <MapPin 
                                strokeWidth={1}
                                color={'#6b7280'}
                                size={14}
                            />
                            <Text
                                className='text-sm text-text/50'
                            >
                                {data.location}
                            </Text>
                        </View>
                    </View>

                </View>

            </View>
        </Pressable>
    )
}

export default TaskItem