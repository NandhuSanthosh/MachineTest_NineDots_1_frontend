"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { IoMdAdd } from "react-icons/io";
import axiosInstance from '../../../configs/axios';
import { message } from 'antd';
import { useParams } from 'next/navigation';

const NewFolderModal = ({setFolders}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const ref = useRef(null)
    const [newFolder, setNewFolder] = useState("")

    const {id} = useParams();

    const error = (content) => {
        messageApi.open({
          type: 'error',
          content
        });
      };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if(!newFolder){
            error("Folder name cannot be empty")
            return;
        }

        const data = {
          name: newFolder
        }

        if(id) data.parent = id

        axiosInstance.post("/new_folder", data)
        .then( res => {
            const data = res.data;
            console.log(data)
            setFolders( (state) => {
                return [...state, data]
            })
        })
        .catch( err => {
            console.log(err.message)
        })

        setIsModalOpen(false)
        setNewFolder("")

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log(ref?.current)
        if(ref.current)
        ref.current.focus();
    }, [ref]);


  return (
    <>
        {contextHolder}
      <button onClick={showModal}>
        <IoMdAdd size={"20px"}/>
      </button>
      <Modal title="New Folder" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input type='text' className='w-full border border-solid border-gray-400 rounded-md p-3' ref={ref} value={newFolder} onChange={(e) => setNewFolder(e.target.value)}/>
      </Modal>
    </>
  );
};

export default NewFolderModal;