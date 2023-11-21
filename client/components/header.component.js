//管理員身份
export function renderManagerHeader() {
  const header = `
  <header style="width:100%; display:flex; justify-content:space-between; border:1px solid #000; align-items=center; padding: 1rem 2rem; height:50px; position:fixed; top:0; left:0; right:0; background-color:green;">
    <div style="width:50%; ">
      <h4 style="text-align=center;">BuyGo</h4>  
    </div>
    <div style="width:50%; display:flex; gap:1rem; justify-content:flex-end">  
      <nav style="display:flex; align-items:center;gap:1rem;">
        <span class="order-page">訂單管理</span>
        <span class="manage-page">商品管理</span>
      </nav>
      <button class="logout">登出</button>
    </div>
  <header>  
  `;
  return header;
}
//使用者身份, page:main, order, carts, cartItems:number
export function renderUserHeader() {
  const header = `
  <header style="width:100%; display:flex; justify-content:space-between; border:1px solid #000; align-items=center; padding: 1rem 2rem; height:50px; position:fixed; top:0; left:0; right:0;background-color:green;">
    <div style="width:50%; ">
      <h4 style="text-align=center;">BuyGo</h4>  
    </div>
    <div style="width:50%; display:flex; gap:1rem; justify-content:flex-end; align-items:center;">  
      <nav style="display:flex; align-items:center;gap:1rem;">
      <span class="order-page">商品頁面</span>        
      <span class="manage-page">訂單紀錄</span>
      <span class="order-page">編輯個人資料</span>        
      </nav>
      <button class="logout" style="width:70px;height:25px; ">登出</button>
    </div>
  <header>  
  `;
  return header;
}
