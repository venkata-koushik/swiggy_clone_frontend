import { useState } from 'react'
import {API_URL} from '../../data/apiPath'

const AddFirm = ({ onFirmAdded, onAuthExpired }) => {
    const [firmName,setFirmName]=useState("");
    const [area,setArea]=useState("");
    const [category,setCatogery]=useState([]);
    const [region,setRegion]=useState([]);
    const [offer,setOffer]=useState("");
    const [file,setFile]=useState(null);

    const handleImageUpload =(event)=>{
       const selectedImage = event.target.files[0];
       setFile(selectedImage)

          }

   const handleCatogeryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCatogery(category.filter((item)=>item !==value))
    }else{
      setCatogery([...category,value]);
    }
   }
     const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !==value))
    }else{
      setRegion([...region,value])
    }
   }
      
    const handleFirmSubmit=async(e)=>{
       e.preventDefault();
       try{
    const loginToken=localStorage.getItem('loginToken');
    if(!loginToken){
     console.error("user not authenticated")
      alert("please login first");
      if(onAuthExpired){
        onAuthExpired();
      }
      return;
    }
    const formData=new FormData();
    formData.append('firmName',firmName);
    formData.append('area',area);
    formData.append('offer',offer);

    category.forEach((value)=>{
     formData.append('category', value);
     });
      region.forEach((value)=>{
     formData.append('region', value);
     });
    if(file){
      formData.append('image',file);
    }
     
    const response=await fetch(`${API_URL}/firm/add-firm`,{
       method:'POST',
       headers:{
        Authorization: `Bearer ${loginToken}`
       },
       body:formData

      });
      const data= await response.json();
      if(response.ok){
       console.log(response);
        setFirmName("");
            setArea("")
            setCatogery([]);
            setRegion([]);
            setOffer("");
            setFile(null)
       alert('Firm added sucessfully');
       if(data.firmId){
        localStorage.setItem('firmId',data.firmId);
       }
       if(firmName){
        localStorage.setItem('firmName', firmName);
       }
       if(onFirmAdded){
        onFirmAdded();
       }
      }else if(response.status === 401){
        localStorage.removeItem('loginToken');
        localStorage.removeItem('firmId');
        localStorage.removeItem('firmName');
        alert(data.error || "Session expired. Please login again");
        if(onAuthExpired){
          onAuthExpired();
        }
      }else if(data.message === "vendor can have only one firm"){
         alert("firm exisit only 1 firm can be added");
      }else{
        alert(data.message || 'failed to add firm');
      }
    }catch(_error){
          console.error("adding firm falied");
          alert("adding firm  falied");
       }
    }   

    const handleFirmImageUpdate = async () => {
      try {
        const loginToken = localStorage.getItem('loginToken');
        const firmId = localStorage.getItem('firmId');

        if (!loginToken) {
          alert("please login first");
          if (onAuthExpired) {
            onAuthExpired();
          }
          return;
        }

        if (!firmId) {
          alert("No firm found. Please add a firm first.");
          return;
        }

        if (!file) {
          alert("Please choose an image first");
          return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_URL}/firm/${firmId}/image`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${loginToken}`
          },
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          alert("Firm image updated successfully");
          setFile(null);
        } else if (response.status === 401) {
          localStorage.removeItem('loginToken');
          localStorage.removeItem('firmId');
          localStorage.removeItem('firmName');
          alert(data.error || "Session expired. Please login again");
          if (onAuthExpired) {
            onAuthExpired();
          }
        } else {
          alert(data.error || data.message || "failed to update image");
        }
      } catch (_error) {
        console.error("firm image update failed");
        alert("firm image update failed");
      }
    };
     
  return (
 <div className="firmSection">
    <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h2>Add Frim</h2>
         <label>Firm Name</label>
               <input type='text'name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)} placeholder='enter your Frim name'/>
          <label>Area</label>
               <input type='text'name="area" value={area} onChange={(e)=>setArea(e.target.value)} placeholder='enter area that is present'/>
          {/* <label>category</label>
               <input type='text' placeholder='enter your category'/> */}
         <div className="checkInp">
              <label >Category</label>
                    <div className="inputsContainer">
                         <div className="checkboxContainer">
                         <label>Veg</label>
                         <input type='checkbox' checked={category.includes('veg')} value='veg' onChange={handleCatogeryChange}/>
                    </div>
                     <div className="checkboxContainer">
                         <label>Non-Veg</label>
                         <input type='checkbox' checked={category.includes('non-veg')} value='non-veg'  onChange={handleCatogeryChange} />
                    </div>
                    </div>
          </div> 

        
        
        <label >Offer</label>
                <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
    <div className="checkInp">
      <label >Region</label>
          <div className="inputsContainer">
          <div className="regBoxContainer">
                  <label>South Indian</label>
                  <input type="checkbox" value='south-indian'   checked ={region.includes('south-indian')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>North-Indian</label>
                  <input type="checkbox" value='north-indian'  checked ={region.includes('north-indian')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Chinese</label>
                  <input type="checkbox" value='chinese' checked ={region.includes('chinese')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Bakery</label>
                  <input type="checkbox" value='bakery' checked ={region.includes('bakery')}
                  onChange={handleRegionChange}
                  />
                </div>
          </div>

    </div>

        <label >Firm Image</label>
                <input type="file" onChange={handleImageUpload} />
                <br />
            <div className="btnSubmit">
        <button type='submit'>Submit</button>
    </div> 
    <div className="btnSubmit" style={{ marginTop: "10px" }}>
        <button type='button' onClick={handleFirmImageUpdate}>Update Image Only</button>
    </div>
    </form>
 </div>


  )
}


export default AddFirm
