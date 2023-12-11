document.getElementById("logBtn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Debe ingresar su correo electrónico y contraseña.");
    } else {
       
        const storedUserData = sessionStorage.getItem(email);

        if (storedUserData) {
            let user = JSON.parse(storedUserData);

            if (user.password === password) {
                window.location.href = "/home/index.html";
            } else {
                alert("La contraseña es incorrecta. Inténte nuevamente.");
            }

        } else {
            alert("El usuario no existe. Regístrate primero.");
        }
    }
});
