

let cars = [];
let filterArr = [];

function toCreatePage(){
    window.location.href = 'creation.html'
}

function toEditPage(id) {
    localStorage.setItem('id', id);
    window.location.href = 'edition.html';
}

function createCar(arr){
    let index = 0;
    arr.forEach(element => {
    document.querySelector('.ull').innerHTML +=`
    <li class="car-card">
    <div class="car-card-image">
        <img src="${element.image}" alt="">
    </div>
    <div class="car-card-content">
        <div class="car-card-title">${element.name}</div>
        <div class="car-card-description">Price: ${element.price}</div>
        <div class="car-card-price">
            <div class="car-card-price-text">Power: </div>
            <div class="car-card-beauty-level">${element.power} hp</div>
        </div>
        <div class="car-card-buttons">
            <button class="car-card-edit" onclick="toEditPage(${element.id})">Edit</button>
            <button class="car-card-remove" onclick="deleteCar(${element.id}, ${index++})">Remove</button>
        </div>
    </div>
    </li>`;
    });
    }

async function getCars() {
    fetch('http://localhost:8080/cars')
        .then(res => res.json())
        .then(data => {
            cars = data;
            document.querySelector('.ull').replaceChildren();// ріплейс очишає плиточку на іннер html можна поміняти
            createCar(cars);
            getTotalPrice(cars);
        })
        .catch(err => console.log(err));
}

function searchCar() {
    document.querySelector('#name').checked = false;
    document.querySelector('#price').checked = false;
    let search = document.querySelector('#find_input').value;
    if (search) {
        let reg = new RegExp(`${search}`);
        filterArr = cars.filter(element => reg.test(element.name) === true);
        document.querySelector('.ull').replaceChildren();
        createCar(filterArr);
        getTotalPrice(filterArr);
    } else {
        getCars();
    }
}

function sortNameAl(arr) {
    document.querySelector('#price').checked = false;
    arr.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    document.querySelector('.ull').replaceChildren();
    createCar(arr);
}




function sortByName() {
    if (document.querySelector('#name').checked) {
        if (document.querySelector('#search').value) {
            sortNameAl(filterArr);
        } else {
            sortNameAl(cars);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.ull').replaceChildren();
        getCars();
    }
}


function sortPriceAl(arr) {
    document.querySelector('#name').checked = false;
    arr.sort((a, b) => {
        return a.price - b.price;
    });
    document.querySelector('.ull').replaceChildren();
    createCar(arr);
}


function sortByPrice() {
    if (document.querySelector('#price').checked) {
        if (document.querySelector('#find_input').value) {
            sortPriceAl(filterArr);
        } else {
            sortPriceAl(cars);
        }
    } else if (!document.querySelector('#find_input').value) {
        document.querySelector('.ull').replaceChildren();
        getCars();
    }
}

function getTotalPrice() {
    document.querySelector('#count_result').textContent = `Total count: ${cars.length} cars`;
}

async function deleteCar(id, index) {
    fetch(`http://localhost:8080/cars/delete/${id}`,{
        method: 'DELETE'
    })
        .then(res => {
            if(res.ok) {
                cars.splice(index, 1);
                document.querySelector('.ull').replaceChildren();
                createCar(cars);
                getTotalPrice(cars);
            }
        })
}

getCars();