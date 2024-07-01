import React from 'react'
import SingleNote from '../components/SingleNote';
import Masonry from 'react-masonry-css'

const NotesPage = () => {

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        850: 2,
        670: 1
      };

  return (
    <div className="inside-container">
    <div className="elements-container masonry-grid">
      <Masonry
         breakpointCols={breakpointColumnsObj}
         className="my-masonry-grid"
         columnClassName="my-masonry-grid_column"
      >
          <SingleNote num={0}/>
          <SingleNote num={1}/>
          <SingleNote num={2}/>
          <SingleNote num={3}/>
          <SingleNote num={4}/>
          <SingleNote num={5}/>
      </Masonry>
    </div>
  </div>
  )
}

export default NotesPage
