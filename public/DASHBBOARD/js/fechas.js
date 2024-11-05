// Selección de elementos
const eventoForm = document.getElementById('eventoForm');
const calendar = document.getElementById('calendar');
const eventList = document.getElementById('eventList'); 

eventoForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    await agregarEvento(); 
});

// Función para agregar un evento
async function agregarEvento() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;
    const imagenInput = document.getElementById('imagen');
    const archivo = imagenInput.files[0];

    if (titulo && fecha && archivo) {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('fecha', fecha);
        formData.append('imagen', archivo);

        try {
            const response = await fetch('procesar_evento.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.mensaje) {
                alert(result.mensaje); 
                cargarEventos(); 
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error al agregar evento:', error);
            alert('Error al agregar evento. Inténtalo de nuevo.');
        }

        eventoForm.reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Animación para nuevos eventos
document.addEventListener('animationend', (event) => {
    if (event.animationName === 'fade-in') {
        event.target.style.opacity = 1;
    }
});

// Función para cargar eventos desde el servidor
async function cargarEventos() {
    try {
        const response = await fetch('/RAICES_CAÑETANAS/DASHBBOARD/db/fechas.php'); 
        const eventos = await response.json(); 

        eventList.innerHTML = ''; 

        eventos.forEach(evento => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${evento.titulo}</strong> - ${evento.descripcion} <br>
                            Fecha: ${evento.fecha} <br>
                            <img src="uploads/${evento.imagen}" alt="${evento.titulo}" style="width: 100px; height: auto;">`;
            eventList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar eventos:', error);
    }
}

// Cargar eventos cuando se carga la página
window.onload = cargarEventos;
