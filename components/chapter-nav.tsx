import React from 'react'
import { Button } from './ui/button'
import Typography from './ui/typography'

const ChapterNav = () => {
  return (
    <nav>
      <div className="cursor-pointer items-center text-white mb-4 rounded-lg overflow-hidden">
        <Button variant="default">
          <Typography 
          text='Previous'
          variant='p'
          />
        </Button>
      </div>
    </nav>
  )
}

export default ChapterNav
