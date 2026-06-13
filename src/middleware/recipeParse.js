export const parseIngredients = (req, res, next) => {
  if (req.body.ingredients) {
    req.body.ingredients = JSON.parse(req.body.ingredients);
  }

  next();
};
