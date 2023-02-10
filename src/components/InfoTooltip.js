export default function InfoTooltip(props) {
    const {
        infoToolTipMessage,
        infoToolTip,
        onClose
    } = props
    return (
        <div className={`info-tooltip ${infoToolTip ? "popup_opened" : null} `}>
            <div className="info-tooltip__container">
                <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose}></button>
                {infoToolTipMessage ?
                    <>
                        <div className="info-tooltip__img"></div>
                        <p className="info-tooltip__text">Вы успешно зарегистрировались!</p>
                    </>
                    :
                    <>
                        <div className="info-tooltip__img-error"></div>
                        <p className="info-tooltip__text">Что-то пошло не так!
                            Попробуйте ещё раз.</p>
                    </>
                }
            </div>
        </div>
    )
}