let timerInterval;
let timerStartTime;
let timerRunning = false;
let timerPaused = false;
let pausedTime = 0;

function startTimer() {
    if (!timerRunning) {
        if (timerPaused) {
            timerStartTime = Date.now() - pausedTime;
        } else {
            timerStartTime = Date.now();
        }
        timerInterval = setInterval(updateTimer, 10);
        timerRunning = true;
        timerPaused = false;
    }
}

function pauseTimer() {
    if (timerRunning && !timerPaused) {
        clearInterval(timerInterval);
        pausedTime = Date.now() - timerStartTime;
        timerPaused = true;
    }
}

function resumeTimer() {
    if (timerRunning && timerPaused) {
        timerStartTime = Date.now() - pausedTime;
        timerInterval = setInterval(updateTimer, 10);
        timerPaused = false;
    }
}

function stopTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        displayElapsedTime();
    }
}

function resetTimer() {
    stopTimer();
    resetDisplay();
    generateRandomJobID();
    generateRandomInstanceID();
}

function updateTimer() {
    const elapsedTime = Date.now() - timerStartTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('timer').innerText = formattedTime;
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millis = milliseconds % 1000;

    return (
        padZero(hours) + ':' +
        padZero(minutes) + ':' +
        padZero(seconds) + '.' +
        padZero(millis, 3)
    );
}

function padZero(value, length = 2) {
    return value.toString().padStart(length, '0');
}

function displayElapsedTime() {
    const elapsedTime = Date.now() - timerStartTime;
    const formattedElapsedTime = formatTime(elapsedTime);
    document.getElementById('elapsedTime').innerText = `Elapsed Time: ${formattedElapsedTime}`;
}

function resetDisplay() {
    document.getElementById('timer').innerText = '00:00:00.000';
    document.getElementById('elapsedTime').innerText = '';
}

function handleNoteClick(element) {
    element.classList.add('clicked');
    if (element.innerText === 'Add your notes here') {
        element.innerText = '';
    }
    element.contentEditable = true;

    // Handle paste event to preserve styles
    element.addEventListener('paste', (event) => {
        event.preventDefault();
        const text = (event.clipboardData || window.clipboardData).getData('text/plain');

        // Remove existing content before inserting the pasted text
        document.execCommand('selectAll', false, null);
        document.execCommand('delete', false, null);

        document.execCommand('insertHTML', false, `<span style="color: ${element.style.color}; font-size: ${element.style.fontSize}; font-weight: ${element.style.fontWeight}">${text}</span>`);
    });
}

document.querySelectorAll('.note-cell[contenteditable="false"]').forEach(function(cell) {
    cell.addEventListener('click', function() {
        copyToClipboard(cell.id);
    });
});

function clearText(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    element.innerText = '';
    element.style.color = '#fff';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'bold';
}

function generateRandomJobID() {
    const randomJobID = Math.floor(10000 + Math.random() * 90000);
    document.getElementById('jobID').innerText = randomJobID;
}

function generateRandomInstanceID() {
    const randomInstanceID = Math.floor(10000 + Math.random() * 90000);
    document.getElementById('instanceID').innerText = randomInstanceID;
}


function copyToClipboard(elementId) {
    // Get the element by ID
    const element = document.getElementById(elementId);
    
    // Get the text content of the element
    const text = element.innerText;

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Append the textarea to the document body
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea from the document body
    document.body.removeChild(textarea);
}


function handleDivisionInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        const inputElement = document.getElementById('divisionInput');
        const resultElement = document.getElementById('divisionResult');

        const inputValue = parseFloat(inputElement.innerText.replace(/,/g, ''));

        if (!isNaN(inputValue)) {
            const result = inputValue / 12;
            resultElement.innerText = formatNumber(result);
        } else {
            resultElement.innerText = 'Invalid Input';
        }
    }
}

function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

let arrayCount = 1;

document.getElementById("numbers").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        calculateAndAddAverages();
    }
});

function calculateAndAddAverages() {
    const textareaElement = document.getElementById("numbers");
    const averagesElement = document.getElementById("averages");

    averagesElement.innerHTML = '';
    let currentValues = [];
    let currentTotal = 0;
    let currentItemCount = 0;

    const inputLines = textareaElement.value.split('\n').map(line => line.trim());

    for (const line of inputLines) {
        const value = parseFloat(line);

        if (!isNaN(value)) {
            currentValues.push(value);
            currentTotal += value;
            currentItemCount++;

            if (currentItemCount === 13) {
                const average = currentTotal / 12;

                const newAverageContainer = document.createElement('div');
                newAverageContainer.classList.add('average-container');

                const arrayLabel = document.createElement('div');
                arrayLabel.classList.add('tooltip');
                arrayLabel.textContent = `Array ${arrayCount}`;
                newAverageContainer.appendChild(arrayLabel);

                const newAverageItem = document.createElement('div');
                newAverageItem.classList.add('average-item');
                newAverageItem.textContent = `${average.toFixed(2)}`;
                newAverageContainer.appendChild(newAverageItem);

                averagesElement.appendChild(newAverageContainer);

                arrayCount++;

                currentItemCount = 0;
                currentTotal = 0;
                currentValues = [];
            }
        }
    }

    textareaElement.value = "";
}

function clearAll() {
    const textareaElement = document.getElementById("numbers");
    const averagesElement = document.getElementById("averages");

    textareaElement.value = "";
    averagesElement.innerHTML = "";
    arrayCount = 1;
};

// Global variables for log processing
var calculatedProduction = 0;
var totalACOutput = 0;

// Function to organize logs
function organizeLogs() {
    var logInputText = document.getElementById('logInput').value;
    var annualInputText = document.getElementById('annualInput').value;

    var arrayLogs = logInputText.split('Array ');
    var organizedLogs = [];
    calculatedProduction = 0;
    totalACOutput = 0;
    var arrayCount = 0;
    var adjustedACOutputs = {};

    for (var i = 1; i < arrayLogs.length; i++) {
        var arrayInfo = arrayLogs[i].split('\n');
        var arrayNumberMatch = arrayInfo[0].match(/^(\d+)/);
        if (arrayNumberMatch) {
            var arrayNumber = parseInt(arrayNumberMatch[1]);
            var noOfPanels = arrayInfo[1].trim().split(' ')[0];
            var azimuth = arrayInfo[1].match(/Azimuth = ([^,]+)/)[1];
            var tilt = arrayInfo[1].match(/Tilt = ([^,]+)/)[1];
            var annualACOutputMatch = arrayInfo.find(line => line.includes("Annual AC output"));
            var annualACOutput = annualACOutputMatch ? parseFloat(annualACOutputMatch.trim().split(' ')[4]) : 'N/A';

            totalACOutput += annualACOutput;

            var adjustedACOutput = annualACOutput * 0.98;
            calculatedProduction += adjustedACOutput;
            adjustedACOutputs[arrayNumber] = adjustedACOutput;

            arrayCount++;

            organizedLogs.push({
                arrayNumber: arrayNumber,
                noOfPanels: noOfPanels,
                azimuth: azimuth,
                tilt: tilt,
                annualACOutput: annualACOutput,
                adjustedACOutput: adjustedACOutput
            });
        }
    }

    var annualInputValue = parseFloat(annualInputText.replace(/[^\d.]/g, ''));
    var prodDiff = Math.abs(annualInputValue - totalACOutput);
    var percentage = prodDiff / totalACOutput;

    for (var k = 0; k < organizedLogs.length; k++) {
        var originalACOutput = organizedLogs[k].annualACOutput;
        var adjustedACOutput = originalACOutput - (originalACOutput * percentage);
        organizedLogs[k].adjustedACOutput = adjustedACOutput.toFixed(2);
    }

    organizedLogs.sort((a, b) => a.arrayNumber - b.arrayNumber);

    var logContainer = document.getElementById('logContainer');
    logContainer.innerHTML = '';

    for (var j = 0; j < organizedLogs.length; j++) {
        var log = organizedLogs[j];
        var logBox = document.createElement('div');
        logBox.className = 'log-box';
        logBox.innerHTML = `<p>Array ${log.arrayNumber}</p>
                           <p>No. of Panels: ${log.noOfPanels}</p>
                           <p>Azimuth: ${log.azimuth}</p>
                           <p>Tilt: ${log.tilt}</p>
                           <p>AC Output: ${log.annualACOutput}</p>
                           <p>Production:</p>
                           <p>${log.adjustedACOutput}</p>`;
        logContainer.appendChild(logBox);
    }

    document.getElementById('logInput').value = '';
}


let designerName = ""; // Variable to store the designer name

function handleKeyUp(event) {
    if (event.key === "Enter") {
        // Assign input value to designerName variable
        designerName = document.getElementById("designer").value;
        // Call function to update button texts
        addTextToDiv('button-container', designerName);
        // You can access designerName variable here or perform other actions
        console.log("Designer Name: ", designerName);
    }
}

function addTextToDiv(className, designerName) {
    var containers = document.getElementsByClassName(className);
    for (var i = 0; i < containers.length; i++) {
        var buttons = containers[i].getElementsByClassName('button');
        for (var j = 0; j < buttons.length; j++) {
            var button = buttons[j];
            var currentText = button.getAttribute('onclick');
            var updatedText = currentText.replace(/-designer/g, '-' + designerName);
            button.setAttribute('onclick', updatedText);
        }
    }
}



function copyText(button, message) {
    var value = button.parentElement.parentElement.querySelector('.note-cell-empty').innerText;
    message = message.replace("NAME", value);
    navigator.clipboard.writeText(message).then(function() {
    }, function(err) {
        alert('Could not copy text: ', err);
    });
}



function applyCss() {
    // Get the select element
    const selectElement = document.getElementById("css-selector");
    
    // Get the selected value
    const selectedValue = selectElement.value;

    // Define the CSS file paths based on the selected value
    const cssFilePaths = {
        "gray": "01-css/style-grey-blue.css",
        "soft-pink": "01-css/style-pink.css",
        "original": "01-css/style.css"
    };

    // Get the link element
    const linkElement = document.getElementById("css-link");

    // Update the href attribute of the link element based on the selected value
    if (cssFilePaths[selectedValue]) {
        linkElement.href = cssFilePaths[selectedValue];
    } else {
        // Handle any other cases
        console.error("Invalid CSS option:", selectedValue);
    }
}



    generateRandomJobID();
    generateRandomInstanceID();
	organizeLogs();
	
	
	
	
function processPastedText() {
    const pastedText = document.getElementById('textArea').innerText;
    const numbers = pastedText.match(/[\d,]+/g);

    if (numbers && numbers.length > 12) {
        const productionData = numbers.slice(-12).map(num => num.replace(/,/g, ''));

        const consumptionBar = document.getElementById('textArea');
        consumptionBar.innerHTML = '';

        productionData.forEach(number => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.textContent = number;
            consumptionBar.appendChild(box);
        });
    }
}

document.getElementById('textArea').addEventListener('input', function() {
    setTimeout(processPastedText, 10);
});

function clearTextArea() {
    try {
        const textArea = document.getElementById('textArea');
        textArea.innerHTML = '';
        processPastedText();
    } catch (error) {
        console.error('Error clearing text area:', error);
    }
}
