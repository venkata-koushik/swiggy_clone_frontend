import { useEffect, useState } from 'react'
import { API_URL } from '../data/apiPath'

const AllProducts = () => {
    const [products,setProducts]=useState([]);

    const productsHandler=async()=>{
            const firmId=localStorage.getItem('firmId');
            if(!firmId){
                alert("Please add firm first");
                return;
            }
            console.log("firmId:", firmId);
            try{
                const  response=await fetch(`${API_URL}/product/${firmId}/products`);   
                    const newProductsData=await response.json()
                    setProducts(newProductsData.products || []);
                    console.log(newProductsData.products);

                }catch(error){
                alert("internal server error in the allproducts.jsx");
                console.log(error);
            }
    }

    useEffect(()=>{
     productsHandler();
     console.log('this is useeffect');

    },[]);

    const deleteProduct=async(productId)=>{
    try{
        const loginToken=localStorage.getItem('loginToken');
        const response=await fetch(`${API_URL}/product/${productId}`,{
          method:'DELETE',
          headers:{
            token:loginToken
          }
        })
        if(response.ok){
          setProducts((prevProducts)=>prevProducts.filter(product =>product._id !== productId));
          console.log('product delte successfull');
          alert("product deleted successfully");
        }else{
          alert("failed to delete product");
        }
    }catch(_error){
            console.log('falied to delte product');
            alert("failde t delte the product");

        }
    }

  return (
    <div className='productListSection'>
       {products.length === 0 ? (
       <p className='emptyProductsMsg'>No products added till now</p>
       ):  (
          <div className='productTableWrapper'>
            <table className='product-table'>
            <thead>
                <tr className='productTableHeadRow'>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>{
                    return (
                    
                    <tr key={item._id}>
                                <td>{item.productName}</td>
                                 <td className='productPriceCell'>Rs. {item.price}</td>
                                <td>
                                    {item.image && (
                                        <img src={`${API_URL}/uploads/${item.image}`} 
                                        alt={item.productName}
                                        className='productThumb'/>
                                    )}
                                </td>
                                  <td>
                                    <button
                                      className='deleteProductBtn'
                                      onClick={()=>deleteProduct(item._id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                            </tr>
                       
                    )
                })}
            </tbody>
           </table>
          </div>
       ) 
     }
 
       
    </div>
  )
}

export default AllProducts
