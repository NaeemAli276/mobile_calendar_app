import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { BrushCleaning, GraduationCap, HardHat, HeartPlus, RollerCoaster } from 'lucide-react-native'

const CategoryBtn = ({
    name = 'Work',
    icon = <HardHat
            size={20}
            strokeWidth={1}
        />,
    isActive,
    onPress
}) => {

    const getIconStyle = () => {

        if (name === 'Work' && isActive === false) {
            return {
                color: '#3b82f6',
                backgroundColor: '#bfdbfe',
            }
        }
        else if (name === 'Work' && isActive === true) {
            return {
                color: '#ffffff',
                backgroundColor: '#3b82f6'
            }
        }
        else if (name === 'Chores' && isActive === false) {
            return {
                color: '#f97316',
                backgroundColor: '#fed7aa'
            }
        }
        else if (name === 'Chores' && isActive === true) {
            return {
                color: '#ffffff',
                backgroundColor: '#f97316'
            }
        }
        else if (name === 'Fun' && isActive === false) {
            return {
                color: '#eab308',
                backgroundColor: '#fef08a'
            }
        }
        else if (name === 'Fun' && isActive === true) {
            return {
                color: '#ffffff',
                backgroundColor: '#eab308'
            }
        }
        else if (name === 'Health' && isActive === false) {
            return {
                color: '#10b981',
                backgroundColor: '#a7f3d0'
            }
        }
        else if (name === 'Health' && isActive === true) {
            return {
                color: '#ffffff',
                backgroundColor: '#10b981'
            }
        }
        else if (name === 'Education' && isActive === false) {
            return {
                color: '#8b5cf6',
                backgroundColor: '#ddd6fe'
            }
        }
        else if (name === 'Education' && isActive === true) {
            return {
                color: '#ffffff',
                backgroundColor: '#8b5cf6'
            }
        }

    }
    const categoryIcons = {
        Work: <HardHat
                style={getIconStyle()}
                size={20}
                strokeWidth={1}
            />,
        Fun: <RollerCoaster
                style={getIconStyle()}
                size={20}
                strokeWidth={1}
            />,
        Chores: <BrushCleaning
                    style={getIconStyle()}
                    size={20}
                    strokeWidth={1}
                />,
        Health: <HeartPlus
                    style={getIconStyle()}
                    size={20}
                    strokeWidth={1}
                />,
        Education: <GraduationCap
                        style={getIconStyle()}
                        size={20}
                        strokeWidth={1}
                    />
    }

    return (
        <TouchableOpacity
            className={`
                flex flex-row items-start gap-1 p-1 rounded w-fit px-3 h-8 shadow shadow-text/40
            `}
            style={getIconStyle()}
            onPress={onPress}
        >
            {categoryIcons[name]}
            <Text
                className={`
                    ${name === 'Work' && isActive === false ? 'text-primary' : 'text-background'}
                    ${name === 'Chores' && isActive === false ? 'text-orange_primary' : 'text-background'}
                    ${name === 'Work' && isActive === false ? 'text-primary' : 'text-background'}
                    ${name === 'Fun' && isActive === false ? 'text-yellow_primary' : 'text-background'}
                    ${name === 'Education' && isActive === false ? 'text-violet_primary' : 'text-background'}
                    ${name === 'Health' && isActive === false ? 'text-green_primary' : 'text-background'}    
                `}
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default CategoryBtn