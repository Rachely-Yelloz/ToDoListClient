import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: apiUrl,
});

// הוספת interceptor לתפיסת שגיאות
api.interceptors.response.use(
  response => {
    // אם התגובה היא תקינה, מחזירים אותה
    return response;
  },
  error => {
    // כאן תופסים את השגיאות
    console.error("שגיאה בבקשה:", error.response ? error.response.data : error.message);
    return Promise.reject(error); // מחזירים את השגיאה
  }
);
export default {
  getTasks: async () => {
    try {
      const result = await api.get('/items');    
      return result.data;
    } catch (error) {
      throw error; // טיפול בשגיאה יכול להתבצע כאן אם צריך
    }
  },

  addTask: async(name) => {
    console.log('addTask', name);
    try {
      const result = await api.post('/items', { name });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  setCompleted: async(id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await api.put(`/items/${id}`, { Name: null, IsComplete: isComplete });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async(id) => {
    console.log('deleteTask', id);
    try {
      await api.delete(`/items/${id}`);
    } catch (error) {
      throw error;
    }
  }
};