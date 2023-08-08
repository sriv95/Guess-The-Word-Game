    //start
    var secretWord = "banana";
    var gameid = "001";
    document.getElementById("info_gameid").value = "เกมที่: #" + gameid;
    function readSecretWordFromFile() {
        fetch("Games/" + gameid + ".txt")
            .then((response) => response.text())
            .then((data) => {
            const lines = data.split("\n");
            if (lines.length > 0) {
                secretWord = lines[0].trim();
            }
            })
            .catch((error) => {
            console.error("Error reading the secret word:", error);
            });
        }
    readSecretWordFromFile();
    var guessCount = 0;
    var gameend = 0;

    //confetti
    const jsConfetti = new JSConfetti()
    
    //mutesfx
    var ismutesfx = false;
    function mutesfx() {
        ismutesfx = !ismutesfx;
        if (!ismutesfx) {
            document.getElementById('mutesfxbutton').value = "ปิดเสียง";
            document.getElementById('mutesfxspan').innerHTML = "🔇";
        }
        else {
            document.getElementById('mutesfxbutton').value = "เปิดเสียง"
            document.getElementById('mutesfxspan').innerHTML = "🔊";
        }
        }
        
    //hitsound
    const typingSound = document.getElementById("hitsound");
    const textBoxGuess = document.getElementById("textbox_guess");
    textBoxGuess.addEventListener("input", playTypingSound);
    function playTypingSound() {
        if (!ismutesfx) {
      const newTypingSound = new Audio("assets/hitsound.mp3");
      newTypingSound.play();
    }
    }
    
    //stopwatch
    const startTime = Date.now();
    stopwatch = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const stopwatchDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('info_stopwatch').value = "เวลาที่ใช้: " +stopwatchDisplay+ "";
    }, 1000);
    
    //modal
    var modal = document.getElementById("modal");
    var modalinput = document.getElementById("modalinput");
    var modalp = document.getElementById("modalp");
    function destroyModal() {
        var destroymodalsound = document.getElementById("destroymodalsound");
        if (!ismutesfx) {
            if (modal.style.opacity == 1){
                destroymodalsound.play();
            }
        }
        modal.style.opacity = 0 
    }
    function howtoplayModal() { modal.style.opacity = 1;
        modalinput.value = "❔วิธีเล่น";
        modalinput.style.fontSize = "xx-large";
        modalp.innerHTML = "พิมพ์คำศัพท์ลงในช่องเดาคำศัพท์ไปเรื่อยๆจนกว่าจะถูก<br></br>โดยที่คะแนนจะเรียงตามความใกล้เคียง";
    }
    function creditsModal() { modal.style.opacity = 1;
        modalinput.style.fontSize = "xx-large";
        modalinput.value = "📜 ผู้จัดทำ";
        modalp.innerHTML = "นาย ชินภัทร เมืองใจ เลขที่ 27 ม.6/13<br></br>นาย ณัฐภัทร วรรณภิละ เลขที่ 31 ม.6/13<br></br>นาย ทินภัทร ศรีวิชัย เลขที่ 36 ม.6/13";
    }
    //view result
    function endModal() { modal.style.opacity = 1;
        if (gameend != 0) {
            clearInterval(stopwatch);
        document.getElementById("textbox_guess_li").style.opacity = 0;
        document.getElementById("checkbutton").style.opacity = 0;
        document.getElementById("viewresultbutton").style.opacity = 1;
        document.getElementById("viewresultbutton").style.setProperty('--i',1)
    
        const nextGameId = (parseInt(gameid) + 1).toString().padStart(3, "0");
    fetch("Games/" + nextGameId + ".txt")
    .then((response) => {
      if (response.status === 200) {
        document.getElementById("nextgamebutton").style.opacity = 1;
        document.getElementById("nextgamebutton").style.setProperty('--i', 1);
      }
    })
    .catch((error) => {
    gameend=0
      document.getElementById("nextgamebutton").style.opacity = 0;
      document.getElementById("nextgamebutton").style.setProperty('--i', -2);
      console.error("Error next game not found:", error);
    });
        }
        
    }
    
    //giveup
    function giveup() { 
        if (confirm("คุณแน่ใจหรือไม่ ที่จะยอมแพ้?")) {
            modal.style.opacity = 1;
            gameend = -1;
            endModal()
            modalinput.value = "🎈ขอให้โชคดีในครั้งหน้า🎈";
            modalinput.style.fontSize = "large";
            modalp.innerHTML = "เฉลยคือ: " +secretWord+" <br></br><br></br> คุณยอมแพ้ <br></br> ภายในการเดา <strong>" + guessCount + "</strong> คำ";
        }
    }
    //filter alphabet
    function validateAlphabetInput(event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    const alphabetRegex = /^[a-zA-Z]*$/;
    
    if (!alphabetRegex.test(inputValue)) {
        inputElement.value = inputValue.replace(/[^a-zA-Z]/g, '');
    }
    }
    //hint
    var hintCooldown = false;
    var guessedHints = [];
    
    function gethint() {
        if (hintCooldown) {
            return;
        }
        if (gameend != 0) {
            return;
        }
        var table = document.getElementById("wordguessedlist");
        var numRows = table.rows.length;
        var totalHints = 50;
        var hintRange = 50;
        if (numRows >= totalHints) {
            totalHints += hintRange;
        }
        if (guessedHints.length >= totalHints) {
            return;
        }
        var hintsToGuess = [];
        for (var i = guessedHints.length + 1; i <= totalHints; i++) {
            hintsToGuess.push(i);
        }
        hintsToGuess = hintsToGuess.filter((hint) => !guessedHints.includes(hint));
        var randomIndex = Math.floor(Math.random() * hintsToGuess.length);
        var hintToGuess = hintsToGuess[randomIndex];
        guessedHints.push(hintToGuess);
        var hintsCount = document.getElementById("info_hintcount");
        hintsCount.value = "จำนวนคำใบ้ที่ใช้: " + guessedHints.length;
        fetch("Games/" + gameid + ".txt")
            .then((response) => response.text())
            .then((data) => {
                const lines = data.split("\n");
                if (lines.length >= hintToGuess) {
                    var hintWord = lines[hintToGuess - 1].trim();
                    document.getElementById("textbox_guess").value = hintWord;
                    checkGuess();
                    if (!ismutesfx) {
            document.getElementById("hintsound").play();
        }
                }
            })
            .catch((error) => {
                console.error("Error reading the hint word:", error);
            });
        hintCooldown = true;
        setTimeout(() => {
            hintCooldown = false;
        }, 2000);
    }
    
    //check Guess
    function checkGuess() {
        //animate
        const checkButton = document.getElementById("checkbutton");
    const textBox = document.getElementById("textbox_guess_li");
    checkButton.style.animation = "moveCheckButton 0.25s";
    textBox.style.animation = "shakeTextBox 0.5s";
    setTimeout(() => {
    checkButton.style.animation = "";
    textBox.style.animation = "";
    }, 500);
        if (gameend == 0) {
        var varguess = document.getElementById("textbox_guess");
        var vartext = varguess.value.trim().toLowerCase();
        if (vartext.trim() === '') {
            alert('กรุณาใส่คำก่อนตรวจคำตอบ!');
            return;
        }
        var table = document.getElementById("wordguessedlist");
        for (var i = 0; i < table.rows.length; i++) {
            var firstCell = table.rows[i].cells[0];
            if (firstCell.innerHTML === vartext) {
            alert("คำนี้ถูกใช้ไปแล้ว!");
            return;
            }
        }
        guessCount++;
        var guesses = document.getElementById("info_guessescount");
        guesses.value = "จำนวนคำที่ใช้: " + guessCount;
        if (vartext === secretWord.toLowerCase()) {
            gameend = 1;
            endModal();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti({emojis: ['🌈', '💥', '✨', '🌸','🦄'],});
             if (!ismutesfx) {
                document.getElementById("congratsound").volume=0.5;
                document.getElementById("congratsound").play();
            }
            modalinput.value = "🎉Congratulations!🎉";
            modalinput.style.fontSize = "large";
            modalp.innerHTML = "เฉลยคือ: " +secretWord+" <br></br><br></br> คุณตอบถูก <br></br> ภายในการเดา <strong>" + guessCount + "</strong> คำ";
        }
    
        fetch("Games/" + gameid + ".txt")
            .then((response) => response.text())
            .then((data) => {
            const lines = data.split("\n");
            const totalLines = lines.length;
            const secretWordIndex = lines.findIndex((line) => line.trim() === vartext);
            var similarity = 0.00
            if (secretWordIndex !== -1) {
                similarity = ((totalLines - secretWordIndex) / (totalLines/100)).toFixed(2);
            }

            var searchButton = document.createElement("button");
            searchButton.className = "search-button";
            var searchIcon = document.createElement("img");
            searchIcon.src = "assets/searchimg.png";
            searchIcon.className = "search-icon";
            searchButton.appendChild(searchIcon);

            var translateButton = document.createElement("button");
            translateButton.className = "translate-button";
            var translateIcon = document.createElement("img");
            translateIcon.src = "assets/translateimg.png";
            translateIcon.className = "translate-icon";
            translateButton.appendChild(translateIcon);

                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                if (similarity < 50) {
                    cell1.className = "lcoral";
                } else if (similarity >= 50 && similarity < 90) {
                    cell1.className = "lsalmon";
                } else {
                    cell1.className = "lgreen";
                }  
                cell1.innerHTML = ""+ vartext +"";
                cell2.innerHTML = ""+ similarity +"%";
                cell1.appendChild(searchButton);
                cell1.appendChild(translateButton);
                var rows = table.rows;
            var numRows = rows.length;
            for (var i = 2; i < numRows; i++) {
                var maxIndex = i;
                for (var j = i + 1; j < numRows; j++) {
                    var maxCellValue = parseInt(rows[maxIndex].cells[1].innerHTML);
                    var cellValue = parseInt(rows[j].cells[1].innerHTML);
                    if (cellValue > maxCellValue) {
                        maxIndex = j;
                    }
                }
                if (maxIndex !== i) {
                    var tempRow = rows[i].innerHTML;
                    rows[i].innerHTML = rows[maxIndex].innerHTML;
                    rows[maxIndex].innerHTML = tempRow;
                }
            }
            if (!ismutesfx) {
            if (!ismutesfx) {
            document.getElementById("checksound").play();
        }
        }
            });
        document.getElementById("textbox_guess").value = ''
        }
    }
    document.getElementById('textbox_guess').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
        if (gameend == 0) {
            checkGuess();
        }
    }
    });
    
    //next game
    function nextgame() {
    if (gameend != 0) {
    var nextGameId = (parseInt(gameid) + 1).toString().padStart(3, "0");
    gameid = nextGameId;
    document.getElementById("info_gameid").value = "เกมที่: #" + gameid;
    fetch("Games/" + gameid + ".txt")
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split("\n");
        if (lines.length > 0) {
          secretWord = lines[0].trim();
        }
        loadNewGame();
      })
      .catch((error) => {
        console.error("Error reading the secret word:", error);
      });
    }}
    function loadNewGame() {
    if (!ismutesfx) {
            document.getElementById("nextgamesound").play();
        }
    guessCount = 0;
    gameend = 0;
    guessedHints = [];
    document.getElementById("info_stopwatch").value = "เวลาที่ใช้: 0:00";
    document.getElementById("info_guessescount").value = "จำนวนคำที่ใช้: 0";
    document.getElementById("info_hintcount").value = "จำนวนคำใบ้ที่ใช้: 0";
    document.getElementById("textbox_guess").value = "";
    var table = document.getElementById("wordguessedlist");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    document.getElementById("textbox_guess_li").style.opacity = 1;
    document.getElementById("checkbutton").style.opacity = 1;
    document.getElementById("viewresultbutton").style.opacity = 0;
    document.getElementById("viewresultbutton").style.setProperty('--i',-1)
    document.getElementById("nextgamebutton").style.opacity = 0;
    document.getElementById("nextgamebutton").style.setProperty('--i',-1)
    destroyModal()
    clearInterval(stopwatch);
    const startTime = Date.now();
    stopwatch = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const stopwatchDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('info_stopwatch').value = "เวลาที่ใช้: " + stopwatchDisplay + "";
    }, 1000);
    }
    
    //tr google search
    function openGoogleSearch(word) {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(word)}`;
    window.open(searchUrl, "_blank");
    }

    //tr translate
    function openGoogleTranslate(word) {
        const translateUrl = `https://translate.google.com/?sl=en&tl=th&text=${encodeURIComponent(word)}`;
        window.open(translateUrl, "_blank");
      }

    const table = document.getElementById("wordguessedlist");
    table.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "IMG") {
      const word = target.parentElement.parentElement.textContent.trim();
      if (target.className==="search-icon") {
        openGoogleSearch(word);
      } else if (target.className==="translate-icon") {
        openGoogleTranslate(word);
      }
    }
    });