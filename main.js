
const form=document.getElementById("form");

form.addEventListener("submit",onSumbit);

function onSumbit(e){
  e.preventDefault();
  const price=document.getElementById("price").value;
  const product=document.getElementById("product").value;
  const select1=document.getElementById("select1").value;

  let obj={
    price,
    product,
    select1

  }


  axios.post("https://crudcrud.com/api/f8c0258cdd7d4b63a3176fbc5ad804e6/apointmentdata",obj)
  .then((response)=>{
   //   console.log(response.data);
   display_details(response.data)

  })
   .catch((err)=>{
     console.log(err);
   })
}


 async function display_details(){
   const electronics_items=document.getElementById("electronics_items");
   const Food_items=document.getElementById("Food_items");
   const skin_items=document.getElementById("skin_items");
   const Electronics=document.getElementById("Electronics");
   const select1=document.getElementById("select1");
   const Food=document.getElementById("Food");
   const Skin=document.getElementById("Skin");

   electronics_items.innerHTML="";
   Food_items.innerHTML="";
   skin_items.innerHTML="";

    const response=await axios.get("https://crudcrud.com/api/f8c0258cdd7d4b63a3176fbc5ad804e6/apointmentdata");
    const orders=response.data;
    for(let i=0;i<orders.length;i++){
        const order=orders[i];

        const li=document.createElement("li");
        li.id="li";
        const deletebtn=document.createElement("button")
        deletebtn.id="deletebtn";
        deletebtn.innerText="Delete Order"

        deletebtn.onclick=(async()=>{
         await axios.delete(`https://crudcrud.com/api/f8c0258cdd7d4b63a3176fbc5ad804e6/apointmentdata/${order._id}`)
         if(order.select1==Electronics.value){
             electronics_items.removeChild(li);
         }
         else if(order.select1==Food.value){
             Food_items.removeChild(li);
         }
         else{
             skin_items.removeChild(li);
         }
          
        })

        if(order.select1==Electronics.value){
         electronics_items.appendChild(li);
     }
     else if(order.select1==Food.value){
         Food_items.appendChild(li);
     }
     else{
         skin_items.appendChild(li);
     }
   //   li.textContent=order.price+"_"+order.product+"_"+order.select1
     li.textContent=` Price:-${order.price}     ,Product Name:-${order.product}      , Select Type:-${order.select1}`
     li.appendChild(deletebtn);
 }
        
}
document.addEventListener("DOMContentLoaded",()=>{
   display_details();
})

 
