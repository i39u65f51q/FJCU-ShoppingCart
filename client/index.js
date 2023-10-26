console.log('client');
//apiUrl: http://localhost:3000/api/
fetch('http://localhost:3000/api/member').then(async res => {
  const data = await res.json();
  console.log(data);
});
