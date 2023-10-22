import { useDispatch, useSelector } from "react-redux";
import { fetchAds, selectAds } from "../../redux/Slices/adsSlice";
import  Professional  from "../Card/Professional"
import { useEffect } from "react";
import style from "./Ads.module.css"

function Ads() {
  const dispatch = useDispatch();
  const ads = useSelector(selectAds);
  console.log(ads);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  console.log(ads);
   return (
    <div className={style.card}>
      {ads.map((ad) => (
        <Professional
          key={ad._id}
          name={ad.creator[0].name}
          lastName={ad.creator[0].lastName}
          location={ad.creator[0].location} // Ajustar la ubicación
          description={ad.description}
          price={ad.price}
          profession={ad.profession} // Ajustar la profesión
          image={ad.creator[0].image}
        />
      ))}
    </div>
  );
}
export default Ads;