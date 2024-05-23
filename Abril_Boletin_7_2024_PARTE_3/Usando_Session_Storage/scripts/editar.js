document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-info-form');
    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('foto-preview');

    // Obtener el índice de la persona de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const personIndex = urlParams.get('index');

    // Obtener el array de personas del sessionStorage
    const personas = JSON.parse(sessionStorage.getItem('personas')) || [];
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

    // Valida la cédula de identidad ecuatoriana
    function validarCedula(cedula) {
        // Longitud de la cédula
        if (cedula.length !== 10) {
            return false;
        }

        // Comprueba si todos los caracteres son dígitos
        if (!/^\d+$/.test(cedula)) {
            return false;
        }

        // Extrae el dígito verificador
        const digitoVerificador = parseInt(cedula.charAt(9));

        // Calcula el dígito verificador esperado
        let suma = 0;
        for (let i = 0; i < 9; i++) {
            let multiplicador = i % 2 === 0 ? 2 : 1;
            let valor = parseInt(cedula.charAt(i)) * multiplicador;
            suma += valor > 9 ? valor - 9 : valor;
        }
        let digitoEsperado = 10 - (suma % 10);
        if (digitoEsperado === 10) {
            digitoEsperado = 0;
        }

        // Compara el dígito verificador calculado con el proporcionado
        return digitoVerificador === digitoEsperado;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Actualizar los datos de la persona
        persona.cedula = document.getElementById('cedula').value;
        persona.nombre = document.getElementById('nombre').value;
        persona.direccion = document.getElementById('direccion').value;
        persona.telefono = document.getElementById('telefono').value;
        persona.fechaNacimiento = document.getElementById('fecha-nacimiento').value;
        persona.foto = fotoPreview.src;
        // Validar que todos los campos están llenos
        if (!persona.cedula || !persona.nombre || !persona.direccion || !persona.telefono || !persona.fechaNacimiento || persona.foto.includes('#')) {
            alert('Ingrese todos los campos.');
            return;
        }
    
        // Validar cédula (suponiendo que validarCedula es una función definida previamente)
        if (!validarCedula(persona.cedula)) {
            alert('La cédula ingresada no es válida.');
            return;
        }

        // Guardar el array de personas actualizado en el sessionStorage
        personas[personIndex] = persona;
        sessionStorage.setItem('personas', JSON.stringify(personas));

        // Redirigir a la página de listado
        window.location.href = 'listado.html';
    });
});
