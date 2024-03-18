// Global variables
const BASE_API = "https://65f199dc034bdbecc76322ae.mockapi.io/api";
const contentDiv = document.querySelector(".content"); // k có, trả về null
const createFormDiv = document.querySelector(".create-form"); // k có, trả về null
const editFormDiv = document.querySelector(".edit-form"); // k có, trả về null
const detailModalDiv = document.querySelector(".detail-modal"); // k có, trả về null

const addProductButton = document.getElementById("add-product-button");

// Product APIs
const getAllProduct = async () => {
  const res = await fetch(`${BASE_API}/products`);
  return res.json();
};
const getProductById = (productId) => {};
const createProduct = async (newProduct) => {
  const res = await fetch(`${BASE_API}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  return res.ok;
};
const editProduct = (updatedProduct) => {};
const deleteProduct = (id) => {};

// PRODUCT FEATURES
const generateProductCard = (product, index) => {
  return `
        <div class='product-card'>
            <h2 class='product-index'>${index}</h2>
            <hr />
            <img class='product-image' src='${product.productImage}' />
            <p>Name: ${product.productName}</p>
            <p>Type: ${product.productType}</p>
            <p>Price: ${product.productPrice}</p>
            <div class='actions'>
                <button>View Detail</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    `;
};

const displayProductList = async () => {
  contentDiv.innerHTML = "<h1>Loading...</h1>";
  const productList = await getAllProduct();
  console.log({ productList });
  if (productList.length > 0) {
    contentDiv.innerHTML = `
        <div class='product-list'>
            ${productList.map((product, index) =>
              generateProductCard(product, index)
            )}
        </div>
      `;
  } else {
    contentDiv.innerHTML = "<h1>No Product</h1>";
  }
};

const showCreateProductForm = () => {
  contentDiv.innerHTML = "";
  createFormDiv.style.display = "block";
};

const handleCancelAdd = () => {
  // clear current form values
  createFormDiv.style.display = "none";
};

const handleAddProduct = async (event) => {
  event.preventDefault();

  // get form data
  const productName = document.getElementById("product-name").value;
  const productType = document.getElementById("product-type").value;
  const productPrice = document.getElementById("product-price").value;
  const productImage = document.getElementById("product-image").value;
  const isUsed = document.getElementById("is-used").checked;
  const countInStock = document.getElementById("count-in-stock").value;
  const discount = document.getElementById("discount").value;

  const newProduct = {
    productName,
    productType,
    productPrice,
    productImage,
    isUsed,
    countInStock,
    discount,
  };

  console.log({ newProduct });

  // call create-product api
  const isCreated = await createProduct(newProduct);

  if (!isCreated) {
    const errorStatus = document.createElement("h2");
    errorStatus.innerText = "Create Failed";
    errorStatus.style.color = "red";
    createFormDiv.appendChild(errorStatus);
  } else {
    // reload the page when creating succefully
    location.reload();
  }
};

displayProductList();