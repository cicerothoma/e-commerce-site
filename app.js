const menu = [
  {
    id: 1,
    title: "sazerac",
    price: 7500,
    category: "whiskey",
    img: "img/sazerac.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 2,
    title: "budweiser",
    price: 1500,
    category: "beer",
    img: "img/budweiser.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 3,
    title: "Barista Pinotage",
    price: 12500,
    category: "wine",
    img: "img/barista.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 4,
    title: "Jameson",
    price: 10500,
    category: "whiskey",
    img: "img/jameson.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 5,
    title: "Corona Extra",
    price: 900,
    category: "beer",
    img: "img/corona.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 6,
    title: "Bogle Chardonnay",
    price: 19500,
    category: "wine",
    img: "img/bogle.jpg",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },

  {
    id: 7,
    title: "Jack Daniels",
    price: 17500,
    category: "whiskey",
    img: "img/jack.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 8,
    title: "Heineken",
    price: 1000,
    category: "beer",
    img: "img/heineken.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 9,
    title: "Alamos Malbec",
    price: 20500,
    category: "wine",
    img: "img/alamos.jpg",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },

  {
    id: 10,
    title: "Glenfiddich",
    inCart: 0,
    price: 7500,
    category: "whiskey",
    img: "img/glen.webp",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },

  {
    id: 11,
    title: "Bench Creek",
    price: 1500,
    category: "beer",
    img: "img/bench.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },

  {
    id: 12,
    title: "Cote des Roses Rose",
    price: 10500,
    category: "wine",
    img: "img/cote.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 13,
    title: "Glenmorangie",
    price: 17500,
    category: "whiskey",
    img: "img/glenmor.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 14,
    title: "Dibon Cava Reserve Brut",
    price: 17500,
    category: "wine",
    img: "img/wine1.jpg",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
  {
    id: 15,
    title: "Seaglass Pinot Noir",
    price: 4500,
    category: "wine",
    img: "img/seaglass.png",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,dolores",
    inCart: 0,
  },
];

const mainSection = document.querySelector(".main-section");
const btnContainer = document.querySelector(".filter-btn");

window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

// FUNCTION TO DISPLAY MENU ITEMS
function displayMenuItems(menuItems) {
  let menuDisplay = menuItems.map(function (item) {
    return `  <div class="menu-item">
        <img src="${item.img}" alt="" />

        <div class="item-info">
          <h2 class="item-name">${item.title}</h2>
          <h2 class="price">&#8358;${item.price}</h2>
          <p>
		  ${item.desc}
          </p>
          <p class="cart-btn" id="add-cart">Add to Cart</p>
        </div>
      </div>  `;
  });
  menuDisplay = menuDisplay.join("");
  mainSection.innerHTML = menuDisplay;

  const carts = document.querySelectorAll(".cart-btn");

  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(menu[i]);
      totalCost(menu[i]);
    });
  }
}

//MAKE THE CART STAY UPDATED
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector("#cartLogo").textContent = productNumbers;
  }
}

// FUNCTION FOR LOCAL STORAGE
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  //convert product numbers from string to numbers
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#cartLogo").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector("#cartLogo").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.title] == undefined) {
      cartItems = {
        ...cartItems,
        [product.title]: product,
      };
    }

    cartItems[product.title].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.title]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//FUNCTION TO CALCULATE TOTAL COST
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", (cartCost += product.price));
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

//FUNCTION TO DISPLAY CART
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".product-container");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product-item">

        <div class="product">
          <img src="${item.img}" />
        </div>

        <div class="product-detail">
          <h2 class="item-name">${item.title}</h2>

          <div class="price">&#8358;${item.price}.00</div>

          <div class="quantity">
            <ion-icon class="increase" name="add-circle-outline"></ion-icon>
            <p>${item.inCart}</p>
            <ion-icon
              class="decrease"
              name="remove-circle-outline"
            ></ion-icon>
          </div>
      </div>
    </div>
      `;
    });

    productContainer.innerHTML += `
    <div class="basketTotal">
      Total:<h2 >&#8358;${cartCost}.00</h2>
    </div>
    `;
  }
}

//FUNCTION TO DISPLAY FILTER BUTTONS
function displayMenuButtons() {
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const categoryBtns = categories
    .map(function (category) {
      return `
      <button class="filter-btn" type="button" data-id="${category}">${category}</button>
    `;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll(".filter-btn");

  // FILTER FUNCTION
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        // console.log(menuItem.category);
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      // console.log(menuCategory)
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}

//FUNCTION FOR NAV-BAR
// document.addEventListener("DOMContentLoaded", () => {
//   // Get all "navbar-burger" elements
//   const $navbarBurgers = Array.prototype.slice.call(
//     document.querySelectorAll(".navbar-burger"),
//     0
//   );

//   // Check if there are any navbar burgers
//   if ($navbarBurgers.length > 0) {
//     // Add a click event on each of them
//     $navbarBurgers.forEach((el) => {
//       el.addEventListener("click", () => {
//         // Get the target from the "data-target" attribute
//         const target = el.dataset.target;
//         const $target = document.getElementById(target);

//         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//         el.classList.toggle("is-active");
//         $target.classList.toggle("is-active");
//       });
//     });
//   }
// });

displayCart();
onLoadCartNumbers();
