import React, { useState } from 'react'
import FileUploadModal from './FileUploadModal'
import { FaFolder } from 'react-icons/fa'
import { SlOptionsVertical } from 'react-icons/sl'
import { FaImage } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import Image from 'next/image';




const Files = ({data}) => {

    const [files, setFiles] = useState(data)
    console.log("folders from folder", data)

    function getIcon(name) {
        const extension = getExtension(name)
        if(isImage(name)) return <FaImage size={32}/>
        if(extension == "pdf") return <FaFilePdf size={22} />
    }

    function isImage(name){
        const extension = getExtension(name)
        const imageFormates = ["png", "jpg", "jpeg"]
        return imageFormates.includes(extension)
    }

    function getExtension(name) {
        let nameArray = name.split(".")
        return nameArray[nameArray.length - 1]
    }



  return (
    <div>
        <div className='flex justify-between'>
            <div className='text-gray-600 font-medium mb-5'>
                Files
            </div>
            
            <div>
                <FileUploadModal setFilesHandler={setFiles}/>
            </div>
        </div>

      <div className='flex gap-10 flex-wrap'>
        {
            files.map( (file, index) => {
                return (
                    <div key={index} className='bg-blue-50 w-72 px-4 py-3 rounded-xl'>
                        <a target='_blank' href={'/' + file}>
                            <div className='flex justify-between items-center gap-3 mb-2'>
                                <div className='flex gap-5 items-center'>
                                    {
                                        getIcon(file.name)
                                    }
                                    
                                    <span className='font-medium text-gray-700 line-clamp-1'>{file.name}</span>
                                </div>
                                <div>
                                    <SlOptionsVertical />
                                </div>
                            </div>

                            <div>
                                {
                                    isImage(file.name) ?   
                                        <Image alt='image' className='rounded-md' src={"http://localhost:4000/uploads/" + file.fileName} width={"300"} height={"50"}/>
                                    : 
                                        <Image alt='image' className='rounded-md' src={"/pdfLogo.png"} width={"300"} height={"50"}/>

                                }
                            </div>
                        </a>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Files
