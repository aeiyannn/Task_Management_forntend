import React from 'react'

export default function Notfound({ networkerr }) {
    return (
        <>
            {
                networkerr ?
                    <div className='text-center'>
                        <div className='flex justify-center items-center  mt-28'>
                            <img className='w-1/2 h-1/2' src="https://t3.ftcdn.net/jpg/04/48/35/42/360_F_448354204_33yPB12jtqzD31robpa85NoPctJ2thRd.jpg" />
                        </div>
                        <button onClick={() => window.location.reload()} className=' m-5 bg-blue-500 p-2 px-6 rounded-lg text-white '>Reload</button>
                    </div>
                    :
                    <div className='flex justify-center items-center  m-28'>
                        <img className='w-1/2 h-1/2' src="https://t3.ftcdn.net/jpg/04/48/35/42/360_F_448354204_33yPB12jtqzD31robpa85NoPctJ2thRd.jpg" />
                    </div>

            }
        </>
    )
}
