let bagItemObjects;
//bagItemCountElement.innerText=bagItems.length;
onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}


function loadBagItemObjects(){
  bagItemObjects=bagItems.map(itemId=>{
    for(let i=0;i<items.length;i++){
      if (itemId==items[i].id){
        return items[i];
      }
    }
  });
}
function displayBagSummary(){
  let bagSummaryElement= document.querySelector('.bag-summary');
  let totalItems=bagItemObjects.length;
  let totalMRP =0;
  let totalDiscount=0;
  let convenienceFees=99
  bagItemObjects.forEach(bagItem=>{
    totalMRP+=bagItem.original_price;
    totalDiscount+=bagItem.original_price-bagItem.current_price;
  })
  let finalPayment=totalMRP-totalDiscount+convenienceFees;
  bagSummaryElement.innerHTML=`<div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
        <div class="price-item">
          <span class="price-item-tag">Total MRP</span>
          <span class="price-item-value">Rs${totalMRP}</span>
        </div>
        <div class="price-item">
          <span class="price-item-tag">Discount on MRP</span>
          <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
        </div>
        <div class="price-item">
          <span class="price-item-tag">Convenience Fee</span>
          <span class="price-item-value">Rs ${convenienceFees}</span>
        </div>
        <hr>
        <div class="price-footer">
          <span class="price-item-tag">Total Amount</span>
          <span class="price-item-value">Rs ${finalPayment}</span>
        </div>
      </div>
      <button class="btn-place-order">
        <div class="css-xjhrni">PLACE ORDER</div>
      </button>`
}
function displayBagItems() {
  
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML='';
  bagItemObjects.forEach(element => {
    innerHTML+=generateItemHTML(element);
    
  });
  containerElement.innerHTML=innerHTML;
  
}
function removeFromBag(itemId){
  bagItems=bagItems.filter(bagItemId=>bagItemId!=itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemObjects();  
  displayBagItem();
  displayBagItems();
  displayBagSummary();
}

function generateItemHTML(item){
return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src='../${item.image}' alt='product image'>
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
    </div>  
    <div class="price-container">
      <span class="current-price">Rs ${item.current_price}</span>
      <span class="original-price">Rs ${item.original_price}</span>
      <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
    </div>
    <div class="return-period">
      <span class="return-period-days">${item.return_period} days</span> return available        
    </div>
    <div class="delivery-details">Delivery by
      <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
    <div class="remove-from-cart" onclick='removeFromBag(${item.id})'>X</div>
    </div>`;

}

