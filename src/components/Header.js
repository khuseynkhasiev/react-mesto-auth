import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Header(props){
/*
    const navigate = useNavigate();
*/
    const {
        email,
        handleUserExit,
        loggedIn,
        singIn,
        handleButtonSignIn,
        handleButtonSignUp,
    } = props;
/*    const [singIn, setSignIn] = useState(true);
    function handleButtonExit() {
        handleUserExit();
        setSignIn(true);
    }
    function handleButtonSignIn() {
        navigate("/sign-in");
        setSignIn(false);
    }
    function handleButtonSignUp() {
        navigate("/sign-up");
        setSignIn(true);
    }*/


    return (
        <header className="header">
            <div className="header__logo"></div>
            <nav className="header__nav">
                <ul className="header__list">
                    { email ?
                        <li className="header__el">
                            <button className="header__btn">{email}</button>
                        </li> : null
                    }
                    { loggedIn ?
                        <li className="header__el">
                            <button className="header__btn" onClick={handleUserExit}>Выйти</button>
                        </li> :
                        singIn ?
                        <li className="header__el">
                            <button className="header__btn" onClick={handleButtonSignIn}>Войти</button>
                        </li> :
                        <li className="header__el">
                            <button className="header__btn" onClick={handleButtonSignUp}>Регистрация</button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}