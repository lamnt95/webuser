const routes = require("next-routes")();

routes.add("postDetail", "/chi-tiet-bai-viet/:id")
routes.add("productDetail", "/chi-tiet-san-pham/:id")
routes.add("product", "/san-pham/:id");

module.exports = routes;
