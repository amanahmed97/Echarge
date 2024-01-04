import axios from 'axios';
export const Signup = (data: any) => {
    axios.post('/signup', data).then(function(response) {
        console.log(response);
    });
};

async function hitLogin(data: unknown) {
    const response = await axios.post('/login', data);
    return response;
}

export const login = (data: any) => {
    return hitLogin(data);
};

export  const hitStations = async () => {
    await axios.get('/all-stations').then(res => {    
            console.log(res.data);
    });
}

