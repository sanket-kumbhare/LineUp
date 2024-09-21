import axios from "axios";

const twitterLogin = async (accessToken) => {
  console.log(accessToken);
  try {
    let twitterLoginURL = import.meta.env.VITE_TWITTER_AUTH_LOGIN_URL;
    const twitterAuthLink = await axios.get(twitterLoginURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (twitterAuthLink.data?.authUrl) {
      window.location.href = twitterAuthLink.data.authUrl;
    } else {
      throw new Error("Twitter Token Error");
    }
  } catch (error) {
    console.error(error);
  }
};

export { twitterLogin };
