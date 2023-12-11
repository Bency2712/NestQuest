import PropTypes from 'prop-types';
import Image from './Image';
export default function PlaceImg({place, index=0, className=null})
{

    if (!place.photos?.length){
        return'';
    }

  
    if (!className) {
        className = 'object-cover';
      }

      return (
        <Image className={className} src={place.photos[index]} alt=""/>
      );
      
}

PlaceImg.propTypes = {
    place: PropTypes.shape({
        photos: PropTypes.array.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
  };
