function toMainPage() {
    window.location.href = 'index.html';
}


async function createCar() {
    let image = document.querySelector('#imgField').value;
    let name = document.querySelector('#nameField').value;
    let power = parseInt(document.querySelector('#powerField').value);
    console.log(typeof(power));
    let price = parseInt(document.querySelector('#priceField').value);
    console.log(typeof(price));
    if (image && name && price && power >= 1) {
        fetch('http://localhost:8080/cars/add', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'price': price,
                'image': image,
                'power': power
            })
        })
            .then(res => {
                if (res.ok) {
                    image = '';
                    name = '';
                    price = 1;
                    power = 1
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                alert("stuuuuuuuuuuupid");
            });
    }
}