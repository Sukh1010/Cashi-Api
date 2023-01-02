import Category from "../models/categoryModel.js";

async function getcategory(req, res) {
  try {
    let data = await Category.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getcategoryById(req, res) {
  try {
    let { id } = req.params;
    let data = await Category.findById(id);
    res.status(200).send({ status: "success", data, response: 200 });
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

async function createcategory(req, res) {
  try {
    let data = await Category.create(req.body);

    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

async function updatecategory(req, res) {
  try {
    let { id } = req.params;
    let data = await Category.findByIdAndUpdate(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

async function deletecategory(req, res) {
  try {
    let { id } = req.params;
    let data = await Category.findByIdAndRemove(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

export {
  getcategory,
  getcategoryById,
  createcategory,
  updatecategory,
  deletecategory,
};
