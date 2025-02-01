const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const getMovieAction = (movieDetails, subscriptionPlan) => {
  const token = getCookie('accessToken');
  
  if (!token) {
    return 'login'; // Prompt to log in if no access token
  }

  // Check if the movie is "rentable"
  if (movieDetails.accessParams.accessType === 'rentable' && movieDetails.accessParams.isRentable) {
    // Movie is rentable, check subscription plan
    if (subscriptionPlan === 'free') {
      return 'rent'; // Prompt to rent if on a free subscription
    } else {
      return 'watchNow'; // If the user has a paid subscription, allow watching directly
    }
  }

  // Check if the movie is free
  if (movieDetails.accessParams.accessType === 'free' && movieDetails.isFree) {
    return 'watchNow'; // Allow watching free movies
  }

  // Default case for free subscription
  if (subscriptionPlan === 'free') {
    return 'subscribe'; // Prompt to subscribe for non-free content
  }

  return 'watchNow'; // If no other case matches, allow watching for other subscriptions
};

export default getMovieAction;
