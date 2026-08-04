import AsyncStorage from "@react-native-async-storage/async-storage";

const storage_key = '@date_items'

export const loadItems = async () => {

    try {

        const storedTodos = await AsyncStorage.getItem(storage_key)
        if (storedTodos !== null) {
            return JSON.parse(storedTodos)
        }
        else {
            return []
        }

    }
    catch (error) {

        console.error(error)

    }

}

export const createItem = async (item) => {
    try {
        const items = await loadItems() || []
        const newItems = [item, ...items]
        await AsyncStorage.setItem(storage_key, JSON.stringify(newItems))
        return item // ✅ Return the task object
    } catch (error) {
        console.error('Error creating task:', error)
        return null // Return null on error
    }
}

export const deleteItem = async (id) => {

    const items = await loadItems()

    try {

        const updatedItems = items.filter(item => item.id !== id)

        console.log(updatedItems.map(item => item.id !== id))

        await AsyncStorage.setItem(storage_key, JSON.stringify(updatedItems))
        
        return true

    }
    catch (error) {
        console.error(error)
    }

}

export const updateItem = async (updatingItem) => {
    
    const items = await loadItems()

    try {

        const updatedItems = items.map((item) => 
            item.id === updatingItem.id ? updatingItem : item
        )

        await AsyncStorage.setItem(storage_key, JSON.stringify(updatedItems))

        return updatedItems

    }
    catch (error) {

        console.error(error)

    }

}