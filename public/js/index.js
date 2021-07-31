const tag = document.querySelector(".json");

//creating user

// fetch('http://localhost:3000/api/users/register', {
//     method: "POST",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//     body: JSON.stringify({
//         name: "test",
//         password: "password",
//         email: "test@test.com",
//         bio: "hello world"
//     })
// })
//   .then(response => response.json())
//   .then(json => console.log(json))

//logging in user
// fetch('http://localhost:3000/api/users/login', {
//     method: "POST",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//     body: JSON.stringify({
//         password: "password",
//         email: "test@test.com",
//     })
// })
//   .then(response => response.json())
//   .then(json => console.log(json))

fetch('http://localhost:3000/api/users/current', {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA1OTEzOTUzM2NhMjQ5MWFmNmMxYTUiLCJpYXQiOjE2Mjc3NTQ4NzAsImV4cCI6MTYyODM1OTY3MH0.JKBXdGgxJ0Z7XNM6k8iBt9ujdQw9qkNswvr1mmpEHvU"
      },
})
  .then(response => response.json())
  .then(json => console.log(json))

  //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA1OTEzOTUzM2NhMjQ5MWFmNmMxYTUiLCJpYXQiOjE2Mjc3NTQ4NzAsImV4cCI6MTYyODM1OTY3MH0.JKBXdGgxJ0Z7XNM6k8iBt9ujdQw9qkNswvr1mmpEHvU"