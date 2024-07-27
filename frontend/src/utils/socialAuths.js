const twitterLogin = () => {
  try {
    window.location.href = import.meta.env.VITE_TWITTER_AUTH_LOGIN_URL;
  } catch (error) {
    console.error(error);
  }
};

export { twitterLogin };
