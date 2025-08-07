import React from 'react'

function Card({userName,price="$21"}) {
  console.log(userName,price);
  
  return (
    <div className="w-60 flex flex-col rounded-xl bg-black min-h-[19rem] m-4">
        <div>
          <img
            src="https://cdn.vox-cdn.com/thumbor/ZkmdkuJUTLgJh96_FWQ5zweGGxo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg"
            alt="test"
            className="object-cover object-center rounded-t-xl"
          />
        </div>
        <div className='text-2xl text-white font-bold text-left px-3 '>{userName}</div>
        <div className="flex flex-col py-3 px-3 pb-10">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-sm font-semibold">Bored ape nft accidental</h1>
            <h1 className='text-sm text-white'>Price</h1>
          </div>
          <div className="flex justify-between w-full text-gray-400 text-sm mt-2">
            <p>#345</p>
            <p>{price}</p>
          </div>
        </div>
      </div>
  )
}

export default Card