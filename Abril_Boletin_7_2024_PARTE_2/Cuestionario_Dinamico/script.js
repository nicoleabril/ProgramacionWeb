function generateQuestions() {
    var numQuestions = parseInt(document.getElementById('numQuestions').value);
    var questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    for (var i = 1; i <= numQuestions; i++) {
        var questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <label  for="question${i}" >Pregunta ${i}:</label>
            <input type="text" id="question${i}" name="question${i}" required>
            <select id="questionType${i}" onchange="showOptions(${i})">
                <option value="text">Pregunta de texto</option>
                <option value="truefalse">Verdadero/Falso</option>
                <option value="multiplechoice">Opción Múltiple</option>
            </select>
            <div id="optionsContainer${i}" style="display: none;">
                <label for="numOptions${i}">Número de opciones múltiples:</label>
                <input type="number" id="numOptions${i}" name="numOptions${i}" min="1" max="10">
                <button class="buttonAgregar" type="button" onclick="addMultipleOptions(${i})">Agregar</button>
                <div id="multipleOptions${i}" style="display: none;"></div>
            </div>
            <br>
        `;
        questionsContainer.appendChild(questionDiv);
    }

    document.getElementById('submitBtn').style.display = 'block';
}

function showOptions(questionNum) {
    var questionType = document.getElementById('questionType' + questionNum).value;
    var optionsContainer = document.getElementById('optionsContainer' + questionNum);

    if (questionType === 'multiplechoice') {
        optionsContainer.style.display = 'block';
    } else {
        optionsContainer.style.display = 'none';
    }
}

function addMultipleOptions(questionNum) {
    var numOptions = parseInt(document.getElementById('numOptions' + questionNum).value);
    var multipleOptionsDiv = document.getElementById('multipleOptions' + questionNum);
    multipleOptionsDiv.innerHTML = '';

    for (var i = 1; i <= numOptions; i++) {
        var optionLabel = document.createElement('label');
        optionLabel.textContent = 'Opción ' + i + ': ';
        var optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.id = 'option' + i + '_' + questionNum;
        optionInput.name = 'option' + i + '_' + questionNum;
        multipleOptionsDiv.appendChild(optionLabel);
        multipleOptionsDiv.appendChild(optionInput);
        multipleOptionsDiv.appendChild(document.createElement('br'));
    }

    multipleOptionsDiv.style.display = 'block';
}


function submitForm() {
    var numQuestions = parseInt(document.getElementById('numQuestions').value);
    var answersForm = document.getElementById('answersForm');
    answersForm.innerHTML = '';

    for (var i = 1; i <= numQuestions; i++) {
        var question = document.getElementById('question' + i).value;
        var questionType = document.getElementById('questionType' + i).value;

        var questionDiv = document.createElement('div');
        questionDiv.classList.add('form-group');

        // Agregar clase según el tipo de pregunta
        if (questionType === 'text') {
            questionDiv.classList.add('text-question');
        } else if (questionType === 'truefalse') {
            questionDiv.classList.add('truefalse-question');
        } else if (questionType === 'multiplechoice') {
            questionDiv.classList.add('multiplechoice-question');
        }

        var labelQuestion = document.createElement('label');
        labelQuestion.textContent = question;
        questionDiv.appendChild(labelQuestion);

        if (questionType === 'text') {
            var inputText = document.createElement('input');
            inputText.type = 'text';
            inputText.id = 'answer' + i;
            inputText.name = 'answer' + i;
            inputText.required = true;
            questionDiv.appendChild(inputText);
        } else if (questionType === 'truefalse') {
            var optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            var optionTrue = document.createElement('div');
            var inputTrue = document.createElement('input');
            inputTrue.type = 'radio';
            inputTrue.id = 'answer' + i + '_true';
            inputTrue.name = 'answer' + i;
            inputTrue.value = 'true';
            inputTrue.required = true;
            var labelTrue = document.createElement('label');
            labelTrue.textContent = 'Verdadero';
            labelTrue.setAttribute('for', 'answer' + i + '_true');
            optionTrue.appendChild(inputTrue);
            optionTrue.appendChild(labelTrue);
            optionsDiv.appendChild(optionTrue);

            var optionFalse = document.createElement('div');
            var inputFalse = document.createElement('input');
            inputFalse.type = 'radio';
            inputFalse.id = 'answer' + i + '_false';
            inputFalse.name = 'answer' + i;
            inputFalse.value = 'false';
            inputFalse.required = true;
            var labelFalse = document.createElement('label');
            labelFalse.textContent = 'Falso';
            labelFalse.setAttribute('for', 'answer' + i + '_false');
            optionFalse.appendChild(inputFalse);
            optionFalse.appendChild(labelFalse);
            optionsDiv.appendChild(optionFalse);

            questionDiv.appendChild(optionsDiv);
        } else if (questionType === 'multiplechoice') {
            var numOptions = parseInt(document.getElementById('numOptions' + i).value);
            var optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            for (var j = 1; j <= numOptions; j++) {
                var optionText = document.getElementById('option' + j + '_' + i).value;
                var optionDiv = document.createElement('div');

                var optionInput = document.createElement('input');
                optionInput.type = 'checkbox';
                optionInput.id = 'option' + j + '_' + i;
                optionInput.name = 'option' + j + '_' + i;
                optionInput.value = optionText;

                var optionLabel = document.createElement('label');
                optionLabel.textContent = optionText;
                optionLabel.setAttribute('for', 'option' + j + '_' + i);

                optionDiv.appendChild(optionInput);
                optionDiv.appendChild(optionLabel);
                optionsDiv.appendChild(optionDiv);
            }

            questionDiv.appendChild(optionsDiv);
        }

        answersForm.appendChild(questionDiv);
    }

    // Ocultar formulario de configuración
    document.getElementById('questionForm').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('questionsContainer').style.display = 'none';
    // Mostrar solo el formulario de respuestas
    document.getElementById('responseForm').style.display = 'block';
}




function submitAnswers() {
    var answers = '';
    var numQuestions = parseInt(document.getElementById('numQuestions').value);

    for (var i = 1; i <= numQuestions; i++) {
        var question = document.getElementById('question' + i).value;
        var questionType = document.getElementById('questionType' + i).value;
        var answer;

        if (questionType === 'text') {
            answer = document.getElementById('answer' + i).value;
        } else if (questionType === 'truefalse') {
            var trueOption = document.getElementById('answer' + i + '_true');
            var falseOption = document.getElementById('answer' + i + '_false');
            answer = trueOption.checked ? trueOption.value : falseOption.value;
        } else if (questionType === 'multiplechoice') {
            var options = document.querySelectorAll('input[name^="option' + i + '"]:checked');
            console.log(options);
            if (options.length > 0) {
                answer = Array.from(options).map(option => option.value).join(', ');
            } else {
                answer = 'Ninguna opción seleccionada';
            }
        }
        answers += `${question}: ${answer}\n`;
    }
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('responseForm').style.display = 'none';
    document.getElementById('mensaje').style.display = 'block';

    console.log(answers);
}





