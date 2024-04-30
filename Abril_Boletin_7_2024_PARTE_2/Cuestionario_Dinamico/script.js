function generateQuestions() {
    var numQuestions = parseInt(document.getElementById('numQuestions').value);
    var questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    for (var i = 1; i <= numQuestions; i++) {
        var questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <label for="question${i}">Pregunta ${i}</label>
            <select id="questionType${i}">
                <option value="text">Pregunta de texto</option>
                <option value="truefalse">Verdadero/Falso</option>
                <option value="multiplechoice">Opción Múltiple</option>
            </select>
            <br>
        `;
        questionsContainer.appendChild(questionDiv);
    }

    document.getElementById('submitBtn').style.display = 'block';
}

function submitForm() {
    var answers = '';

    for (var i = 1; i <= parseInt(document.getElementById('numQuestions').value); i++) {
        var questionType = document.getElementById('questionType' + i).value;
        answers += `Pregunta ${i}: ${questionType}\n`;
    }

    document.getElementById('answers').value = answers;
}
