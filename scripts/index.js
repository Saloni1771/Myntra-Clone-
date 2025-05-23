let bagItems ;

onLoad();

function onLoad() {
  let bagItemStr=localStorage.getItem('bagItems');
  bagItems=bagItemStr?JSON.parse(bagItemStr):[];
  displayItemsOnHomePage();
  displayBagItem();
}

function addToBag(itemId) {
  //add the elements with the defined itemid
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  //call the finction to add the count in the cart element
  displayBagItem();
}

function displayBagItem() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  //count the no. of items added in the bag
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    //if 0 elements added in the cart no value should  be visible in the bag amount
    bagItemCountElement.style.visibility = "hidden";
  }
}
function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".items-container");
  // let item={
  //   item_image:'images/1.jpg',
  //   rating:{
  //     stars:4.5,
  //     noOfReviews:1400
  //   },
  //   company_name:'Carlton London',
  //   item_name:'Rhodium-Plated CZ Floral Studs',
  //   current_price:606,
  //   original_price:1045,
  //   discount_percentage:42
  // }
  //add the html for elements in the items array from items.js file
  if (!itemsContainerElement){
    return;
  }
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `<div class="item-container">
  <img class='item-image' src='${item.image}' alt="item image">
  <div class="rating">
    ${item.rating.stars}⭐| ${item.rating.count}
  </div>
  <div class="company-name"> ${item.company}</div>
  <div class="item-name">${item.item_name}</div>
  <div class="price">
    <span class="current-price">Rs ${item.current_price}</span>
    <span class="original-price">Rs ${item.original_price}</span>
    <span class="discount">(${item.discount_percentage}% OFF)</span>
  </div>
  <button class="btn-add-bag" onclick="addToBag(${item.id});">Add to bag</button>
</div>`;
  });
  itemsContainerElement.innerHTML = innerHTML;
}
