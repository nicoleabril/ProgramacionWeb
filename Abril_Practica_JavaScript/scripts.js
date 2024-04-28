document.addEventListener("DOMContentLoaded", function() {
    var auth_token;

    function actualizarOpcionesPaises(paises) {
        var selectPais = document.getElementById("pais");
        paises.forEach(function(pais) {
          var option = document.createElement("option");
          option.value = pais.id;
          option.text = pais.text;
          selectPais.appendChild(option);
        });
        
        // Inicializar Select2 después de cargar las opciones
        $('#pais').select2({
            placeholder: 'Seleccione un país'
            // Puedes agregar más opciones de configuración según la documentación de Select2
        });

        // Inicializar Select2 después de cargar las opciones
        $('#estado').select2({
            placeholder: 'Seleccione un estado'
            // Puedes agregar más opciones de configuración según la documentación de Select2
        });
        // Inicializar Select2 después de cargar las opciones
        $('#ciudad').select2({
            placeholder: 'Seleccione una ciudad'
            // Puedes agregar más opciones de configuración según la documentación de Select2
        });
      }

    function obtenerPaisesConToken(token) {
        fetch("https://www.universal-tutorial.com/api/countries/", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al obtener la lista de países: " + response.status);
          }
          return response.json();
        })
        .then(data => {
          var countries = data.map(country => ({ id: country.country_name, text: country.country_name }));
          actualizarOpcionesPaises(countries);
        })
        .catch(error => {
          console.error(error);
        });
    }

    fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "api-token": "Ffjx25A3YSxs--AsGMchOpqGNvkcVpG5USfiqQCGWnkhynUT_9CNgb5okjXwG0FgfFQ",
        "user-email": "nicole.abrilc@ucuenca.edu.ec"
    }
    })
    .then(response => {
    if (!response.ok) {
        throw new Error("Error al obtener el token de autenticación: " + response.status);
    }
    return response.json();
    })
    .then(data => {
        obtenerPaisesConToken(data.auth_token);
        auth_token = data.auth_token;
        console.log("Token de autenticación:", data.auth_token);
    })
    .catch(error => {
    console.error(error);
    });


    function cargarEstados(paisSeleccionado) {
        fetch("https://www.universal-tutorial.com/api/states/" + paisSeleccionado, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + auth_token
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al obtener la lista de estados: " + response.status);
          }
          return response.json();
        })
        .then(data => {
          // Limpiar la lista de estados existente
          var selectEstado = document.getElementById("estado");
          selectEstado.innerHTML = ""; // Elimina todas las opciones existentes
          
          // Agregar los nuevos estados a la lista
          data.forEach(function(estado) {
            var option = document.createElement("option");
            option.value = estado.state_name;
            option.text = estado.state_name;
            selectEstado.appendChild(option);
          });
          
          // Actualizar Select2 después de cargar las opciones
          $('#estado').select2({
            placeholder: 'Seleccione un estado'
            // Puedes agregar más opciones de configuración según la documentación de Select2
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

    function cargarCiudades(estadoSeleccionado) {
        fetch("https://www.universal-tutorial.com/api/cities/" + estadoSeleccionado, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + auth_token
        }
        })
        .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener la lista de ciudades: " + response.status);
        }
        return response.json();
        })
        .then(data => {
        // Limpiar la lista de ciudades existente
        var selectCiudad = document.getElementById("ciudad");
        selectCiudad.innerHTML = ""; // Elimina todas las opciones existentes
        
        // Agregar las nuevas ciudades a la lista
        data.forEach(function(ciudad) {
            var option = document.createElement("option");
            option.value = ciudad.city_name;
            option.text = ciudad.city_name;
            selectCiudad.appendChild(option);
        });
        
        // Actualizar Select2 después de cargar las opciones
        $('#ciudad').select2({
            placeholder: 'Seleccione una ciudad'
            // Puedes agregar más opciones de configuración según la documentación de Select2
        });
        })
        .catch(error => {
        console.error(error);
        });
    }
      
      
     // Evento para actualizar los estados según el país seleccionado
     $(document).on('change', '#pais', function() {
        var paisSeleccionado = $(this).val();
        cargarEstados(paisSeleccionado);
    });

    // Evento para actualizar las ciudades según el estado seleccionado
    $(document).on('change', '#estado', function() {
        var estadoSeleccionado = $(this).val();
        cargarCiudades(estadoSeleccionado);
    });
  
    // Cargar la foto de perfil
    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('foto-preview');

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

    // Agregar fila de hijo
    const agregarHijoBtn = document.getElementById('agregar-hijo');
    const hijosTable = document.getElementById('hijos-table').getElementsByTagName('tbody')[0];

    agregarHijoBtn.addEventListener('click', function() {
        const newRow = hijosTable.insertRow();
        newRow.innerHTML = `
            <td><input type="text" class="nombre-hijo" placeholder="Nombre"></td>
            <td><input type="number" class="edad-hijo" placeholder="Edad"></td>
            <td><button class="eliminar-hijo" data-toggle="tooltip" data-placement="top" title="Eliminar hijo">
                <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
    });

    // Eliminar fila de hijo
    hijosTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('eliminar-hijo')) {
            const row = e.target.closest('tr');
            row.parentNode.removeChild(row);
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



    // Calcula la edad exacta
    function calcularEdad(fechaNacimiento) {
        const ahora = new Date();
        const nacimiento = new Date(fechaNacimiento);
        const edad = {};

        // Calcula la diferencia en milisegundos
        let diferencia = ahora.getTime() - nacimiento.getTime();

        // Calcula la edad en años
        edad.anios = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));

        // Calcula la edad en meses
        let meses = ahora.getMonth() - nacimiento.getMonth();
        if (meses < 0 || (meses === 0 && ahora.getDate() < nacimiento.getDate())) {
            edad.meses = 12 + meses;
        } else {
            edad.meses = meses;
        }

        // Calcula la edad en días
        let dias = ahora.getDate() - nacimiento.getDate();
        if (dias < 0) {
            const ultimoDiaMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
            dias = ultimoDiaMesAnterior - nacimiento.getDate() + ahora.getDate();
            edad.meses -= 1;
        }
        edad.dias = dias;

        // Calcula la edad en horas
        edad.horas = Math.floor(diferencia / (1000 * 60 * 60) % 24);

        return edad;
    }

    // Muestra la edad en la página
    function mostrarEdad(edad) {
        const edadInfo = document.getElementById('edad-info');
        edadInfo.innerHTML = `
            <p>Edad: ${edad.anios} años, ${edad.meses} meses, ${edad.dias} días, ${edad.horas} horas.</p>
        `;
    }

    // Evento para calcular la edad y validar la cédula al enviar el formulario
    const form = document.getElementById('personal-info-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitar envío por defecto del formulario

        const cedula = document.getElementById('cedula').value;
        const fechaNacimiento = document.getElementById('fecha-nacimiento').value;

        // Validar cédula
        if (!validarCedula(cedula)) {
            alert('La cédula ingresada no es válida.');
            return;
        }

        // Calcular la edad
        const edad = calcularEdad(fechaNacimiento);
        mostrarEdad(edad);
        agregarConsulta();
    });


    // Función para agregar una nueva fila de consulta a la tabla
    function agregarConsulta() {
        const consultasTable = document.getElementById('consultas-table').getElementsByTagName('tbody')[0];
        const fechaActual = new Date();
        const fecha = fechaActual.toLocaleDateString();
        const hora = fechaActual.toLocaleTimeString();

        // Crear una nueva fila
        const newRow = consultasTable.insertRow();
        // Insertar celdas con fecha y hora
        newRow.innerHTML = `
            <td>${fecha}</td>
            <td>${hora}</td>
        `;
    }
    

});
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        document.querySelector('.burger_menu').checked = false;
    }
});
