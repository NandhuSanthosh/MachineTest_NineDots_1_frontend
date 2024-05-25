import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import Header from './Header'

const Home = ({id}) => {
  return (
    <main className="h-screen bg-gray-100
    flex
    ">
      <Sidebar />
      <div className='h-full flex flex-col w-full'>
        <Header />
        <Content id={id}/>
      </div>
    </main>
  )
}

export default Home
