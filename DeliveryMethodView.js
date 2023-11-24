// DeliveryMethodView.js
class DeliveryMethodView {
  listDeliveryMethods() {
    return fetch('/api/delivery')
    .then(response => response.json())
    .then(data => {
      // 返回配送方式列表
      return data;
    });
  }
}