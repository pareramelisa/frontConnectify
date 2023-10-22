import { useDispatch, useSelector } from "react-redux";
import { fetchAds, selectAds } from "../../redux/Slices/adsSlice";
import  Professional  from "../Card/Professional"
import { useEffect } from "react";


function Ads() {
  const dispatch = useDispatch();
  const ads = useSelector(selectAds);
  console.log(ads);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  console.log(ads);
   return (
    <div>
      {ads.map((ad) => (
        <Professional
          key={ad._id}
          name={ad.name}
          lastName={ad.lastName}
          location={ad.creator[0].address.location} // Ajustar la ubicación
          description={ad.description}
          price={ad.price}
          profession={ad.profession.join(", ")} // Ajustar la profesión
          image={ad.image}
        />
      ))}
    </div>
  );
}
export default Ads;