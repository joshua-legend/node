const redirect = (req, res) => {
  const redirectUrl = req.query.state;
  console.log("리다이렉투");
  res.redirect(`http://localhost:3001${redirectUrl}`);
};
module.exports = redirect;
