"use client";
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../configs/axios'
import DirectoryHeading from './DirectoryHeading';
import Folders from './Folders';
import Files from './Files';
import { Alert, Flex, Spin } from 'antd';

const contentStyle= {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Content = ({id}) => {

    const [curr, setCurr] = useState(null )
    console.log(curr)
    const [directoryHeading, setDirectoryHeading] = useState([{
      name: "My Drive", 
      href: "#"
    }])

    useEffect( () => {
      let url = "/files" + (id ? "?id=" + id : "");
      console.log(url)
      axiosInstance.get(url)
      .then( res => {
        const data = res.data;
        console.log(data)
        setCurr(data.curr)
      })
    }, [])


    const folders = curr?.files.filter( x => x.isFolder)
    const files = curr?.files.filter(x => !x.isFolder)


    return (
      <div className='p-3 flex-1 overflow-y-scroll'>
          <div className='rounded-md bg-white shadow-md p-7'>
            <div style={{minHeight: "850px"}}>
              {
                curr ?
                  <>
                    <div className='mb-8'> 
                      <DirectoryHeading data={directoryHeading}/>
                    </div>

                    <Folders data={folders}/>
                    <Files data={files}/>
                  </>
                : 

                  <div className='w-full h-full flex justify-center items-center'>
                      <Spin tip="Loading" size="large">
                        {content}
                      </Spin>
                  </div>
              }

            </div>
          </div>
      </div>
    )
}

export default Content
