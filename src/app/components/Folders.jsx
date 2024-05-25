import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaFolder } from "react-icons/fa";
import NewFolderModal from './NewFolderModal';
import { SlOptionsVertical } from "react-icons/sl";
import Image from 'next/image';



const Folders = ({data}) => {

    const [folders, setFolders] = useState(data)
    console.log("folders from folder", data)

    function handleCreateNewFolder(){

    }


  return (
    <div className='mb-10'>
        <div className='flex justify-between'>
            <div className='text-gray-600 font-medium mb-5'>
                Folders
            </div>
            
            <div>
                <NewFolderModal setFolders={setFolders}/>
            </div>
        </div>

      <div className='flex gap-10 flex-wrap'>
        {   
            folders.length == 0 ? 
                <div className='flex justify-center items-center flex-1 gap-3'>
                    <Image src={"/folderEmpty.png"} width={100} height={100} />
                    <div>No Folders</div>
                </div>
            : 
            folders.map( (folder, index) => {
                return (
                    <div key={index} className='bg-blue-50 w-72 px-4 py-3 rounded-xl'>
                        <Link href={'/c/' + folder._id}>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-5 items-center'>
                                    <FaFolder size={"40px"} className='text-gray-600'/>
                                    <span className='font-medium text-gray-700'>{folder.name}</span>
                                </div>
                                <div>
                                    <SlOptionsVertical />
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Folders
