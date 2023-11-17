//管理員身份
export function renderManagerHeader(container, cartItems) {
  container.innerHTML = `
  <header style="width:100%; height:70px; display:flex; justify-content:space-between; padding:0 3rem;">
    <h4>BuyGo</h4>    
    <ul style="display:flex; align-items:center;gap:1rem;">
      <li class="main-page">商品頁面</li>      
      <li class="cart-page">購物車 (<span style="color:red;">${cartItems}</span>)</li>
      <li class="order-page">查看訂單</li>
      <li class="manage-page">管理商品</li>
    </ul>
    <button class="logout">登出</button>
  <header>  
  `;
}
//使用者身份, page:main, order, carts, cartItems:number
export function renderUserHeader(container, cartItems) {
  container.innerHTML = `
  <header style="width:100%; height:70px; display:flex; justify-content:space-between; padding:0 3rem;">
  <h4>BuyGo</h4>    
  <ul style="display:flex; align-items:center;gap:1rem;">
    <li class="main-page">商品頁面</li>      
    <li class="cart-page">購物車 (<span style="color:red;">${cartItems}</span>)</li>
    <li class="order-page">查看訂單<li>
  </ul>
  <button class="logout">登出</button>
<header>  
  `;
}
