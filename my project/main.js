const BASE_API =  "https://65e864034bb72f0a9c4f2b04.mockapi.io/api/;"
 
// fetch(url, option)

// trong đó:
// option là 1 js object:

// option = {
//     method: 'GET' | 'POST' ...
//     headers: {...}
//     body: ...
//     ...
// }
const getALLPRODUCT =  async () =>{
    const data = await fetch (`${BASE_API}/product`);
    return data.json();
}
const getProductDetail =  async (id) =>{
    const data = await fetch (`${BASE_API}/products/${id}`);
    return data.json();
}
const creatProduct =  async (data) =>{
    console.log({data});
    const res = await fetch (`${BASE_API}/products`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });
    return res.ok;
};
const updateProduct =  async (data) => {};
const deleteProduct =  async (id) =>{
    const res = fetch(`${BASE_API}/products/${id}`,{
        method: "DELETE",
    });
    return res.ok;
};
const handleViewDetail =  async (productID) =>{
    console.log({productDetail});
const productDetail = await getProductDetail(productID);
    console.log({productDetail});


    //hiển thị modal với product detail 

};
const openProductform = () => {
    console.log("add product");
    const productFormDiv = document.querySelector (".product-form");
    productFormDiv.style.display = "block";

    const productListContainerDiv = document.querySelector(
        ".product-list-container"
    );
    productListContainerDiv.style.display = "none";
};

const handleCancelAdd = () => {
    const productFormDiv = document.querySelector(".product-form");
    productFormDiv.style.display = "none";

    const productListContainerDiv = document.querySelector(
        ".product-list-container"
    
    );
    productListContainerDiv.style.display = "block";
};

const handleAdd = async (event) => {
    event.preventDefault();
    const productName = document.getElementById("product-name").value;
    const productType = document.getElementById("product-type").value;
    const price = document.getElementById("product-price").value;
    const productImage = document.getElementById("product-image").value;

    const data = {
        productName,
        productType,
        price,
        productImage,
    };
     
    console.log({data});
    //gọi API create
    const isOK = await createProduct(data);
    console.log({isOK});
    // hiển thị lại list
    //ẩn form 
    // truy cập element có .product-form -->style.display = 'none'
       
};

const handlDelete = async (productId) => {
    //gọi API delete
    const isDeleteOk = await deleteProduct(productId);
    console.log({isDeleteOk});
};

const generateProductCard = (product, index) => {
    return ` 
   <div class='product-card'>
    <h2>${index +1 }</h2>
    <img src='${product.productImage}' alt='product-image' />
    <p>Product Name: ${product.productName}</p>
    <p>Product Type: ${product.productType}</p>
    <p>Price: ${product.price}</p>
    ${product.used ? "<h4>Is Used</h4>" : ""}
    <button onclick='handleViewDetail(${JSON.stringify(
        product.id
    )})'>View Detail</button>
    <button onclick ='handleDelete(${JSON.stringify(
        product.id
    )})'>Delete</button>
    <button>Edit</button>
   </div>

    `;
};


const generateProductCardList = (productList) =>{
    return `
    <div class='product-list-content'>
         ${productList
        .map((product,index) => generateProductCard(product, index))
        .join("")}    
    </div>
    ` ; 
};
//show loading


const productListContainerDiv = document.querySelector(
    ".product-list-container"
);

productListContainerDiv.innerHTML = "<h1>Loading....</h1>";

 getALLProducts()
    .then((data) => {
        //sau khi lấy được danh sách tất cả sản phẩm 
        console.log({data});
        productListContainerDiv.innerHTML = generateProductCardList(data);

    })
    .catch((err) => (productListContainerDiv.innerHTML = `Error:${err}`));




