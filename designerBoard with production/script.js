		        let arrayCount = 1; // Counter for arrays

        document.getElementById("numbers").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                calculateAndAddAverages();
            }
        });

        function calculateAndAddAverages() {
            const textareaElement = document.getElementById("numbers");
            const averagesElement = document.getElementById("averages");

            const inputLines = textareaElement.value.split('\n').map(line => line.trim());

            averagesElement.innerHTML = ''; // Clear existing averages

            for (let i = 0; i < inputLines.length; i++) {
                const line = inputLines[i];
                const values = line.split(/\s+/).map(value => parseFloat(value.trim()));

                if (!isNaN(values[0])) { // Exclude the first number in each line
                    const total = values.slice(1).reduce((sum, value) => sum + value, 0);
                    const average = total / (values.length - 1); // Exclude the first number

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

                    // Insert the new average
                    averagesElement.appendChild(newAverageContainer);

                    // Increment the array counter
                    arrayCount++;
                }
            }

            // Clear the input field
            textareaElement.value = "";
        }

        function clearAll() {
            const textareaElement = document.getElementById("numbers");
            const averagesElement = document.getElementById("averages");

            // Clear input field and averages
            textareaElement.value = "";
            averagesElement.innerHTML = ""; // Clear all child elements
            arrayCount = 1; // Reset the array counter
        };
		


    // Define a global variable and assign it a value
    var designerName = "Vener"; // Assign any default value or leave it empty

    // Function to update the content of the designer div
    function updateDesigner() {
        // Get the designer div element
        var designerDiv = document.getElementById("designer");
        
        // Update the content of the designer div with the value of the global variable
        designerDiv.innerText = designerName;
    }

    // Call the function to initially update the designer div
    updateDesigner();

    // Function to add text to the end of the content within a div
    function addTextToDiv(className, additionalText) {
        var containers = document.getElementsByClassName(className); // Get all elements with the specified class
        for (var i = 0; i < containers.length; i++) { // Loop through each container
            var buttons = containers[i].getElementsByClassName('button'); // Get all buttons inside the container
            for (var j = 0; j < buttons.length; j++) { // Loop through each button
                var button = buttons[j];
                var currentText = button.getAttribute('onclick'); // Get the current onclick attribute value
                // Replace '-designer' with the updated string
                var updatedText = currentText.replace('-designer', '-' + designerName );
                button.setAttribute('onclick', updatedText); // Update the onclick attribute value
            }
        }
    }

    // Call the function with the appropriate parameters
    addTextToDiv('button-container', '');
	
	
	
	
        // Initial job and instance ID generation on page load
        generateRandomJobID();
        generateRandomInstanceID(); 



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

                // Display elapsed time
                const elapsedTime = Date.now() - timerStartTime;
                const formattedElapsedTime = formatTime(elapsedTime);
                document.getElementById('elapsedTime').innerText = `Elapsed Time: ${formattedElapsedTime}`;
            }
        }

        function resetTimer() {
            stopTimer();
            document.getElementById('timer').innerText = '00:00:00.000';
            document.getElementById('elapsedTime').innerText = '';
            generateRandomJobID();
            generateRandomInstanceID();
        }

        function updateTimer() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - timerStartTime;
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

        function generateRandomJobID() {
            const randomJobID = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
            document.getElementById('jobID').innerText = randomJobID;
        }

        function generateRandomInstanceID() {
            const randomInstanceID = Math.floor(10000 + Math.random() * 90000); // 4-digit random number
            document.getElementById('instanceID').innerText = randomInstanceID;
        }

        function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            const text = element.innerText;


            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);


            textarea.select();
            document.execCommand('copy');


            document.body.removeChild(textarea);


            element.style.backgroundColor = '#dff0d8'; // Light Green
            setTimeout(() => {
                element.style.backgroundColor = '#f5f5f5'; // Light Gray
            }, 1000);
        }

        
        // Function to generate random code based on the current date
        function generateRandomCode(type) {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getFullYear()}`;

            const code = `${type}${formattedDate}`;

            // Create a text area to hold the text temporarily
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = code;
            document.body.appendChild(tempTextArea);

            // Select and copy the text
            tempTextArea.select();
            document.execCommand('copy');

            // Remove the temporary text area
            document.body.removeChild(tempTextArea);
        }


		document.querySelectorAll('.note-cell[contenteditable="false"]').forEach(function(cell) {
            cell.addEventListener('click', function() {
                copyToClipboard(cell.id);
            });
        });

        function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            const text = element.innerText;

            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);

            textarea.select();
            document.execCommand('copy');

            document.body.removeChild(textarea);

            element.style.backgroundColor = '#55c360'; // Light Green
            setTimeout(() => {
                element.style.backgroundColor = '#1a202c'; // Light Gray
            }, 1000);
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


        function clearText(elementId) {
            const element = document.getElementById(elementId);
            element.innerHTML = ''; // Clear the inner HTML
            element.innerText = ''; // Clear the text content
            element.style.color = '#fff';
            element.style.fontSize = '13px';
            element.style.fontWeight = 'bold';
        }


        function handleDivisionInput(event) {
            if (event.key === 'Enter') {
                event.preventDefault();

                const inputElement = document.getElementById('divisionInput');
                const resultElement = document.getElementById('divisionResult');

                const inputValue = parseFloat(inputElement.innerText.replace(/,/g, ''));

                if (!isNaN(inputValue)) {
                    // Divide the input value by 12 and display the result in the second button
                    const result = inputValue / 12;
                    resultElement.innerText = result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Display result with commas
                } else {
                    // If the input is not a valid number, display an error or handle it accordingly
                    resultElement.innerText = 'Invalid Input';
                }
            }
        };
		

		
		
		
		
		
		
		
		
		
		
// Declare a global variable to store the calculated production
var calculatedProduction = 0;
var totalACOutput = 0; // New variable to store the total AC output

function organizeLogs() {
    var logInputText = document.getElementById('logInput').value;
    var annualInputText = document.getElementById('annualInput').value;
    var arrayLogs = logInputText.split('Array ');
    var organizedLogs = [];
    calculatedProduction = 0; // Reset calculated production for each call of the function
    totalACOutput = 0; // Reset total AC output for each call of the function
    var arrayCount = 0;
    var adjustedACOutputs = {}; // Object to store adjusted AC outputs organized by array number

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

            // Add annual AC output to total AC output
            totalACOutput += annualACOutput;

            // Multiply the annual AC output by 98% and add to calculated production
            var adjustedACOutput = annualACOutput * 0.98;
            calculatedProduction += adjustedACOutput;
            adjustedACOutputs[arrayNumber] = adjustedACOutput; // Store adjusted AC output in the object organized by array number
			
            arrayCount++;

            organizedLogs.push({
                arrayNumber: arrayNumber,
                noOfPanels: noOfPanels,
                azimuth: azimuth,
                tilt: tilt,
                annualACOutput: annualACOutput,
                adjustedACOutput: adjustedACOutput // Store adjusted AC output in organizedLogs
            });
        }
    }

    // Convert annualInputText to a float for arithmetic operation
    var annualInputValue = parseFloat(annualInputText.replace(/[^\d.]/g, ''));
    var prodDiff = Math.abs(annualInputValue - totalACOutput);
    console.log("Total AC Output:", totalACOutput);
    console.log("Production Difference:", prodDiff);
    var percentage = prodDiff / totalACOutput;
    console.log("Percentage:", percentage);

    // Calculate and log the adjusted AC output for each array
    for (var k = 0; k < organizedLogs.length; k++) {
        var originalACOutput = organizedLogs[k].annualACOutput;
        var adjustedACOutput = originalACOutput - (originalACOutput * percentage);
        console.log(`Adjusted AC Output for Array ${organizedLogs[k].arrayNumber}:`, adjustedACOutput);
        organizedLogs[k].adjustedACOutput = adjustedACOutput; // Update adjusted AC output in organizedLogs
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
						   <p>${log.adjustedACOutput}</p>`; // Include adjusted AC output
        logContainer.appendChild(logBox);
    }
	

    document.getElementById('logInput').value = '';
}

// Call the organizeLogs function
organizeLogs();







		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

        function clearLogs() {
            
            document.getElementById('logInput').value = '';
            document.getElementById('logContainer').innerHTML = '';
        };
		function copyText(button, text) {
        
        var textarea = document.createElement('textarea');
        textarea.value = text;     
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        button.classList.add('copied');

        
        setTimeout(function() {
            button.classList.remove('copied');
        }, 300);
    }

    function personalizedResponse(buttonNumber) {
        // Replace these placeholders with personalized responses for buttons 11 and 12
        let response;
        if (buttonNumber === 'Button 11') {
            response = 'Personalized response for Button 11';
        } else if (buttonNumber === 'Button 12') {
            response = 'Personalized response for Button 12';
        }
        alert(response);
    };
	
	    function copyText(button, message) {
        var value = button.parentElement.parentElement.querySelector('.note-cell-empty').innerText;
        message = message.replace("NAME", value);
        // Copy text to clipboard (you can use your existing code for this)
        // For example, you can use the following code to copy text to clipboard:
        navigator.clipboard.writeText(message).then(function() {
            alert('Text copied to clipboard: ' + message);
            // You can add any other actions you want to perform after copying here
        }, function(err) {
            alert('Could not copy text: ', err);
        });
    };







 function processPastedText() {
            var pastedText = document.getElementById('textArea').innerText;
            var numbers = pastedText.match(/[\d,]+/g);

            if (numbers && numbers.length > 12) {
                var productionData = numbers.slice(-12).map(function(num) {
                    return num.replace(/,/g, ''); // Remove commas
                });

                var consumptionBar = document.getElementById('textArea');
                consumptionBar.innerHTML = '';

                productionData.forEach(function(number) {
                    var box = document.createElement('div');
                    box.classList.add('box');
                    box.textContent = number;
                    consumptionBar.appendChild(box);
                });
            }
        }

        document.getElementById('textArea').addEventListener('input', function(e) {
            setTimeout(processPastedText, 10);
        });

        function clearTextArea() {
            var clearButton = document.querySelector('.clear-button');
            clearButton.style.backgroundColor = '#6c757d'; 
            setTimeout(() => {
                clearButton.style.backgroundColor = '#55c360'; 
            }, 200);
            
            try {
                var textArea = document.getElementById('textArea');
                textArea.innerHTML = ''; 
                processPastedText(); 
            } catch (error) {
                console.error('Error clearing text area:', error);
            }
        }

</script>