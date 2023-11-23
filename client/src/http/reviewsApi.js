import {$host} from "./index";
import {getUser} from "./userAuth";

export const fetchReviews = async () => {
    try {
        return await $host.get('/api/review');
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

export const createReview = async (review) => {
    try {
        const user = await getUser();
        const {rating, comment} = review;

        return await $host.post('/api/review', {rating: parseInt(rating), comment, user: user.data.message._id});
    } catch (error) {
        console.error('Error:', error.message);
    }
};

