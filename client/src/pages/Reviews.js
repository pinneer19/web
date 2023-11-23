import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from "../components/modals/Modal";
import {useNavigate} from "react-router-dom";
import {createReview, fetchReviews} from '../http/reviewsApi'
import {check, getUser} from "../http/userAuth";
import {addService} from "../http/catalogAPI";
import ReviewForm from "./ReviewForm";
function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({});
    const [active, setActive] = useState(false)
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        check().then(response => {
            if(response.data.message === 'Ok') setAuth(true);
        }).catch(e => console.log(e));
        updateReviews()
    }, []);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewReview((prevState) => ({...prevState, [name]: value}));
    };

    function handleOpenModal() {
        console.log(auth)
        if(auth) setActive(true);
        else navigate('/login')
    }
    function updateReviews() {
        fetchReviews()
            .then(response => {
                setReviews(response.data);
            })
            .catch(e => console.log(e.message));
    }
    function handleFormSubmit(review) {
        createReview(review).then(_ => {
            setActive(false)
            updateReviews()
        }).catch(e => console.log(e.message))
    }
    return (
        <div>
            <div className="add-review" onClick={handleOpenModal}>Add review</div>
            <Modal active={active} setActive={setActive}>
                <ReviewForm rating="5" comment="" onSubmit={handleFormSubmit}/>
            </Modal>
            {reviews.length === 0 ? (
                <p className="p-reviews">No reviews available.</p>
            ) : (
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li key={review._id} className="review-item">
                            <div>
                                <strong>User id: </strong>
                                {review.user}
                            </div>
                            <div>
                                <strong>Rating: </strong>
                                {review.rating}
                            </div>
                            <div>
                                <strong>Comment: </strong>
                                {review.comment}
                            </div>
                            <div>
                                <strong>Created At: </strong>
                                {new Date(review.createdAt).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <style jsx>{`
              .review-list {
                list-style-type: none;
                padding: 0;
              }

              .text-area {
                max-width: 1060px;
                font-size: 16px;
                border-radius: 5px;
              }

              .text-area:focus {
                outline: none;

              }

              .add-review {
                margin-top: 20px;
                background: #c0ffc0;
                color: green;
                padding: 15px;
                font-weight: bold;
                font-size: 24px;
                width: 200px;
                text-align: center;
                margin-left: 20px;
                border-radius: 15px;
                cursor: pointer;
                transition: 0.3s;
              }

              .p-reviews {
                font-weight: bold;
                font-size: 34px;
                margin: 10px;
                text-align: center;
              }

              .add-review:hover {
                background: #8ffb8f;
                color: #166d16;
              }

              .review-item {
                background: #dadada;
                margin: 20px 20px 0 20px;
                padding: 1rem;
                border: 1px solid #ccc;
                border-radius: 4px;
              }
            `}</style>
        </div>
    );
}

export default Reviews;