import FormIn from "./FormIn";
import {useState} from "react";
export default function Login({handleLogin}){
    const [userDate, setUserDate] = useState({
        email: '',
        password: '',
    })
    function handleUserDate(e) {
        const {name, value} = e.target;
        setUserDate({...userDate, [name]:value});
    }
    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(userDate);
    }
    return (
        <FormIn
            title="Вход"
            buttonName="Войти"
            name="login"
            handleUserDate={handleUserDate}
            handleSubmit={handleSubmit}
        />
    )
}