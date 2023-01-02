import Transaction from "../models/transactionModel.js";
import ApiFeatures from "../utils/apifeature.js";

async function gettransaction(req, res) {
  const resultPerPage = 3;
  let data = await Transaction.find();
  try {
    const apiFeature = new ApiFeatures(Transaction.find(), req.query)
      .search()
      .pagination(resultPerPage);
    const transactions = await apiFeature.query;
    res.status(200).send(transactions);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function gettransactionById(req, res) {
  try {
    let { id } = req.params;
    let data = await Transaction.findById(id);
    res.status(200).send({ status: "success", data, response: 200 });
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

async function createtransaction(req, res) {
  let requestBody = req.body;
  requestBody.products = requestBody.items;
  try {
    let data = await Transaction.create(req.body);

    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

async function updatetransaction(req, res) {
  try {
    let { id } = req.params;
    let data = await Transaction.findByIdAndUpdate(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

async function deletetransaction(req, res) {
  try {
    let { id } = req.params;
    let data = await Transaction.findByIdAndRemove(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message) || "Something error!";
  }
}

export {
  gettransaction,
  gettransactionById,
  createtransaction,
  updatetransaction,
  deletetransaction,
};
