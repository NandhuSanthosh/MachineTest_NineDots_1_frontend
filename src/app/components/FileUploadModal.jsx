"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Progress } from 'antd';
import { IoMdAdd } from "react-icons/io";
import axiosInstance from '../../../configs/axios';
import { useParams } from 'next/navigation';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUploadModal = ({setFilesHandler}) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isUploading, setIsUploading] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    const {id} = useParams();
    console.log(id, "this is the id")

    const error = (content) => {
        messageApi.open({
          type: 'error',
          content
        });
    };


    const showModal = () => {
        setIsModalOpen(true);
    };



    const [files, setFiles] = useState([]);
    const chunkSize = 1024 * 100


    // update file state
    function updateFiles(e) {
        setFiles( Object.values(e.target.files).map( file => {
            return {
                name: file.name, 
                data: file, 
                isCompleted: false,
                isError: false,
                currentChunkIndex: 0, 
                totalChunks: Math.ceil(file.size / chunkSize)
            }
        }) );
    }

    // calls recurssive chunk file upload method
    function handleFileUpload(){
        setIsUploading(true)

        if(files.length == 0) {  
            alert("Please select files.")
        }
        for(let i = 0; i<files.length; i++) uploadFileHelper(files[i], i)
    }


    function handleClose(){
      setIsModalOpen(false)
      setFiles([])
      setIsUploading(false)
      setIsCompleted(false)
    }


    function uploadFileHelper(curr, index, currentChunkIndex = 0) {
        const file = curr.data
        if(currentChunkIndex >= curr.totalChunks) {
            console.log("it went up")
            setFiles( files.map( (f, i) => {
              if(index == i) f.isCompleted = true;
              return f;
            }))
            return;
        }

        async function uploadChunk(readerEvent) {
            if (!file) return;
            const data = readerEvent.target.result;
      
            // Set up the parameters for the request  
            const params = new URLSearchParams();
            params.set('name', file.name);
            params.set('currentChunkIndex', currentChunkIndex);
            params.set('totalChunks', Math.ceil(file.size / chunkSize));
            if(id)
              params.set('id', id)
      
            console.log(params.toString() )
      
            // Set up the headers for the request
            const headers = { 'Content-Type': 'application/octet-stream' };
            const url = 'https://drive.nandhu.xyz/upload?' + params.toString()
      
            fetch(url, {
              method: 'POST',
              headers: headers,
              body: data
            }).then(response => response.json()) 
              .then(res => {
                    console.log(res)
                    if(res.message == "File uploaded") {
                      setFilesHandler( state => {
                        return [...state, res.newFile]
                      })
                    }
                    setFiles( files.map( (f, i) => {
                        if(index == i) f.currentChunkIndex = currentChunkIndex + 1;
                        return f;
                    }))
                    uploadFileHelper(curr, index, currentChunkIndex + 1);
              })
              .catch( err => {
                setFiles( files.map( (f, i) => {
                  if(index == i) f.isError = true
                }))
              })
        }

        // Calculate the start and end of the current chunk
        const from = curr.currentChunkIndex * chunkSize;
        const to = (curr.currentChunkIndex + 1) * chunkSize >= file.size ? file.size : from + chunkSize;
      
        // Slice the file to get the current chunk
        const blob = file.slice(from, to);
      
        const reader = new FileReader();
        // Set the onload function to upload the chunk when it's read
        reader.onload = e => uploadChunk(e);
        // Read the blob as a data URL
        reader.readAsDataURL(blob);
    }


    useEffect( () => {
      if(files.length != 0 && isUploading) {
        let isCompleted = true; 
        for(let file of files) isCompleted = file.isCompleted && isCompleted
        

        console.log(isCompleted, "Is completed from use effect", files)
        if(isCompleted) {
          setIsCompleted(true)
          setIsUploading(false)
        }
      }
    }, [files])


  return (
    <>
        {contextHolder}
      <button onClick={showModal}>
        <IoMdAdd size={"20px"}/>
      </button>
      <Modal title="New Folder" open={isModalOpen} footer={null}>
        <div>
          <div>
            <input type='file' multiple={true} onChange={(e) => updateFiles(e)} />
          </div>
        </div>

        <div className='mt-4'>
          {
            files.map( (file, index) => {
              return (
                <div key={index} className='mb-3'>
                  {file.name}
                  {
                    (isUploading || isCompleted) && 
                    <div >
                       <Progress percent={ Math.round(file.currentChunkIndex / Math.ceil(file.data.size / chunkSize) * 100) } status={file.isError ? "exception" : ""} />
                    </div>
                  }
                </div>
              )
            })
          }
        </div>


        <div className='flex justify-between'>
          <button onClick={handleClose} disabled={isUploading} className={`px-4 py-1 rounded-md ${isUploading ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-300' }`}>Cancel</button>
          <button onClick={handleFileUpload} disabled={isUploading || isCompleted} className={`px-4 py-1 rounded-md  ${isUploading || isCompleted ? 'bg-blue-100 cursor-not-allowed text-gray-400' : 'bg-blue-500 text-white'} `}>Upload</button>
        </div>
      </Modal>
    </>
  );
};

export default FileUploadModal;