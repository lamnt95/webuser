import _ from 'lodash'

function addProduct(product = {}, productState = []) {
  const productKeyBy = _.keyBy([product], "productId") || {}
  const productStateKeyBy = _.keyBy(productState, "productId") || {};
  const productStateNew = { ...productStateKeyBy, ...productKeyBy };
  const productDetails = _.values(productStateNew);
  return productDetails;
}

function removeProduct(productId = "", productState = []) {
  const productDetails = _.filter(productState, i => i.productId !== productId);
  return productDetails;
}

function getQuantity(productsKeyBy, id) {
  return _.get(productsKeyBy, `${id}.productQuantity`)
}

function mapPriceProduct(products, productsWithQuantity) {
  const productsKeyBy = _.keyBy(productsWithQuantity, "productId")
  return _.map(products, i => ({
    productId: i.id,
    name: i.name,
    code: i.code,
    price: i.price,
    quantity: getQuantity(productsKeyBy, i.id),
    image: i.image
  }))
}

export default {
  addProduct,
  mapPriceProduct,
  removeProduct
}