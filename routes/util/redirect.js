const redirect = (req, res) => {
  const redirectUrl = req.query.state;
  console.log(res.cookies);
  res.redirect(`http://localhost:3001${redirectUrl}`);
};
module.exports = redirect;
