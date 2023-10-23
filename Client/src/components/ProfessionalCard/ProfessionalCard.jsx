import { useDispatch, useSelector } from "react-redux";
import { fetchAds, selectAds } from "../../redux/Slices/adsSlice";
import { useEffect } from "react";
import Professional from "../Card/Professional";
import style from "./ProfessionalCard.module.css";

function Ads() {
  console.log(Ads);
  const dispatch = useDispatch();
  const ads = useSelector(selectAds);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <div className={style.card}>
      {ads.map((ad) => (
        <Professional
          key={ad._id}
          name={ad.creator[0].name}
          lastName={ad.creator[0].lastName}
          location={ad.creator[0].location}
          description={ad.description}
          price={ad.price}
          profession={ad.profession}
          image={ad.creator[0].image}
        />
      ))}
    </div>
  );
}
export default Ads;
