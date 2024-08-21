import axios from 'axios';

// const baseURL = 'http://localhost:5000';

// const baseURL = 'https://mernstackfoodgo.onrender.com';

const baseURL = axios.create({
    url: 'https://mernstackfoodgo.onrender.com',
    // url : 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default baseURL