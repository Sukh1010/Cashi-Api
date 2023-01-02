import Product from "../models/productModel.js";
import cloudinary from "cloudinary";
// import ApiFeatures from "../utils/apifeature.js";

async function getproducts(req, res, next) {
  const sort = {};
  // const resultPerPage = 3;
  let data = await Product.find()
    .populate("category")
    .limit(req.query.limit || 3)
    .skip(req.query.page || 0);

  if (req.query.sortBy && req.query.createdAt) {
    sort[req.query.sortBy] = req.query.createdAt === "desc" ? -1 : 1;
  }
  try {
    // let count = await Product.find().countDocuments();

    // const apiFeature = new ApiFeatures(Product.find(), req.query)
    //   .search()
    //   .filter()
    //   .pagination(resultPerPage);
    // const products = await apiFeature.query;
    //  res.status(200).json(data);
    res.status(200).send({
      status: "success",
      message: "Successfully fetch data!",
      // count,
      data,
      // products,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//http://localhost:9000/api/products --get
//how to use filter-inparams-- type-price[gt]and price[lt], value-1000, value13000 --send/get
//how to use search-inparams-- type-keyword, value-samosa --send/get
//how to use page-inparams//localhost:9000/api/users?page=1&limit=5

async function getproductById(req, res) {
  try {
    let { id } = req.params;
    let data = await Product.findById(id);
    res.status(200).send({
      status: "success",
      message: "Successfully fetch data!",
      data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function createproduct(req, res) {
  try {
    const file = req.files.image;
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      async function (error, { url }) {
        req.body.image = url ? url : "";
        let data = await Product.create(req.body);
        res.status(200).send({
          status: "success",
          message: "Successfully fetch data!",
          data,
        });
      }
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateproduct(req, res) {
  try {
    let { id } = req.params;
    let data = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      status: "success",
      message: "Successfully fetch data!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// delete

async function deleteproduct(req, res) {
  try {
    let { id } = req.params;
    let data = await Product.findByIdAndRemove(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export {
  getproducts,
  getproductById,
  createproduct,
  updateproduct,
  deleteproduct,
};
