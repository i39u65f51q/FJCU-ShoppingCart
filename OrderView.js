// OrderView.js
class OrderView {
  listOrders(memberId) {
    return fetch(`/api/order/${memberId}`)
    .then(response => response.json())
    .then(data => {
      // 返回订单列表
      return data;
    });
  }

  createOrder(orderData) {
    return fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
      // 返回创建订单结果
      return data;
    });
  }
}
