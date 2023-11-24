// MemberView.js
class MemberView {
  login(account, password) {
    return fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ account, password })
    })
    .then(response => response.json())
    .then(data => {
      // 这里返回data，可以在调用login方法后使用.then来处理登录成功或失败的逻辑
      return data;
    });
  }

  register(account, password, name, phone) {
    return fetch('/api/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ account, password, name, phone })
    })
    .then(response => response.json())
    .then(data => {
      // 返回注册结果
      return data;
    });
  }

  updateMemberInfo(memberId, name, phone, newPassword) {
    return fetch(`/api/member/${memberId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, password: newPassword })
    })
    .then(response => response.json())
    .then(data => {
      // 返回更新结果
      return data;
    });
  }
}