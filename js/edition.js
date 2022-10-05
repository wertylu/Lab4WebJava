let carId = localStorage.getItem('id');
let carName = document.querySelector('#nameField');
let carPrice = document.querySelector('#priceField');
let carImage = document.querySelector('#imgField');
let carPower = document.querySelector('#powerField')

function toMainPage() {
    window.location.href = 'index.html';
}

async function getCar(id) {
    fetch(`http://localhost:8080/cars/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            carName.value = data.name;
            carPrice.value = data.price;
            carImage.value = data.image;
            carPower.value = data.power
        })
        .catch((err) => {
            document.querySelector('.alert').textContent = `${err}`;
            alert('STUUUUUUUUUUUUPIiiiiiIIiiiID');
        });
}

async function updateCar() {
    if (carName.value && carPrice.value && carImage.value && carPrice.value && carPower.value >= 1) {
        fetch(`http://localhost:8080/cars/update/${carId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': carName.value,
                'price': parseInt(carPrice.value),
                'image': carImage.value,
                'power': parseInt(carPower.value)
            })
        })
            .then(res => {
                if (res.ok) {
                    carName.value = '';
                    carPrice.value = '';
                    carImage.value = '';
                    carPower.value = '';
                    localStorage.removeItem('id');
                    window.location.href = 'index.html';
                } else {
                    alert('no can do, smthn bad');
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                alert('no can do, smthn bad');
            })
    }
}

getCar(carId);