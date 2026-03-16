import React, { useState } from 'react'
import { API_URL } from '../data/apiPath'

const AddProduct = () => {

  const [productName,setProductName] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState([]);
  const [bestseller,setBestseller] = useState(false);
  const [description,setDescription] = useState("");
  const [image,setImage] = useState(null);

  // CATEGORY
  const handleCategoryChange = (event) => {
    const value = event.target.value;

    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value));
    }else{
      setCategory([...category,value]);
    }
  }

  // BEST SELLER
  const handleBestSeller = (event) => {
    const value = event.target.value === "true";
    setBestseller(value);
  }

  // IMAGE UPLOAD
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  }

  // ADD PRODUCT
  const handleAddProduct = async (e) => {

    e.preventDefault();

    try{

      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if(!loginToken || !firmId){
        console.error("user not authenticated");
        alert("Please login and add firm first");
        return;
      }

      const formData = new FormData();

      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('description',description);
      formData.append('bestSeller',bestseller);
      formData.append('image',image);

      category.forEach((value)=>{
        formData.append('category',value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        headers:{
          'token':loginToken
        },
        body:formData
      });

      const data = await response.json();

      if(response.ok){

        alert("Product added successfully");

        setProductName("");
        setPrice("");
        setCategory([]);
        setBestseller(false);
        setDescription("");
        setImage(null);
      } else {
        alert(data.message || "adding product failed");
      }

    }catch(error){

      console.error("adding product failed");
      alert("adding product failed");

    }

  }

  return (

<div className="firmSection">

<form className="tableForm" onSubmit={handleAddProduct}>

<h2>Add Product</h2>

<label>Product Name</label>
<input
type="text"
value={productName}
onChange={(e)=>setProductName(e.target.value)}
placeholder="Enter product name"
/>

<label>Price</label>
<input
type="text"
value={price}
onChange={(e)=>setPrice(e.target.value)}
placeholder="Enter price"
/>

<label>Category</label>

<div className="inputsContainer">

<div className="checkboxContainer">
<label>Veg</label>
<input
type="checkbox"
value="veg"
checked={category.includes('veg')}
onChange={handleCategoryChange}
/>
</div>

<div className="checkboxContainer">
<label>Non-Veg</label>
<input
type="checkbox"
value="non-veg"
checked={category.includes('non-veg')}
onChange={handleCategoryChange}
/>
</div>

</div>

<div className="checkInp">

<label>Best Seller</label>

<div className="inputsContainer">

<div className="checkboxContainer">
<label>Yes</label>
<input
type="radio"
value="true"
checked={bestseller === true}
onChange={handleBestSeller}
/>
</div>

<div className="checkboxContainer">
<label>No</label>
<input
type="radio"
value="false"
checked={bestseller === false}
onChange={handleBestSeller}
/>
</div>

</div>

</div>

<label>Description</label>
<input
type="text"
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Enter description"
/>

<label>Product Image</label>
<input
type="file"
onChange={handleImageUpload}
/>

<div className="btnSubmit">
<button type="submit">Submit</button>
</div>

</form>

</div>

  )
}

export default AddProduct
