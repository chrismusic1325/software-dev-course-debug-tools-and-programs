// Debugging Practice: E-Commerce Application
// Summary:
// I used the browser Console to locate errors and the Sources tab to inspect the code.
// I fixed the loop error in calculateTotal, added discount validation,
// added total validation in generateReceipt, and tested edge cases.

const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;

  // Fixed bug: changed <= to < so the loop does not go past the last item.
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price;
  }

  return total;
}

function applyDiscount(total, discountRate) {
  // Fixed bug: added validation for discountRate.
  if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 1) {
    console.error("Invalid discount rate. Discount must be between 0 and 1.");
    return total;
  }

  return total - total * discountRate;
}

function generateReceipt(cartItems, total) {
  // Fixed bug: checked that total is valid before using toFixed().
  if (typeof total !== "number" || isNaN(total)) {
    console.error("Invalid total. Receipt cannot be generated.");
    return "Error: Invalid total.";
  }

  if (cartItems.length === 0) {
    return `Items:
No items in cart.
Total: $${total.toFixed(2)}`;
  }

  let receipt = "Items:\n";

  cartItems.forEach(item => {
    receipt += `${item.name}: $${item.price.toFixed(2)}\n`;
  });

  receipt += `Total: $${total.toFixed(2)}`;
  return receipt;
}

// Main program
console.log("Starting shopping cart calculation...");

const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2);
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal.toFixed(2)}`;
document.getElementById("receipt").textContent = receipt;

// Edge case tests required by the assignment
console.log("Empty cart test:", generateReceipt([], applyDiscount(calculateTotal([]), 0.2)));

const oneItemCart = [{ name: "Mouse", price: 25 }];
console.log("One item cart test:", generateReceipt(oneItemCart, applyDiscount(calculateTotal(oneItemCart), 0.2)));

console.log("Discount rate 0 test:", applyDiscount(100, 0));
console.log("Discount rate 1 test:", applyDiscount(100, 1));

/*
Debugging Tools Summary:
The Console helped show the runtime error caused by trying to read .price from an undefined cart item.
The Sources tab and breakpoints helped inspect calculateTotal, applyDiscount, and generateReceipt.
The debugger strategy made it easier to pause code execution and check variable values.
Testing edge cases helped confirm the corrected program works with an empty cart, one item cart,
discountRate of 0, and discountRate of 1.
*/
