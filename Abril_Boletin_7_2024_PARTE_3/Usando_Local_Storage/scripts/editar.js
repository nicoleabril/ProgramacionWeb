document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-info-form');
    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('foto-preview');

    // Obtener el índice de la persona de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const personIndex = urlParams.get('index');

    // Obtener el array de personas del localStorage
    const personas = JSON.parse(localStorage.getItem('personas')) || [];
    const persona = personas[personIndex];

    // Cargar los datos de la persona en el formulario
    document.getElementById('cedula').value = persona.cedula;
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('direccion').value = persona.direccion;
    document.getElementById('telefono').value = persona.telefono;
    document.getElementById('fecha-nacimiento').value = new Date(persona.fechaNacimiento).toISOString().slice(0, 16);
    fotoPreview.src = persona.foto;

    // Cargar vista previa de la foto
    fotoInput.addEventListener('change', () => {
        const file = fotoInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            fotoPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Actualizar los datos de la persona
        persona.cedula = document.getElementById('cedula').value;
        persona.nombre = document.getElementById('nombre').value;
        persona.direccion = document.getElementById('direccion').value;
        persona.telefono = document.getElementById('telefono').value;
        persona.fechaNacimiento = document.getElementById('fecha-nacimiento').value;
        persona.foto = fotoPreview.src;

        // Guardar el array de personas actualizado en el localStorage
        personas[personIndex] = persona;
        localStorage.setItem('personas', JSON.stringify(personas));

        // Redirigir a la página de listado
        window.location.href = 'listado.html';
    });
});
