const redirect = (req, res) => {
  const redirectUrl = req.query.state;
  res.redirect(`http://localhost:3001${redirectUrl}`);
};
module.exports = redirect;
