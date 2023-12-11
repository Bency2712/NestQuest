import PropTypes from 'prop-types';
import { useState } from 'react';
import Image from './Image';
export default function PlaceGallery({place}){

    const [showAllPhotos,setShowAllPhotos] = useState(false);
    if(showAllPhotos){
        return(
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text=3-xl mr-48"> Photos of {place.title} </h2>
    
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-6 h-6" >
                                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div key={photo}>
                       <Image src={photo} alt="a" />
    
                        </div>
                ))}
                </div>
            </div>
        );
      }
    return (
        <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
                {place.photos?.[0] && (
                    <div>
                        <Image onClick= {() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={place.photos?.[0]} alt="a" />
                    </div>
                )}
            </div>

            <div className=" grid">
                {place.photos?.[1] && (
                    <Image onClick= {() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={place.photos?.[1]} alt="a" />
                )}

                <div className="overflow-hidden">
                {place.photos?.[2] && (
                    <Image onClick= {() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={place.photos?.[2]} alt="a" />
                )}
                </div>
                
            </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path d="M0 4c0-1.1.9-2 2-2h16a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm11 9l-3-3-6 6h16l-5-5-2 2zm4-4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            Show more Photos
        </button>
    </div>
    )
    ;
}

PlaceGallery.propTypes = {
    place: PropTypes.shape({
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
     
    }).isRequired,
  };