import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

function RenderStars (rating) {
  const stars = [];
  const fullStars = Math.trunc(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon key={`full-${i}`} icon={solidStar} color="gold" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon key="half" icon={faStarHalfAlt} color="gold" />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon key={`empty-${i}`} icon={regularStar} color="gold" />
    );
  }
  return stars;
};

export default RenderStars
