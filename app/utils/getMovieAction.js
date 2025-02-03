/*
@params movie: movie object
@params userSubscription: user subscription plan NAME

Checks and returns what the next course of action should be, whether to let watch, rent or subscribe.
*/

const getMovieAction = (movie, userSubscription) => {
  // Guard clause for when movie data isn't available
  if (!movie) {
    return 'error';
  }

  // Case 1: If user is not logged in
  if (!userSubscription) {
    return 'login';
  }

  // Normalize subscription name to lowercase for comparison
  const subscription = userSubscription.toLowerCase();

  // Case 4 & 5: Premium subscriptions (gold or silver) can watch any movie
  if (['gold', 'silver'].includes(subscription)) {
    return 'watchNow';
  }

  // For free subscription users, handle different movie types
  if (subscription === 'free') {
    const movieAccessType = movie.accessParams.accessType.toLowerCase();
    if(movieAccessType ==="free"){
      return 'watchNow';
    }else if(movieAccessType === 'rentable'){
      return 'rent';
    } else {
      return 'subscribe'
    }
  }

  // Default fallback
  return 'error';
};

export default getMovieAction;