import React, {useState,useEffect,useMemo,useRef} from 'react'
import './BookCard.css';
import SwipeButtons from './SwipeButtons';
import TinderCard from  "react-tinder-card";
import Header from './Header';
import Axios from "axios";
import Books from './Books';

function BookCards() {
  const [books,setBooks]=useState([]);
  const [currentIndex, setCurrentIndex] = useState(books.length - 1)
  const [lastDirection, setLastDirection] = useState()

    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)
  const childRefs = useMemo(
    () =>
      Array(books.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < books.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < books.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  useEffect(() => {
    Axios.get("http://localhost:8000/getBooks").then((response) => {
      setBooks(response.data);
    });
  }, []);
  return (
    <div>
      <Header />
      <h1> Book Cards</h1>

     <div className="bookCards__cardContainer">
     {books.map(book => (

<TinderCard
  className="swipe"
  key={book.title}
  onSwipe={(dir) => swiped(dir, book.name, book._id)}
  preventSwipe={['up','down']}>
<div style={{backgroundImage: `url(${book.imageUrl})`}} className="card">
  <h3>{book.title}</h3>
</div>
</TinderCard>
))}
{/* <div className="btnSwipe">
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
</div> */}
        <SwipeButtons />

      </div>
    </div>
  );
}

export default BookCards;