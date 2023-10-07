import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuthToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.log(error);
    }
};

export const getAuthToken = async () => {
    try {
        const value = await AsyncStorage.getItem('authToken');
        return value;
    } catch (error) {
        console.log(error);
    }
};

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.log(error);
    }
};