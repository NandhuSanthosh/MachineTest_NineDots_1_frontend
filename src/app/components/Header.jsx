"use client"
import React from 'react'
import { Input, Space, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';



const Header = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className='p-4 flex justify-between items-center'>
      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 700}} />
      <Avatar size={40} icon={<UserOutlined />} />
    </div>
  )
}

export default Header
