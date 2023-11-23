// TransactionTypeView.js
class TransactionTypeView {
  listTransactionTypes() {
    return fetch('/api/transaction')
    .then(response => response.json())
    .then(data => {
      // 返回交易类型列表
      return data;
    });
  }
}
