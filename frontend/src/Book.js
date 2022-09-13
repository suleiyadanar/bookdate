import React from 'react'
import './Books.css'
const Book = ({title, genre,cover_image}) => {
  return (
    <div className="book">
        <img src={cover_image} className="book__image" alt={title}/>
        <div className="book__title">
            <h1>{title}</h1>
           
        </div>
        <p className="book__genre">{genre}</p>

    </div>

  )
}

export default Book