import PropTypes from 'prop-types';
export default function Perks({selected,onChange}) {

    function handleCbClick(ev) {
        const {checked,name} = ev.target;
        if (checked) {
          onChange([...selected,name]);
        } else {
          onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
      }

    return(
        <>
                 <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked = {selected.includes('wifi')} name="wifi" onChange={handleCbClick}/>
                                <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-6 h-6">
                                <path d="M723 620.5C666.8 571.6 593.4 542 513 542s-153.8 29.6-210.1 78.6a8.1 8.1 0 00-.8 11.2l36 42.9c2.9 3.4 8 3.8 11.4.9C393.1 637.2 450.3 614 513 614s119.9 23.2 163.5 61.5c3.4 2.9 8.5 2.5 11.4-.9l36-42.9c2.8-3.3 2.4-8.3-.9-11.2zm117.4-140.1C751.7 406.5 637.6 362 513 362s-238.7 44.5-327.5 118.4a8.05 8.05 0 00-1 11.3l36 42.9c2.8 3.4 7.9 3.8 11.2 1C308 472.2 406.1 434 513 434s205 38.2 281.2 101.6c3.4 2.8 8.4 2.4 11.2-1l36-42.9c2.8-3.4 2.4-8.5-1-11.3zm116.7-139C835.7 241.8 680.3 182 511 182c-168.2 0-322.6 59-443.7 157.4a8 8 0 00-1.1 11.4l36 42.9c2.8 3.3 7.8 3.8 11.1 1.1C222 306.7 360.3 254 511 254c151.8 0 291 53.5 400 142.7 3.4 2.8 8.4 2.3 11.2-1.1l36-42.9c2.9-3.4 2.4-8.5-1.1-11.3zM448 778a64 64 0 10128 0 64 64 0 10-128 0z" />
                                </svg>
                                <span>WiFi</span>
                            </label>

                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked = {selected.includes('parking')} name="parking"  onChange={handleCbClick}/>
                                <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-6 h-6">
                                <path d="M380 704h264c4.4 0 8-3.6 8-8v-84c0-4.4-3.6-8-8-8h-40c-4.4 0-8 3.6-8 8v36H428v-36c0-4.4-3.6-8-8-8h-40c-4.4 0-8 3.6-8 8v84c0 4.4 3.6 8 8 8zm340-123a40 40 0 1080 0 40 40 0 10-80 0zm239-167.6L935.3 372a8 8 0 00-10.9-2.9l-50.7 29.6-78.3-216.2a63.9 63.9 0 00-60.9-44.4H301.2c-34.7 0-65.5 22.4-76.2 55.5l-74.6 205.2-50.8-29.6a8 8 0 00-10.9 2.9L65 413.4c-2.2 3.8-.9 8.6 2.9 10.8l60.4 35.2-14.5 40c-1.2 3.2-1.8 6.6-1.8 10v348.2c0 15.7 11.8 28.4 26.3 28.4h67.6c12.3 0 23-9.3 25.6-22.3l7.7-37.7h545.6l7.7 37.7c2.7 13 13.3 22.3 25.6 22.3h67.6c14.5 0 26.3-12.7 26.3-28.4V509.4c0-3.4-.6-6.8-1.8-10l-14.5-40 60.3-35.2a8 8 0 003-10.8zM840 517v237H184V517l15.6-43h624.8l15.6 43zM292.7 218.1l.5-1.3.4-1.3c1.1-3.3 4.1-5.5 7.6-5.5h427.6l75.4 208H220l72.7-199.9zM224 581a40 40 0 1080 0 40 40 0 10-80 0z" />
                                </svg>
                                <span>Free Parking</span>
                            </label>

                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked = {selected.includes('tv')}  name="tv" onChange={handleCbClick}/>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M4 7 H20 A2 2 0 0 1 22 9 V20 A2 2 0 0 1 20 22 H4 A2 2 0 0 1 2 20 V9 A2 2 0 0 1 4 7 z" />
                                <path d="M17 2l-5 5-5-5" />
                                </svg>
                                <span>TV</span>
                            </label>

                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked = {selected.includes('kitchen')}  name="kitchen" onChange={handleCbClick}/>
                                <svg viewBox="0 0 24 24" fill="currentColor" className='w-6 h-6' >
                                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7m5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                                </svg>
                                <span>Kitchen</span>
                            </label>

                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked = {selected.includes('pets')} name="pets" onChange={handleCbClick}/>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6"> 
                                <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75z" />
                                <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0112 5c.78 0 1.5.108 2.161.306" />
                                </svg>
                                <span>Pets</span>
                            </label>

                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked = {selected.includes('entrance')} name="entrance" onChange={handleCbClick}/>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"> 
                                <path d="M9 6v5H7V7H5v4H3V9H1v12h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2V9h-2v2h-2V7h-2v4h-2V6h-2v5h-2V6H9m-6 7h2v4H3v-4m4 0h2v4H7v-4m4 0h2v4h-2v-4m4 0h2v4h-2v-4m4 0h2v4h-2v-4z" />
                                </svg>
                                <span>Private Entrance</span>
                            </label>
        </>
    );
}



  Perks.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.string), 
    onChange: PropTypes.func.isRequired,
  };

  

