import category from "./category"
import product from "./product"
import cart from "./cart"
import promotion from "./promotion"

export default {
  ...category,
  ...product,
  ...cart,
  ...promotion
}