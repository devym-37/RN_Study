import AsyncStorage from "@react-native-community/async-storage";

const key = "todos";

const todosStorage = {
    async get() {
        try {
            const rawTodos = await AsyncStorage.getItem(key);

            if (!rawTodos) {
                throw new Error("No saved todos");
            }

            const savedTodos = JSON.parse(rawTodos);
            return savedTodos;
        } catch (err) {
            throw new Error("Failed to load todos");
        }
    },
    async set(data) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (err) {
            throw new Error("Failed to save todos");
        }
    },
};

export default todosStorage;
