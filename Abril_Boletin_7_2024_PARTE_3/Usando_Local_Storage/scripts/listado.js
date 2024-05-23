document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('person-table-body');

    // Obtener el array de personas del localStorage
    const personas = JSON.parse(localStorage.getItem('personas')) || [];

    // Crear filas de la tabla para cada persona
    personas.forEach((persona, index) => {
        const row = document.createElement('tr');

        const cedulaCell = document.createElement('td');
        cedulaCell.textContent = persona.cedula;
        row.appendChild(cedulaCell);

        const nombreCell = document.createElement('td');
        nombreCell.textContent = persona.nombre;
        row.appendChild(nombreCell);

        const direccionCell = document.createElement('td');
        direccionCell.textContent = persona.direccion;
        row.appendChild(direccionCell);

        const telefonoCell = document.createElement('td');
        telefonoCell.textContent = persona.telefono;
        row.appendChild(telefonoCell);

        const fechaNacimientoCell = document.createElement('td');
        fechaNacimientoCell.textContent = new Date(persona.fechaNacimiento).toLocaleString();
        row.appendChild(fechaNacimientoCell);

        const fotoCell = document.createElement('td');
        const fotoImg = document.createElement('img');
        fotoImg.src = persona.foto;
        fotoImg.alt = "Foto de " + persona.nombre;
        fotoImg.width = 50;  // Ajusta el tamaño según tus necesidades
        fotoCell.appendChild(fotoImg);
        row.appendChild(fotoCell);

        // Crear celda de editar
        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editPerson(index));
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Crear celda de borrar
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deletePerson(index));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
});

function editPerson(index) {
    // Obtener el array de personas del localStorage
    const personas = JSON.parse(localStorage.getItem('personas')) || [];
    const persona = personas[index];

    // Redirigir a la página de edición con el índice en la URL
    window.location.href = `editar.html?index=${index}`;
}

function deletePerson(index) {
    // Obtener el array de personas del localStorage
    const personas = JSON.parse(localStorage.getItem('personas')) || [];

    // Eliminar la persona del array
    personas.splice(index, 1);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('personas', JSON.stringify(personas));

    // Recargar la página para actualizar la tabla
    window.location.reload();
}
