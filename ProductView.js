// ProductView.js
class ProductView {
  listProducts() {
    return fetch('/api/products')
    .then(response => response.json())
    .then(data => {
      // 返回产品列表
      return data;
    });
  }
}
