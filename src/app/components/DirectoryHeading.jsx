import Link from 'next/link'
import React from 'react'

const DirectoryHeading = ({data}) => {
  return (
    <div>
      {
        data.map( (heading, index) => {
            return (
                <div key={index}>
                    <Link href={heading.href} className='text-3xl'>{heading.name}</Link>
                    {
                        index != data.length - 1 && ">"
                    }
                </div>
            )
        })
      }
    </div>
  )
}

export default DirectoryHeading
