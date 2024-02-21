let products =[
    {   
        id:1,
        name : "Bold Red Checkered Shirt",
        image : "https://www.zerotonerdy.com/_next/image?url=%2Fcontent%2Fproducts%2Fdresses%2Fshirt.png&w=256&q=75",
        price : 600
    },
    {
        id:2,
        name : "Midnight Charm Black Kurti",
        image : "https://www.zerotonerdy.com/_next/image?url=%2Fcontent%2Fproducts%2Fdresses%2Fkurti-1.png&w=256&q=75",
        price : 550
    },
    {
        id:3,
        name : "Classic Black T-Shirt",
        image : "https://www.zerotonerdy.com/_next/image?url=%2Fcontent%2Fproducts%2Fdresses%2Fostshirt-1.png&w=256&q=75",
        price : 650
    },
    {
        id:4,
        name : "Pretty in Pink Croptop",
        image : "https://www.zerotonerdy.com/_next/image?url=%2Fcontent%2Fproducts%2Fdresses%2Fcroptop-1.png&w=256&q=75",
        price : 700
    },
    {
        id:5,
        name : "Casual Blue Sundress",
        image : "https://www.zerotonerdy.com/_next/image?url=%2Fcontent%2Fproducts%2Fdresses%2Fsundress-1.png&w=256&q=75",
        price : 470
    },
    {
        id:6,
        name : "Casual white T-shirt",
        image : "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=300",
        price : 500
    }

]



const productListingTag = document.querySelector('#products .row');
let cart = [];
let cartTotalprice = 0;

const renderProductList = () => {

    productListingTag.innerHTML = '';

    products.forEach((product) => {

        let cartBtn = `<a class="btn btn-primary addToCart" data-id="${product.id}">Add to cart</a>`;

        cart.forEach(item => {
            if(item.productId == product.id) {
                cartBtn = `<a class="btn btn-primary remove" data-id="${product.id}">-</a> ${item.quantity} <a class="btn btn-primary add" data-id="${product.id}">+</a>`;
            }
        });

        productListingTag.innerHTML += `
            <div class="col-6 col-md-4">
                <div class="card" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price} ₹</p>
                        ${cartBtn}
                    </div>
                </div>
            </div>`;
    });
};

renderProductList();

const handleAddToCart = (id) => {
    cart.push({
        productId: id,
        quantity: 1
    });
    renderProductList();
    renderCart()
};

let addMoreItem = (id)=>{
  cart.forEach((item)=>{
      if(item.productId == id){
        item.quantity++
      }
  })
  renderProductList();
  renderCart()
}

let removeItem = (id)=>{

    cart.forEach((item, index)=>{
        if(item.productId == id && item.quantity > 1){
          item.quantity--
        }else if(item.productId == id && item.quantity == 1){
         cart.splice(index, 1)
        }
    })
    renderProductList();
    renderCart()
  }



const cardBodyTag = document.querySelector('.modal-body')
const mainBtn = document.querySelector('#mainBtn')


let renderCart =()=>{

cardBodyTag.innerHTML="";
cartTotalprice = 0


cart.forEach((item)=>{
    let product = products.find((prod)=>prod.id == item.productId)
    let Totalprice = product.price * item.quantity
     cartTotalprice += Totalprice
     

     cardBodyTag.innerHTML += ` <div class="card mb-3">
     <div class="row g-0">
       <div class="col-md-4">
         <img src="${product.image}" class="img-fluid rounded-start" alt="...">
       </div>
       <div class="col-md-8">
         <div class="card-body">
           <h5 class="card-title">${product.name}</h5>
           <p class="card-text">${product.price} X ${item.quantity}</p>
           <a class="btn btn-primary remove" data-id="${product.id}">-</a> ${item.quantity} <a class="btn btn-primary add" data-id="${product.id}">+</a>
         </div>
       </div>
     </div>
   </div>`
})
document.querySelector('.cartTotal').innerHTML = `Total: ${cartTotalprice} ₹`

const checkOrOrderBtn = document.querySelector('.checkOrOrder');
 if(cart.length !=0){
    checkOrOrderBtn.addEventListener('click', handleCheckOut);
 }
}

const handleCheckOut =()=>{
    mainBtn.innerHTML = `<button type="button" class="btn btn-primary  order">Order</button>`
    cardBodyTag.innerHTML=`<div class="mb-3">
    <label for="fullNameInp" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="fullNameInp" placeholder="Enter your name">
  </div>
  <div class="mb-3">
    <label for="emailInp" class="form-label">Email address</label>
    <input type="email" class="form-control" id="emailInp" placeholder="name@example.com">
  </div>`;

  const orderBtn = document.querySelector('.order')
  orderBtn.addEventListener('click', handleOrder)
}

const handleOrder = ()=>{
    document.querySelector('.modal-footer').style.display = 'none'
     const userName = document.querySelector('#fullNameInp').value
     const userEmail = document.querySelector('#emailInp').value

    cardBodyTag.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </symbol>
    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </symbol>
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>
  <div class="alert alert-success d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    <div>
      <h5>Your order is placed</h5>
      <p>Thank you <strong>${userName}</strong>, your item will be delivered soon! <br>You will get an email to your id <strong>${userEmail}</strong> regarding order process.</p>
    </div>
  </div>`
}

cardBodyTag.addEventListener('click', (event)=>{
    if(event.target.classList.contains('add')){
        const productId = event.target.dataset.id;
        addMoreItem(productId);
    }
    else if(event.target.classList.contains('remove')){
        const productId = event.target.dataset.id;
        removeItem(productId);
    }
})


productListingTag.addEventListener('click', (event) => {
    if (event.target.classList.contains('addToCart')) {
        const productId = event.target.dataset.id;
        document.querySelector('.modal-footer').style.display = 'block'
        mainBtn.innerHTML = `<button type="button" class="btn btn-primary checkOrOrder ">Check out</button>`
        handleAddToCart(productId);
    }
    else if(event.target.classList.contains('add')){
        const productId = event.target.dataset.id;
        addMoreItem(productId);
    }
    else if(event.target.classList.contains('remove')){
        const productId = event.target.dataset.id;
        removeItem(productId);
    }
});


