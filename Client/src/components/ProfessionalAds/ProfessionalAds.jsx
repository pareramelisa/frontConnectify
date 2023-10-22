import PropTypes from "prop-types";
import { Link } from "react-router-dom";

ProfessionalAds.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  location: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  profession: PropTypes.string,
  image: PropTypes.string,
  rating: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.string),
};
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
