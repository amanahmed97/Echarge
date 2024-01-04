import axios from "axios";
export const Signup = (data: any) => {
    axios.post('/signup',data).then( function (response) {
        console.log(response);
    }
    );
};

export const login = (data: any) => {
    let login_status = 400
    axios.post('/login', data).then(
        function (response) {
            console.log(response);
            login_status = response.status
        }
    );
    return login_status;
};
