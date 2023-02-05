import Header from "./Header";
import Main from './Main';
import '../pages/index.css';
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import {useEffect, useState} from "react";
import api from '../utils/api';
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../auth";

function App() {
    const [isEditProfilePopupOpened, setEditProfilePopupOpened] = useState(false);
    const [isAddPlacePopupOpened, setAddPlacePopupOpened] = useState(false);
    const [isEditAvatarProfilePopupOpened, setEditAvatarProfilePopupOpened] = useState(false);
    const [isDeleteCardPopupOpened, setDeleteCardPopupOpened] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectorCard] = useState({isOpen: false});
    const [currentUser, setCurrentUser] = useState({});
    const [nameEditButton, setNameEditButton] = useState('Сохранить');
    const [nameAddButton, setNameAddButton] = useState('Создать');
    const [loggedIn, setLoggedIn] = useState(false);
/*    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [deletingCard, setDeletingCard] = useState(null);*/

    useEffect(() => {
        api.getAllPromise().then(data => {
            const [
                getProfileInfo,
                getInitialCards
            ] = data;
            setCurrentUser(getProfileInfo);
            setCards(getInitialCards);
        }).catch((data) => console.log(data.error))
    }, []);
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((data) => console.log(data.error));
    }
    function handleCardDelete(card){
        api.deleteCard(card._id)
            .then(setCards(state => state.filter(item => item._id === card._id ? null : card))
            ).catch((data) => console.log(data.error));
    }
    function closeAllPopups(){
        setEditProfilePopupOpened(false);
        setAddPlacePopupOpened(false);
        setEditAvatarProfilePopupOpened(false);
        setDeleteCardPopupOpened(false);
        setSelectorCard({isOpen: false});
    }
    const handleEditAvatarClick = () => {
        setEditAvatarProfilePopupOpened(true);
    }
    const handleEditProfileClick = () => {
        setEditProfilePopupOpened(true);
    }
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpened(true);
    }
    const handleCardClick = ({name, link}) => {
        setSelectorCard({isOpen: true, name: name, link: link});
    }
    function handleUpdateUser({name, about}) {
        setNameEditButton('Сохранение...');
        api.patchProfileInfo({name, about})
            .then((data)=> {
            setCurrentUser(data);
            closeAllPopups();
        }).catch((data) => console.log(data.error))
            .finally(() => setNameEditButton('Сохранить'))
    }
    function handleUpdateAvatar({avatar}){
        setNameEditButton('Сохранение...');
        api.patchAvatarProfile(avatar)
            .then((data)=> {
            setCurrentUser(data);
            closeAllPopups();
        }).catch((data) => console.log(data.error))
            .finally(() => setNameEditButton('Сохранить'))
    }
    function handleAddPlaceSubmit({name, link}){
        setNameAddButton('Сохранение...')
        api.postNewCard({name, link})
            .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }).catch((data) => console.log(data.error))
            .finally(() => setNameAddButton('Создать'))
    }
    function handleLogin({email, password}) {
        console.log(`email: ${email}, password: ${password}`)
    }
    function handleRegister({email,password}){
        console.log(`email: ${email}, password: ${password}`)
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page" onKeyDown={(evt) => {
            if(evt.key === "Escape") closeAllPopups();
          }}>
            <Header />
              <Routes>
                  <Route path="/" element={
                      <ProtectedRoute loggedIn={loggedIn} component={
                          <Main handleEditAvatarClick={handleEditAvatarClick}
                                handleEditProfileClick={handleEditProfileClick}
                                handleAddPlaceClick={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                          />}
                      />}
                  />
                  <Route path="/signup" element={ <Register handleRegister={handleRegister}/> } />
                  <Route path="/signin" element={ <Login handleLogin={handleLogin}/> } />
                  <Route path="*" element={ loggedIn ?
                      <Navigate to="/"/> :
                      <Navigate to="/signup"/>}
                  />
              </Routes>
            <Footer />
              {/*<InfoTooltip />*/}
              <EditProfilePopup
                  isOpen={isEditProfilePopupOpened}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isNameButton={nameEditButton}
              />
              <EditAvatarPopup
                  isOpen={isEditAvatarProfilePopupOpened}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  isNameButton={nameEditButton}
              />
              <AddPlacePopup
                  isOpen={isAddPlacePopupOpened}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  isNameButton={nameAddButton}
              />
              <DeleteCardPopup
                  isOpen={isDeleteCardPopupOpened}
                  onClose={closeAllPopups}
              />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </div>
      </CurrentUserContext.Provider>
  )
}
export default App;
