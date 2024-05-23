document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('personal-info-form');
    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('foto-preview');

    document.getElementById('foto').addEventListener('change', function(event) {
        var reader = new FileReader();
        reader.onload = function(){
            var output = document.getElementById('foto-preview');
            output.src = reader.result;
            output.style.display = 'block';

        };
        reader.readAsDataURL(event.target.files[0]);
    });


    fotoInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fotoPreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
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

    document.getElementById('botonAgregar').addEventListener('click', function(e) {
        e.preventDefault();
        // Obtener los datos del formulario
        const cedula = document.getElementById('cedula').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const fechaNacimiento = document.getElementById('fecha-nacimiento').value.trim();
        const foto = fotoPreview.src;

        // Validar que todos los campos están llenos
        if (!cedula || !nombre || !direccion || !telefono || !fechaNacimiento || foto.includes('#') ) {
            alert('Ingrese todos los campos.');
            return;
        }
    
        // Validar cédula (suponiendo que validarCedula es una función definida previamente)
        if (!validarCedula(cedula)) {
            alert('La cédula ingresada no es válida.');
            return;
        }
    
        // Crear objeto persona
        const persona = {
            cedula,
            nombre,
            direccion,
            telefono,
            fechaNacimiento,
            foto
        };
    
        // Obtener el array de personas del SessionStorage
        const personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    
        // Agregar la nueva persona al array
        personas.push(persona);
    
        // Guardar el array de personas en el sessionStorage
        sessionStorage.setItem('personas', JSON.stringify(personas));
    
        // Limpiar el formulario
        document.getElementById('personal-info-form').reset();
        fotoPreview.src = "#";
    
        alert('Persona agregada exitosamente.');
    });
    
    

});
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        document.querySelector('.burger_menu').checked = false;
    }
});
