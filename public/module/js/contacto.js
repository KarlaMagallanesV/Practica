// Validaciones en tiempo real
document.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", () => validateField(field)); // Validación en tiempo real
    field.addEventListener("blur", () => validateField(field));  // Validación al salir del campo
});

function validateField(field) {
    const errorSpan = field.nextElementSibling; // Se asume que el span está justo después del campo
    let isValid = true;

    // Validación para nombres y apellidos
    if (field.id === "nombres" || field.id === "apellidos") {
        const regex = /^[A-Za-záéíóúñÑ\s]+$/;
        isValid = regex.test(field.value);
        if (!isValid) {
            errorSpan.innerText = "Solo se aceptan letras";
            showError(field, errorSpan);
        } else {
            hideError(field, errorSpan);
        }
    }

    // Validación para correo electrónico
    if (field.id === "gmail") {

        if (field.value.trim() === "") {
            hideError(field, errorSpan);
        } else if (!field.value.endsWith("@gmail.com")) {
            isValid = false;
            errorSpan.innerText = "El correo debe finalizar con @gmail.com";
            showError(field, errorSpan);
        } else {
            hideError(field, errorSpan);
        }
    }


    // Validación para tipo de documento
    if (field.id === "tipoDocumento") {
        isValid = field.value !== "";
        if (!isValid) {
            errorSpan.innerText = "Selecciona un tipo de documento";
            showError(field, errorSpan);
        } else {
            hideError(field, errorSpan);
        }
    }

    // Validación para número de documento
    if (field.id === "numeroDocumento") {
        const tipoDocumento = document.getElementById("tipoDocumento").value;
        if (tipoDocumento === "CE") {
            const regex = /^[0-9]{20}$/;
            isValid = regex.test(field.value);
            errorSpan.innerText = isValid ? "" : "Número debe tener 20 dígitos";
        } else if (tipoDocumento === "DNI") {
            const regex = /^[0-9]{8}$/;
            isValid = regex.test(field.value);
            errorSpan.innerText = isValid ? "" : "Número debe tener 8 dígitos";
        } else {
            errorSpan.innerText = "Selecciona un tipo de documento válido";
            isValid = false;
        }

        if (!isValid) showError(field, errorSpan);
        else hideError(field, errorSpan);
    }

    // Validación para edad
    if (field.id === "edad") {
        const edadValue = parseInt(field.value);
        isValid = edadValue >= 18 && !isNaN(edadValue);
        if (!isValid) {
            errorSpan.innerText = "La edad debe ser mayor o igual a 18";
            showError(field, errorSpan);
        } else {
            hideError(field, errorSpan);
        }
    }

    // Validación para teléfono
    if (field.id === "telefono") {
        const regex = /^9\d{8}$/; 
        isValid = regex.test(field.value);
        if (!isValid) {
            errorSpan.innerText = "Teléfono debe empezar con 9 y tener 9 dígitos";
            showError(field, errorSpan);
        } else {
            hideError(field, errorSpan);
        }
    }

    // Validación para dirección
    if (field.id === "direccion") {
        isValid = field.value.trim() !== "";
        if (!isValid) {
            errorSpan.innerText = "La dirección no puede estar vacía";
            showError(field, errorSpan);
        } else {
            hideError(field, errorSpan);
        }
    }

    // Validación para mensaje
    if (field.id === "mensaje") {
        isValid = field.value.trim() !== "";
        if (!isValid) {
            errorSpan.innerText = "El mensaje no puede estar vacío";
            showError(field, errorSpan);
        } else {
            hideError(field, errorSpan);
        }
    }

    return isValid; 
}

// Función para mostrar el mensaje de error
function showError(field, errorSpan) {
    errorSpan.classList.remove("hidden");
    errorSpan.style.display = "block";
    errorSpan.style.color = "red";
    field.classList.add("border-red-500");
    field.classList.remove("border-green-500");
}

// Función para ocultar el mensaje de error
function hideError(field, errorSpan) {
    errorSpan.classList.add("hidden");
    errorSpan.style.display = "none"; // Ocultamos el mensaje
    field.classList.remove("border-red-500");
    field.classList.add("border-green-500");
}

function submitForm(event) {
    event.preventDefault();
    console.log("submitForm function called"); // Agrega esto para depurar
    const fields = document.querySelectorAll("input, select, textarea");
    let formValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            formValid = false;
        }
    });

    if (formValid) {
        Swal.fire({
            title: '¡Formulario Enviado!',
            text: 'Formulario enviado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal2-popup'
            }
        });

        // Vaciar los campos del formulario
        document.getElementById("contactForm").reset();
        document.getElementById("contactFormRight").reset();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, corrige los errores en el formulario antes de enviarlo.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal2-popup'
            }
        });
    }
}
