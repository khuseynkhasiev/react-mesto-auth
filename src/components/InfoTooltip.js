export default function InfoTooltip() {
    return (
        <div className="info-tooltip">
            <div className="info-tooltip__container">
                <button className="popup__close" type="button" aria-label="кнопка закрытия" ></button>
                <div className="info-tooltip__img"></div>
                <p className="info-tooltip__text">Вы успешно зарегистрировались!</p>
            </div>
        </div>
    )
}