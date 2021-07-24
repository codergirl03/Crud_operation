let table = document.querySelector("#table")
let addUser = document.querySelector("#userForm")
let filterValues = document.querySelector("#filter")
let saveChanges = document.querySelector("#saveChanges")
let addUserBtn = document.querySelector("#addUserBtn")

let inputName = document.querySelector("#name")
let inputEmail = document.querySelector("#email")
let inputAge = document.querySelector("#age")

function renderUser(data){

    let tbody = document.querySelector("#tbody")

    data = filterUsers(data , filterValues.value)
   
    let emptyStr = ""

    data.forEach( (element , i) => {

        emptyStr += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.age}</td>
                <td>
                    <div>
                        <button id="edit" onclick = "editUser(${i})" >
                            <i class="far fa-edit"></i>
                        </button>
                        <button id="delete" onclick = "deleteUser(${i})">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
                </tr>
        `
    })
    tbody.innerHTML = emptyStr
 
}
renderUser(database)

addUser.onsubmit = (event) => {
    event.preventDefault()
    addNewUser()
}

function addNewUser(){
    
    let name = inputName.value
    let email = inputEmail.value
    let age = inputAge.value

    if( name !== "" && email !== "" && age !== "" && name !==null && email !==null && age !==null){
        let newUsers = {name , email , age}

        database.push(newUsers)
        renderUser(database)
        window.localStorage.setItem("database" , JSON.stringify(database))

        inputName.value = null
        inputEmail.value = null
        inputAge.value = null
    }
}

let saveNameIndex = document.querySelector("#saveNameIndex")
let saveEmailIndex = document.querySelector("#saveEmailIndex")
let saveAgeIndex = document.querySelector("#saveAgeIndex")

function editUser(i){
    saveNameIndex.value = i
    saveEmailIndex.value = i
    saveAgeIndex.value = i

    inputName.value = database[i].name
    inputEmail.value = database[i].email
    inputAge.value = database[i].age

    saveChanges.style.display = "block"
    addUserBtn.style.display = "none"
}

saveChanges.onclick = () => {
    database[saveNameIndex.value].name = inputName.value
    database[saveEmailIndex.value].email = inputEmail.value
    database[saveAgeIndex.value].age = inputAge.value

    saveChanges.style.display = "none"
    addUserBtn.style.display = "block"

    localStorage.setItem('database', JSON.stringify(database));

    inputName.value = null
    inputEmail.value = null
    inputAge.value = null
    renderUser(database)
}

function deleteUser(index){
    database.splice(index, 1);
    localStorage.setItem('database', JSON.stringify(database));
    renderUser(database)

}

filterValues.onchange = () =>{
    renderUser(database)
}

function filterUsers(array , instraction){
    let sorted
    if(instraction == "age"){
        sorted  = array.sort( (a, b) => {
            return a.age - b.age
        })
    }else if(instraction == "name"){
        sorted  = array.sort( (a, b) => {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        })
    }
    else if(instraction == "email"){
        sorted  = array.sort( (a, b) => {
            return (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0)
        })
    }
    window.localStorage.setItem("database" , JSON.stringify(sorted))
    return sorted
}

// let formSearch = document.querySelector("#search")
// let inputSearch = document.querySelector("#searchUser")

// formSearch.addEventListener("submit" , (event) => {
//     event.preventDefault()
//     searchUsersInfo(database)
// })

// function searchUsersInfo(array){
//     let searched
//     array.filter( (element) => {
//         if(inputSearch.value === element.name || inputSearch.value === element.email ||inputSearch.value === element.age ){
//             searched  = element
//         }
//     })
//     renderUser(searched)
//     // window.localStorage.setItem("database" , JSON.stringify(searched))
//     // renderUser(searched)
//     return searched 
// }
