var deliveyFinish = {
  plate: null,
  drink: null,
  dessert:null
}
function countElementInArray(element,array){
  let count = 0;
  array.forEach( item => {
    if(item == element){
      count +=1
    }
  })
  return count;
}
function selectDelivery(element){
  const category = element.getAttribute('data-category');
  const elementByCategorySelected = deliveyFinish[category]
  if ( elementByCategorySelected!== null){
    elementByCategorySelected.classList.remove('selected-delivery')
  }
  element.classList.add('selected-delivery')
  deliveyFinish[category] = element
  checkDeliveryEnable()
}
function checkDeliveryEnable(){
  const deliverySelected = Object.values(deliveyFinish);
  const amountDeliveryNotFill = countElementInArray(null,deliverySelected);
  if (amountDeliveryNotFill === 0){
    const button = document.querySelector("#confirm-delivery")
    button.disabled = false;
    button.innerHTML = "Fechar Pedido"
    return
  }
  document.querySelector("#amount-delivery-not-selected").innerHTML = amountDeliveryNotFill
}
function getTitleCategory(element){
  const childrens = element.children;
  return childrens[1].innerText
}
function getPriceCategory(element){
  const childrens = element.children;
  return childrens[3].children[0].innerText
}
function closeDelivery(){
  document.querySelector("#plate-description").innerHTML = getTitleCategory(deliveyFinish.plate)
  document.querySelector("#plate-price").innerHTML = getPriceCategory(deliveyFinish.plate)
  
  document.querySelector("#drink-description").innerHTML = getTitleCategory(deliveyFinish.drink)
  document.querySelector("#drink-price").innerHTML = getPriceCategory(deliveyFinish.drink)

  document.querySelector("#dessert-description").innerHTML = getTitleCategory(deliveyFinish.dessert)
  document.querySelector("#dessert-price").innerHTML = getPriceCategory(deliveyFinish.dessert) 

  document.querySelector("#delivery-price-total").innerHTML = "R$ " + getPriceTotal()

  document.querySelector(".fullscreen").style.display = 'flex'

}
function cancelDelivery(){
  document.querySelector(".fullscreen").style.display = 'none'

}
function getPriceTotal(){
  const prices = [
    getPriceCategory(deliveyFinish.plate),
    getPriceCategory(deliveyFinish.drink),
    getPriceCategory(deliveyFinish.dessert)
  ]
  let total = 0;
  prices.forEach( price =>{
    const value = parseFloat(price.split("R$")[1].replace(',','.'))
    total = total + value 
  })
  return total.toFixed(2)
}