import PropTypes from 'prop-types';
import { useState } from "react";
import axios from "axios";
import Image from './Image';
export default function PhotosUploader({addedPhotos, onChange})
{

    const [photoLink,setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link' , { link:photoLink })
        
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
        }

        function uploadPhoto(ev)
        { 
            const files = ev.target.files;
            const data = new FormData();

            for(let i=0; i<files.length; i++)
            {data.append('photos', files[i])
        }
            axios.post('/upload', data, {
            headers:{'Content-type':'multipart/form-data'}
            }).then(response => {
                const {data: filenames} = response;
                onChange(prev => {
                    return [...prev, ...filenames];
                });
            })
        }
function removePhoto(ev, filename){
    ev.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !==filename)]);
}

function selectAsMainPhoto(ev, filename){
         ev.preventDefault();
        onChange([filename, ...addedPhotos.filter(photo => photo !==filename)]);
}
   return(
    <>
    
    <div className="flex gap-2">
                            <input type="text" 
                            value={photoLink} 
                            onChange={ev => setPhotoLink(ev.target.value)}  placeholder={"Add using a link"}/>
                            <button onClick={addPhotoByLink} className=" bg-gray-200 px-4 rounded-2xl">Add&nbsp; photo</button>
                        </div>
                        
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                        <div className='h-32 flex relative' key={index}>
                        <Image className="rounded-2xl w-full object-cover" src={link} alt="photo"/>
                        <button onClick={ev => removePhoto(ev,link)} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-2">
                        <svg fill="currentColor" viewBox="0 0 16 16" className='w-6 h-6'>
                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                       </button>

                       <button onClick={ev => selectAsMainPhoto(ev,link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                        {link === addedPhotos[0] && (
                        <svg viewBox="0 0 1024 1024" fill="currentColor" className='w-6 h-6'>
                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                      </svg>
                       )}
                       {link !== addedPhotos[0] && (
                       <svg viewBox="0 0 1024 1024" fill="currentColor" className='w-6 h-6'>
                            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
                        </svg>
                        )}
                       </button>
                       
                        </div>
                        ))}

                           
                            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center  border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                                Upload from your device
                            </label>
                        </div>

    </>
   );
}
PhotosUploader.propTypes = {
    addedPhotos: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};