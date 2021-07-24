// let database = [
//     {name:"Afruza", email:"doniyorova3@gmail.com", age:24},
//     {name:"Feruza",email:"ergashevaf103@gmail.com",age:20},
//     {name:"Sarvinoz",email:"sarvinoz14@gmail.com",age:18},
//     {name:"Diyorbek",email:"fayzullayev00@gmail.com",age:25},
// ]

// window.localStorage.setItem("database" , JSON.stringify(database))

let database = window.localStorage.getItem("database")
if(database === null) database = []
else database = JSON.parse(database)



