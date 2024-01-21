import React from 'react';
import { FaStar } from 'react-icons/fa';
import './stylesStar.css';

const StarRating = ({rating}) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);

  return (
    <>
        <div className="star-rating">
        {[...Array(totalStars)].map((_, index) => (
            <FaStar
            key={index}
            className={index < filledStars ? 'filled' : 'empty'}
            />
         ))}
        </div>
    </>
  )
}

export default StarRating