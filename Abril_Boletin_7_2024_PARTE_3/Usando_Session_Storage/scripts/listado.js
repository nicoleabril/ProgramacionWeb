document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('person-table-body');

    // Función para cargar personas desde el archivo JSON
    const loadPersonsFromJSON = async () => {
        try {
            const response = await fetch('../personas.json');
            const personasJSON = await response.json();
            return personasJSON;
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
            return [];
        }
    };

    // Función para cargar personas desde el sessionStorage
    const loadPersonsFromsessionStorage = () => {
        const personassessionStorage = JSON.parse(sessionStorage.getItem('personas')) || [];
        return personassessionStorage;
    };

    // Función para combinar datos del JSON y sessionStorage
    const loadPersons = async () => {
        const personassessionStorage = loadPersonsFromsessionStorage();
        const personasJSON = await loadPersonsFromJSON();
        
        const allPersons = [...personassessionStorage, ...personasJSON];

        // Crear filas de la tabla para cada persona
        allPersons.forEach((persona, index) => {
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
    };

    loadPersons();
});

function editPerson(index) {
    // Obtener el array de personas del sessionStorage
    const personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    const persona = personas[index];

    // Redirigir a la página de edición con el índice en la URL
    window.location.href = `editar.html?index=${index}`;
}

function deletePerson(index) {
    // Obtener el array de personas del sessionStorage
    const personas = JSON.parse(sessionStorage.getItem('personas')) || [];

    // Eliminar la persona del array
    personas.splice(index, 1);

    // Guardar el array actualizado en el sessionStorage
    sessionStorage.setItem('personas', JSON.stringify(personas));

    // Recargar la página para actualizar la tabla
    window.location.reload();
}
