const url = 'https://fake-e-commerce-api.onrender.com/product'
window.addEventListener('load', () => {
    console.log('prueba de api')
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
})