"use client";

import Content from '@/app/components/Content';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {

  const {id} = useParams();


  return (
      <Content id={id}/>
  )
}

export default page
