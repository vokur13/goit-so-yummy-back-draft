const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const recipesPath = path.join(__dirname, 'recipes_copy.json');

const getAll = async () => {
  const data = await fs.readFile(recipesPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const recipes = await getAll();
  const result = recipes.find((item) => item._id.$oid === id);
  return result || null;
};

const getByCategory = async (category) => {
  console.log('category', category);
  const recipes = await getAll();
  const result = recipes.filter((item) => item.category === category);
  console.log(result.length);
  return result || null;
};

const add = async (data) => {
  const recipes = await getAll();
  const newRecipe = {
    id: nanoid(),
    ...data,
  };
  recipes.push(newRecipe);
  await fs.writeFile(recipesPath, JSON.stringify(recipes, null, 2));
  return newRecipe;
};

const deleteById = async (id) => {
  const recipes = await getAll();
  const index = recipes.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = recipes.splice(index, 1);
  await fs.writeFile(recipesPath, JSON.stringify(recipes, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  // updateById,
  deleteById,
  getByCategory,
};
