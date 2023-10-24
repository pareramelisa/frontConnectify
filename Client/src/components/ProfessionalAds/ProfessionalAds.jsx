/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ProfessionalAds({
  name,
  lastName,
  location,
  description,
  price,
  profession,
  image,
  //rating,
  categories,
}) {
  return (
    <div>
      <Link to="/detail/:profesional_id" />
      <div>image={image}</div>
      <h2>{name}</h2>
      <h2>{lastName}</h2>
      <h2> {location}</h2>
      <h2> Categories: {categories}</h2>
      <h2>{description}</h2>
      <h2>{profession}</h2>
      <h2>{price}</h2>
    </div>
  );
}
export default ProfessionalAds;
