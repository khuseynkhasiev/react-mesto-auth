import FormIn from "./FormIn";

export default function Register(){
    return (
        <>
            <FormIn title="Регистрация" buttonName="Зарегистрироваться" name="register">
                <p className="form__subtext">Уже зарегистрированы? <a href='#' className="form__link">Войти</a></p>
            </FormIn>
        </>
    )
}