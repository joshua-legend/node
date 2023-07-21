const axios = require("axios");

const postComment = async (receipt) => {
  const { nickname, isDelivery, purchased_items } = receipt;

  const pickup = isDelivery ? "집으로 배달" : "픽업 하기";
  const purchased_items_filter = purchased_items.map((item) => `${item.name} ${item.quantity}개`);
  const get_posts_url = `https://openapi.band.us/v2/band/posts?access_token=${process.env.BAND_ACCESS_TOKEN}&band_key=${process.env.BAND_TEST_KEY}&locale=ko_KO`;
  const response = await axios.get(get_posts_url);
  const { post_key } = response.data.result_data.items[0];
  const body = `${nickname}님 ${purchased_items_filter}들을 ${pickup}로 신청하셨습니다. 감사합니다.`;

  const post_comment_url = `https://openapi.band.us/v2/band/post/comment/create?access_token=${process.env.BAND_ACCESS_TOKEN}&band_key=${process.env.BAND_TEST_KEY}&post_key=${post_key}&body=${body}`;
  axios
    .post(post_comment_url)
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { postComment };
