import React from 'react'

type NavbarProps = {
  email: string;
  onLogout: () => void;
}

const Navbar = ({email, onLogout}: NavbarProps) => {
  return (
    <div className='relative flex items-center bg-gray-300 p-2 border-b-2 border-gray-400 h-14'>
        <div className='absolute left-0 flex items-center p-2'>
            <h1 className='m-0 text-base text-black font-bold'>NextApp</h1>
        </div>
        <div className='absolute right-0 flex items-center p-2 space-x-6'>
            <div className="flex items-center justify-center space-x-2 text-base">
                <div className="font-semibold text-gray-900">User</div>
                <div className="text-gray-600">{ email }</div>
            </div>
            <button className='rounded-full bg-gray-900 py-1 px-2 text-xs font-medium text-white hover:bg-gray-500' onClick={()=>{ onLogout() }}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar