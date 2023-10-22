import { useDispatch, useSelector } from "react-redux";
import { fetchAds, selectAds } from "../../redux/Slices/adsSlice";

import { useEffect } from "react";
import Professional from "../Card/Professional";


function Ads() {
  const dispatch = useDispatch();
  const ads = useSelector(selectAds);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);
  console.log(ads);
  return (
    <div>
      {ads.map((ad) => (
        <Professional
          key={ad._id}
          name={ad.creator.name}
          lastName={ad.creator.lastName}
          location={ad.location}
          description={ad.description}
          price={ad.price}
          profession={ad.profession}
          image={ad.image}
        />
      ))}
    </div>
  );
}

export default Ads;
