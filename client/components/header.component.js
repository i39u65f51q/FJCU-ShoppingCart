//管理員身份
export function renderManagerHeader(container) {
  container.innerHTML = `
        <div>
            <header style="width:100%; height:70px; position:fixed; top:0; left:0; right:0; border:1px solid red;">Manager</header>
        </div>
        `;
}
//使用者身份
export function renderUserHeader(container) {
  container.innerHTML = `
    <div>
        <header style="width:100%; height:70px; position:fixed; top:0; left:0; right:0; border:1px solid red;">User</header>
    </div>    
    `;
}
