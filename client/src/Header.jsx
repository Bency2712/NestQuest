import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
export default function Header()
{
  const {user}=useContext(UserContext);
    return (
        <header className="flex justify-between">  {/*Add padding on all the four sides*/}
          <Link to={'/'} className="flex items-center gap-1">   {/* to keep the icon and the text next to each other*/}
          <svg fill="pink" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" className="w-9 h-9" >
            <path d="M16 7h.01M3.4 18H12a8 8 0 008-8V7a4 4 0 00-7.28-2.3L2 20" />
            <path d="M20 7l2 .5-2 .5M10 18v3M14 17.75V21M7 18a6 6 0 003.84-10.61" />
          </svg>
              <span className='font-bold text-xl'>NestQuest</span>    {/* Make the Title bold*/}
          </Link>
  
          {/*Search widget*/}
          <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>  {/*keep space and add border around it, make it round. Padding at the bottom is 2 and top is 4*/}
            {/*Place*/}
            <div>Anywhere</div>
            <div className='border-l border-gray-300'></div>    {/* To add lines in between*/}
            {/*Time*/}
            <div>Any week</div>
            <div className='border-l border-gray-300'></div>  
  
            {/*Guests*/}
            <div>Add guests</div>
  
            {/*Search Icon*/}
            <button className='bg-primary text-white p-1 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </button>
          </div>
  
  
          {/*Person's details widget*/}
        
          <Link to={user? 'account':'/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
  
          <div style={{ backgroundColor: '#041690' }} className='bg-primary-500 text-white rounded-full border border-gray-500 overflow-hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
          </Link>
  
        </header>
        
    );
}