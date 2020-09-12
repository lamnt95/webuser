import _ from 'lodash'

function addProduct(product = {}, productState = []) {
  const productKeyBy = _.keyBy([product], "productId") || {}
  const productStateKeyBy = _.keyBy(productState, "productId") || {};
  const productStateNew = { ...productStateKeyBy, ...productKeyBy };
  const productDetails = _.values(productStateNew);
  return productDetails;
}

function getQuantity(productsKeyBy, id) {
  return _.get(productsKeyBy, `${id}.productQuantity`)
}

function getRealPrice(item) {
  return item.priceAfterPromotion ? item.priceAfterPromotion : item.price
}

function mapPriceProduct(products, productsWithQuantity) {
  const productsKeyBy = _.keyBy(productsWithQuantity, "productId")
  return _.map(products, i => ({
    id: i.id,
    name: i.name,
    code: i.code,
    realPrice: getRealPrice(i),
    priceAfterPromotion: i.priceAfterPromotion,
    price: i.price,
    quantity: getQuantity(productsKeyBy, i.id),
    totalPrice: getQuantity(productsKeyBy, i.id) * getRealPrice(i)
  }))
}

export default {
  addProduct,
  mapPriceProduct
}