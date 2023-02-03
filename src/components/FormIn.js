
export default function FormIn(props){
    const {
        buttonName,
        title,
        name,
        children
    } = props;
    return (
        <div className="form">
            <form action="" className="form__submit" name={name}>
                <h3 className="form__title">{title}</h3>
                <input type="email" className="form__input" name="email" placeholder="Email"/>
                <input type="password" className="form__input" name="password" placeholder="Пароль"/>
                <button type={"submit"} className="form__submit-btn">{buttonName}</button>
                {children}
            </form>
        </div>
    )
}