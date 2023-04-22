import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper";
import { type Review, ReviewsAPI } from "./datasources/ReviewsApi";

type DataSource = { dataSources: { reviewsAPI: ReviewsAPI } };
const resolvers: GraphQLResolverMap<DataSource> = {
  Query: {
    latestReviews: (_: unknown, __: unknown, { dataSources }: DataSource) => {
      return dataSources.reviewsAPI.getLatestReviews();
    },
  },
  Location: {
    overallRating: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getOverallRatingForLocation(id);
    },
    reviewsForLocation: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getReviewsForLocation(id);
    },
  },
  Review: {
    location: ({ locationId }) => {
      return { id: locationId };
    },
  },
  Mutation: {
    submitReview: (
      _: unknown,
      { locationReview }: { locationReview: Review },
      { dataSources }: DataSource
    ) => {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return { code: 200, success: true, message: "success", locationReview: newReview };
    },
  },
};

export { resolvers };
