"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../configs/axios'
import Link from 'next/link'
import { FaFolder } from 'react-icons/fa'
import { SlOptionsVertical } from 'react-icons/sl'

const Sidebar = () => {

  const [dist, setDist] = useState([])

  useEffect( () => {
    let url = "/files" 
    axiosInstance.get(url)
    .then( res => {
      const data = res.data;
      console.log(data)
      setDist(data.curr.files.filter( x => x.isFolder).slice(0,5))
    })
  }, [])

  return (
    <div className='h-full w-72 px-10 pt-5'>
      {/* Logo */}
      <Link href={"/"}>
        <div className='flex items-center'>
          <Image src={'/logo.png'} width={"80"} height={"80"}/>
          <div>
            <h1 className='text-xl text-gray-700 font-medium'>Cloud It</h1>
          </div>
        </div>
      </Link>


      {/* Root files */}
      <div className='flex flex-col gap-5 mt-32'>
        {
          dist.map( (folder, index) => {
            return (
              <div className='w-72 py-2 rounded-xl' key={index}>
                      <Link href={'/c/' + folder._id}>
                      <div className='flex justify-between items-center'>
                          <div className='flex gap-5 items-center'>
                              <FaFolder size={"20px"} className='text-gray-600'/>
                              <span className='font-medium text-gray-700'>{folder.name}</span>
                          </div>
                          <div>
                              <SlOptionsVertical />
                          </div>
                      </div>
                  </Link>
              </div>
            )
          } )
        }
      </div>
    </div>
  )
}

export default Sidebar
