import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'

const Review = ({product}) => { 
    console.log(product)
  const [review, setReview] = useState()
  const [rating, setRating] = useState(5)
  const queryClient = useQueryClient()
  let {productid} = useParams()

  const {user} = useSelector(state => state.user)

  const handleSubmit = async () => {

      console.log(productid)

    const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/products/${productid}/review`
    const response = await fetch(REACT_APP_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: user.id,
            description:review,
            rating
        })
    })
    const res = await response.json()
    queryClient.invalidateQueries('product')
    console.log(res)
  }
  return   <div className='flex flex-col items-start md:items-center mt-[3rem] md:justify-start justify-center grow '>

                    <h3 className='text-4xl font-semibold mb-2 flex justify-start md:justify-center w-full '>Add a review</h3>
                    <StarRating setRating = {(value) => setRating(value)}/>
                    <div className='flex flex-col justify-center'>
                        <textarea rows = {5} cols = {50}  className = 'border-2 border-slate-200 mt-3 w-[20rem]' value = {review} onChange = {(e) =>
                        setReview(e.target.value)}/>
                        <div className='flex justify-start  '>
                            <button className='bg-green-800  text-white  text-sm rounded-md px-2 py-1.5 my-1.5'
                                onClick = {handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        <div>
                            {
                                product.reviews.map((review) => {
                                    
                                   return <ReviewTile product = {product}  review = {review} user = {user} queryClient = {queryClient}/>
                                })
                            }
                        </div>
                   </div>
    </div>
  
}


const ReviewTile = ({review, user, product, queryClient}) => {
    console.log(review)
    const ratingArr = new Array(review.rating).fill(0)
    const handleDelete = async ({reviewid, userid}) => {
        const API = `${process.env.REACT_APP_API_URL}/products/${product._id}/review/${review._id}`
        const response = await fetch(API, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: user.id,
            })
        })
        const res = await response.json()
        console.log(res)
        queryClient.invalidateQueries('product')

    }
    return (
        <div className='flex flex-col md:items-start mt-[3rem] items-start  justify-start grow border-2 py-[0.5rem] px-[1rem]'>
            {/* <h3 className='text-4xl font-semibold mb-2'>{review.desc</h3> */}
            <div className='flex flex-col items-start  justify-start'>
                <div className='flex flex-col items-start  justify-start'>
                   
                   <div className='w-full text-left'> {
                        ratingArr.map(rating => {
                    
                    return <Star rating = {rating}/> 
                        })
                   }</div> 
                   
                    <p className='mb-2 text-left  w-full '>{review.description}</p>
                    <div className='flex flex-col'>
                        <p className='font-thin  text-slate-500'>By {review.user}</p>
                      {review?.user === user?.username ? <button 
                      onClick={() => handleDelete(product._id, review._id)}
                      type="button" class="focus:outline-none mt-3 w-[4rem] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-1  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Delete
                        </button>
                        : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Star = () => {
    return (
        <div className='rating'>
                <input type="radio" name={`rating-1`} className="mask mask-star  bg-orange-400" />
        </div>
    )
}

const StarRating = ({setRating, rating}) => {
    return (
        <div className="rating">
            <input type="radio" name="rating-1" className="mask mask-star  bg-orange-400" onClick = {() => setRating(1)}/>
            <input type="radio" name="rating-1" className="mask mask-star  bg-orange-400" onClick = {() => setRating(2)}/>
            <input type="radio" name="rating-1" className="mask mask-star  bg-orange-400" onClick = {() => setRating(3)}/>
            <input type="radio" name="rating-1" className="mask mask-star  bg-orange-400" onClick = {() => setRating(4)}/>
            <input type="radio" name="rating-1" className="mask mask-star  bg-orange-400" onClick = {() => setRating(5)}/>
        </div>
    )
}

export default Review