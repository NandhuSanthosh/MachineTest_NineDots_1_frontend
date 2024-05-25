"use client";

import Content from '@/app/components/Content';
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {

  const {id} = useParams();


  return (
      <Content id={id}/>
  )
}

export default Page
