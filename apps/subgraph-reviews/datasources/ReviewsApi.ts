import { reviews } from "./reviews_data.json";

let allReviews = reviews;

type Reviews = typeof reviews;
export type Review = Reviews[number];

class ReviewsAPI {
  getReview(id: Review["id"]) {
    return allReviews.find((r) => r.id === id);
  }
  // id really refers to Location ID will fix later
  getReviewsForLocation(id: Review["id"]) {
    return allReviews.filter((r) => r.locationId === id);
  }

  getLatestReviews() {
    return allReviews.slice(Math.max(reviews.length - 3, 0));
  }
  // id really refers to Location ID will fix later
  getOverallRatingForLocation(id: Review["id"]) {
    const allRatings = allReviews.filter((r) => r.locationId === id).map((r) => r.rating);
    const sum = allRatings.reduce((a, b) => a + b, 0);
    const average = sum / allRatings.length || 0;
    return average;
  }

  submitReviewForLocation(review: Review) {
    const newReview: Review = { ...review, id: `rev-${allReviews.length + 1}` };
    allReviews = [...reviews, newReview];
    return newReview;
  }
}

export { ReviewsAPI };
