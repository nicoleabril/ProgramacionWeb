function generateQuestions() {
    var numQuestions = parseInt(document.getElementById('numQuestions').value);
    var questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    for (var i = 1; i <= numQuestions; i++) {
        var questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <label for="question${i}">Pregunta ${i}:</label>
            <input type="text" id="question${i}" name="question${i}" required>
            <select id="questionType${i}" onchange="showOptions(${i})">
                <option value="text">Pregunta de texto</option>
                <option value="truefalse">Verdadero/Falso</option>
                <option value="multiplechoice">Opción Múltiple</option>
            </select>
            <div id="optionsContainer${i}" style="display: none;">
                <label for="numOptions${i}">Número de opciones múltiples:</label>
                <input type="number" id="numOptions${i}" name="numOptions${i}" min="1" max="10">
                <button type="button" onclick="addMultipleOptions(${i})">Agregar</button>
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
        multipleOptionsDiv.innerHTML += `
            <input type="checkbox" id="option${i}_${questionNum}" name="option${i}_${questionNum}" value="option${i}">
            <label for="option${i}_${questionNum}">Opción ${i}</label>
            <br>
        `;
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
        questionDiv.innerHTML = `
            <label>${question}</label>
            <br>
        `;

        if (questionType === 'text') {
            questionDiv.innerHTML += `<input type="text" id="answer${i}" name="answer${i}" required>`;
        } else if (questionType === 'truefalse') {
            questionDiv.innerHTML += `
                <input type="radio" id="answer${i}_true" name="answer${i}" value="true" required>
                <label for="answer${i}_true">Verdadero</label>
                <input type="radio" id="answer${i}_false" name="answer${i}" value="false" required>
                <label for="answer${i}_false">Falso</label>
            `;
        } else if (questionType === 'multiplechoice') {
            var options = '';
            var numOptions = parseInt(document.getElementById('numOptions' + i).value);
            for (var j = 1; j <= numOptions; j++) {
                if (document.getElementById('option' + j + '_' + i).checked) {
                    options += document.getElementById('option' + j + '_' + i).value + ', ';
                }
            }
            // Eliminar la coma extra al final
            options = options.slice(0, -2);

            questionDiv.innerHTML += `<label>${options}</label><br>`;
        }

        answersForm.appendChild(questionDiv);
    }

    document.getElementById('responseForm').style.display = 'block';
}

function submitAnswers() {
    var answers = '';
    var numQuestions = parseInt(document.getElementById('numQuestions').value);

    for (var i = 1; i <= numQuestions; i++) {
        var question = document.getElementById('question' + i).value;
        var answer;

        if (document.getElementById('answer' + i)) {
            answer = document.getElementById('answer' + i).value;
        } else {
            answer = '';
            var numOptions = parseInt(document.getElementById('numOptions' + i).value);
            for (var j = 1; j <= numOptions; j++) {
                if (document.getElementById('option' + j + '_' + i).checked) {
                    answer += document.getElementById('option' + j + '_' + i).value + ', ';
                }
            }
            // Eliminar la coma extra al final
            answer = answer.slice(0, -2);
        }

        answers += `${question}: ${answer}\n`;
    }

    document.getElementById('answers').value = answers;
    document.getElementById('answers').style.display = 'block';
}
