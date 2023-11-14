/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import {
    IconButton,
} from "@mui/material";
import {  useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllFavorites,
  fetchRemoveFavorites,
} from "../../redux/Slices/favoritesSlice";
import Cover from '../Cover/Cover';
import style from './Favorites.module.css';
import ButtonBack from '../Utils/ButtonBack/ButtonBack';

const Favorites = () => {
  const users = useSelector((state) => state.usersLogin.user);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.favorites.favoriteProfessionals
  );
  const ads = useSelector((state) => state.ads.ads);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetAllFavorites(users._id));
  }, []);

  const handleRemoveFavorite = (e) => {
    const formFav = {
      clientId: e.currentTarget.value,
      professionalId: e.currentTarget.id,
    };

      dispatch(fetchRemoveFavorites(formFav))

  };

  const handleAdsDetails = (id) => {
    ads.forEach((ad) => {
      if (ad.creator[0]._id === id) {
        navigate(`/detail/${ad._id}`);
      }
    });
  };

  return (
    <div >
      
      <Navbar />
      <Cover />
      <ButtonBack />
      <h4 className={style.perfil}>
          Perfiles Guardados
        </h4>
      <div >
        
        {favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <div key={fav.professional._id}>
              {fav.professional && (
                
                    <div >
                      
                          
                      <IconButton
                              onClick={handleRemoveFavorite}
                              id={fav.professional._id}
                              value={fav.client}
                              style={{ marginLeft: '51em', position: 'relative', top:'1.3em'  }}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          
                        
                        <div className={style.backgroundContainer}>
                          
                          <img className={style.profilePic}
                            src={fav.professional.image}
                            alt={`Imagen de ${fav.professional.name}`}
                          />
                       
                        
                          <h4 className={style.h4}>
                            {fav.professional.name} {fav.professional.lastName}
                          </h4>
                          <p className={style.description}>
                            {fav.professional.description}
                          </p>
                      
                        
                          <button
                            className={style.buttonContratar}
                            onClick={() =>
                              handleAdsDetails(fav.professional._id)
                            }
                          >
                            Ver Detalle
                          </button>
                        
                          </div>
                    </div>
                 
              )}
            </div>
            
          ))
        ) : (
          <p>No tienes perfiles guardados.</p>
        )}
        
      </div>
    </div>
  );
};

export default Favorites;
