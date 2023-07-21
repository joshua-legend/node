const axios = require("axios");

const getBandPosts = async (req, res) => {
  const get_posts_url = `https://openapi.band.us/v2/band/posts?access_token=${process.env.BAND_ACCESS_TOKEN}&band_key=${process.env.BAND_TEST_KEY}&locale=ko_KO`;
  const response = await axios.get(get_posts_url);
  const { items } = response.data.result_data;
  const items_array = items.slice(0, 5);
  const itemsWithContentsAndPostKey = items_array.map((post) => {
    return {
      post_key: post.post_key,
      content: post.content.slice(0, 20),
    };
  });

  return res.status(200).json({ success: true, data: itemsWithContentsAndPostKey });
};

module.exports = getBandPosts;
