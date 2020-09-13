import category from "./category"
import product from "./product"
import cart from "./cart"
import promotion from "./promotion"
import postIntro from "./postIntro"

export default {
  ...category,
  ...product,
  ...cart,
  ...promotion,
  ...postIntro
}