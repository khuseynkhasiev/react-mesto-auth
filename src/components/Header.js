export default function Header(){
    return (
        <header className="header">
            <div className="header__logo"></div>
            <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__el">
                        <button className="header__btn">email@mail.com</button>
                    </li>
                    <li className="header__el">
                        <button className="header__btn">Выйти</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}