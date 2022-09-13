import React from 'react'
import Book from './Book'
import './Books.css'
export const Books = () => {
  return (
    <div>
    <Book 
       title="Anna and the French Kiss"
       genre="romance"
       cover_image="https://images.penguinrandomhouse.com/cover/9780593111260"
    />
    <Book 
       title="Lola and the guy next door"
       genre="romance"
       cover_image="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1358271832l/9961796.jpg"
    />
    <Book 
       title="girl with dragon tattoo"
       genre="action"
       cover_image="https://upload.wikimedia.org/wikipedia/en/8/80/The_Girl_with_the_Dragon_Tattoo_Poster.jpg"
    />
    <Book 
       title="atomic habits"
       genre="help"
       cover_image="https://images-na.ssl-images-amazon.com/images/I/51S7KOWir7L._SX526_BO1,204,203,200_.jpg"
    />
    </div>
  )
}
export default Books;