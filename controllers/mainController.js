const mainController = {
    // Render the homepage
    renderHomePage: (req, res) => {
      res.render('home'); // Assuming you have a "home.mustache" template for the homepage
    },
  };
  
module.exports = mainController;
  