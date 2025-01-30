const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  
  const getMovieAction = (movieDetails, subscriptionPlan) => {
    const token = getCookie('accessToken');
    
    if (!token) {
      return 'login';
    }
  
    if (subscriptionPlan !== 'free') {
      return 'watchNow';
    }
  
    if (movieDetails.isFree) {
      return 'watchNow';
    }
  
    if (movieDetails.isRentable) {
      return 'rent';
    }
  
    return 'subscribe';
  };
  
  export default getMovieAction;
  