const dogsURL = 'http://localhost:3000/dogs'

function getDoggos() {
    fetch(dogsURL)
        .then(resp => resp.json())
        .then(data => {
            createDogsList(data)
        })
}
function createDogsList(arrOfDogs) {
    const tableBody = document.querySelector('#table-body');
    for (let dog of arrOfDogs) {
        const tableRow = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdBreed = document.createElement('td');
        const tdSex = document.createElement('td');
        const tdButton = document.createElement('td');
        const btn = document.createElement('button');

        tdButton.append(btn);
        tdName.innerText = dog.name;
        tdBreed.innerText = dog.breed;
        tdSex.innerText = dog.sex;
        btn.innerText = 'Edit Dog';
        const arrOfDogEls = [tdName, tdBreed, tdSex]
        btn.addEventListener('click', ()=>populateEditDogForm(dog, arrOfDogEls))
        tableRow.append(tdName, tdBreed, tdSex, tdButton)
        tableBody.append(tableRow)
    }
}

function populateEditDogForm(dog, arrOfDogEls){
    const dogForm = document.querySelectorAll('#dog-form input');
    dogForm[0].value = dog.name;
    dogForm[1].value = dog.breed;
    dogForm[2].value = dog.sex;
    document.getElementById('dog-form').addEventListener('submit', (e)=>updateDog(e, dog, arrOfDogEls))
}

function updateDog(e, dog, arrOfDogEls){
    e.preventDefault()
    fetch(dogsURL + `/${dog.id}`, {
        method: "PATCH", 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            name: e.target[0].value,
            breed: e.target[1].value,
            sex: e.target[2].value
        })
    })
    .then(resp => resp.json())
    .then(dog => {
        updateDogInfo(dog, arrOfDogEls)
    })
}

function updateDogInfo(dog, arrOfDogEls){
    arrOfDogEls[0].innerText = dog.name;
    arrOfDogEls[1].innerText = dog.breed;
    arrOfDogEls[2].innerText = dog.sex;
}
document.addEventListener('DOMContentLoaded', getDoggos)