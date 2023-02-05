import FormIn from "./FormIn";
import {useState} from "react";
import {Link, Navigate, NavLink} from "react-router-dom";

export default function Register({handleRegister}){

    const [userDate, setUserDate] = useState({
        email: '',
        password: '',
    })

    function handleUserDate(e){
        const {name, value} = e.target;
        setUserDate({...userDate, [name]: value})
    }
    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(userDate);
    }
    return (
        <FormIn
            title="Регистрация"
            buttonName="Зарегистрироваться"
            name="register"
            handleUserDate={handleUserDate}
            handleSubmit={handleSubmit}
        >
                <p className="form__subtext">
                    Уже зарегистрированы?<Link to='/signin' className="form__link"> Войти</Link>
                </p>
        </FormIn>
    )
}