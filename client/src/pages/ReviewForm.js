import {Component} from "react";

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        var rating = props.rating;
        var ratingIsValid = this.validateRating(rating);
        var comment = props.comment;
        var commentIsValid = this.validateComment(comment);
        this.state = {rating: rating, comment: comment, ratingValid: ratingIsValid, commentValid: commentIsValid};

        this.onRatingChange = this.onRatingChange.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateComment(comment) {
        return comment.length > 0;
    }

    validateRating(rating) {
        const parsedRating = parseInt(rating);

        if (isNaN(parsedRating)) return false;

        return parsedRating >= 1 && parsedRating <= 5;
    }

    onCommentChange(e) {
        var val = e.target.value;
        var valid = this.validateComment(val);
        this.setState({comment: val, commentValid: valid});
    }

    onRatingChange(e) {
        var val = e.target.value;
        console.log(val);
        var valid = this.validateRating(val);
        this.setState({rating: val, ratingValid: valid});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.ratingValid === true && this.state.commentValid === true) {
            const review = {
                rating: this.state.rating,
                comment: this.state.comment,
            };
            this.props.onSubmit(review);
        }
        else alert('Check form!')
    }

    render() {
        var ratingColor = this.state.ratingValid === true ? "green" : "red";
        var commentColor = this.state.commentValid === true ? "green" : "red";
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Create new review</h2>
                <p>
                    <label>Rating:</label><br/>
                    <input type="number" value={this.state.rating} max="5" min="1"
                           onChange={this.onRatingChange} style={{borderColor: ratingColor}}/>
                </p>
                <p>
                    <label>Comment:</label><br/>
                    <input type="text" value={this.state.comment}
                           onChange={this.onCommentChange} style={{borderColor: commentColor}}/>
                </p>
                <input type="submit" value="Create"/>
            </form>
        );
    }
}

export default ReviewForm;