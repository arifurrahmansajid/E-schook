const cards = document.querySelectorAll(".card");

const cartItems = [];
let totalCost = 0;

for (let i = 0; i < cards.length; i++) {
  const currentCard = cards[i];

  const btn = currentCard.querySelector("button");
  const price_text = currentCard.querySelector("strong").textContent;
  const img = currentCard.querySelector("img").src
  const title = currentCard.querySelector("h2").textContent;

  const price_string = price_text.split(" ")[1];
  const price = parseFloat(price_string);

  btn.addEventListener("click", function () {
    const item = {
      title,
      img,
      price
    }

    const isFoundIdx = cartItems.findIndex((singleCartItem) => {
      return singleCartItem.title == title;
    })

    console.log(isFoundIdx < 0 ? "NOT FOUND" : "FOUND")

    if (isFoundIdx < 0) {
      item.quantity = 1;
      cartItems.push(item);
    } else {
      cartItems[isFoundIdx].quantity++;
    }

    totalCost = totalCost + price;
    generateCartItems();

  })
}

function generateCartItems() {
  const pageRight = document.querySelector(".page-right");
  pageRight.innerHTML = "";

  const totalPriceElement = `
          <section>
            <strong> Sub-Total : ${totalCost} TK</strong>
          </section>
  `
  pageRight.innerHTML += totalPriceElement;

  for (let i = 0; i < cartItems.length; i++) {
    const singleItem = cartItems[i];
    const singleCart = `
          <section class="cart-item">
            <section class="flex flex-between pe-1">
              <figure class="cart-figure">
                <img
                  class="cart-img"
                  src="${singleItem.img}"
                  alt="Rectangle 25"
                />
                <article>
                  <h3 class="pb-0 mb-0">${singleItem.title}</h3>
                </article>
              </figure>
              <article class="flex w-50 flex-between">
                <div>
                  <p>Unit Price</p>
                  <p><strong>${singleItem.price}</strong></p>
                </div>
                <div>
                  <p>Quantity</p>
                  <p><strong>${singleItem.quantity}</strong></p>
                </div>
              </article>
            </section>
            <article class="text-center cart-total-btn">
              <p class="p-0 m-0"><strong>Total: ${(singleItem.price * singleItem.quantity).toFixed(2)} BDT</strong></p>
            </article>
          ` 
          pageRight.innerHTML = pageRight.innerHTML + singleCart;
  }
}