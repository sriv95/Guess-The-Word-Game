    //start
    var secretWord = "banana";
    var gameid = "001";
    var lang = "th"
    if (lang === "th") {
        document.getElementById("info_gameid").value = "เกมที่: #" + gameid;
    }
    else if (lang === "en") {
        document.getElementById("info_gameid").value = "Game: #" + gameid;
    }
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
    if (lang === "th") {
        document.getElementById('info_stopwatch').value = "เวลาที่ใช้: " +stopwatchDisplay+ "";
    }
    else if (lang === "en") {
        document.getElementById('info_stopwatch').value = "Elapsed: " +stopwatchDisplay+ "";
    }
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
        if (lang === "th") {
            modalp.innerHTML = "พิมพ์คำศัพท์ลงในช่องเดาคำศัพท์ไปเรื่อยๆจนกว่าจะถูก<br></br>โดยที่คะแนนจะเรียงตามความใกล้เคียง";
        }
        else if (lang === "en") {
            modalp.innerHTML = "Keep typing the word in the word guess box until it is correct.<br></br>Where the similarity (%) are sorted by proximity";
        }
        if (!ismutesfx) {
            document.getElementById("clicksound").play();
        }
    }
    function creditsModal() { modal.style.opacity = 1;
        modalinput.style.fontSize = "xx-large";
        modalinput.value = "📜 ผู้จัดทำ";
        modalp.innerHTML = "นาย ชินภัทร เมืองใจ<br></br>เลขที่ 27 ม.6/13<br></br>นาย ณัฐภัทร วรรณภิละ<br></br>เลขที่ 31 ม.6/13<br></br>นาย ทินภัทร ศรีวิชัย<br></br>เลขที่ 36 ม.6/13";
        if (!ismutesfx) {
            document.getElementById("clicksound").play();
        }
    }
    function changelang() {
        if (lang === "th") {
            lang = "en"
            document.getElementById("info_gameid").value = "Game: #" + gameid;
            document.getElementById("info_stopwatch").value = "Elapsed: X:XX";
            document.getElementById("info_hintcount").value = "Hints: " + guessedHints.length;
            document.getElementById("info_guessescount").value = "Guesses: " + guessCount;
            document.getElementById("textbox_guess").placeholder = "type a word";
            document.getElementById("tabletitle1").innerHTML = "Guessed Word";
            document.getElementById("tabletitle2").innerHTML = "Similarity (%)";
            document.getElementById("howtoplay_btn").value = "HowToPlay"
            document.getElementById("gethint_btn").value = "Hint";
            document.getElementById("giveup_btn").value = "Give Up";
            document.getElementById("credits_btn").value = "Credits";
            document.getElementById("mutesfxbutton").value = "Mute SFX";
            document.getElementById("mutebgmbtn").value = "Mute BGM";
            document.getElementById("changelangbtn").value = "ภาษาไทย";
        }
        else if (lang === "en") {
            lang = "th"
            document.getElementById("info_gameid").value = "เกมที่: #" + gameid;
            document.getElementById("info_stopwatch").value = "เวลาที่ใช้: X:XX";
            document.getElementById("info_hintcount").value = "จำนวนคำใบ้ที่ใช้: " + guessedHints.length;
            document.getElementById("info_guessescount").value = "จำนวนคำที่ใช้: " + guessCount;
            document.getElementById("textbox_guess").placeholder = "พิมพ์คำลงในช่องนี้";
            document.getElementById("tabletitle1").innerHTML = "คำที่เดาไปแล้ว";
            document.getElementById("tabletitle2").innerHTML = "ความถูกต้อง (%)";
            document.getElementById("howtoplay_btn").value = "วิธีเล่น";
            document.getElementById("gethint_btn").value = "คำใบ้";
            document.getElementById("giveup_btn").value = "ยอมแพ้";
            document.getElementById("credits_btn").value = "ผู้จัดทำ";
            document.getElementById("mutesfxbutton").value = "ปิดเสียง";
            document.getElementById("mutebgmbtn").value = "ปิดเพลง";
            document.getElementById("changelangbtn").value = "Language";
        }
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
        if (!ismutesfx) {
            document.getElementById("clicksound").play();
        }
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
        if (lang === "th") {
            hintsCount.value = "จำนวนคำใบ้ที่ใช้: " + guessedHints.length;
        }
        else if (lang === "en") {
            hintsCount.value = "Hints: " + guessedHints.length;
        }
        
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
        if (lang === "th") {
            guesses.value = "จำนวนคำที่ใช้: " + guessCount;
        }
        else if (lang === "en") {
            guesses.value = "Guesses: " + guessCount;
        }
        
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
                cell1.innerHTML = `${vartext} ${getEmojiForWord(vartext)}`;
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
    if (lang === "th") {
        document.getElementById("info_gameid").value = "เกมที่: #" + gameid;
    }
    else if (lang === "en") {
        document.getElementById("info_gameid").value = "Game: #" + gameid;
    }
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
    if (lang === "th") {
        document.getElementById("info_stopwatch").value = "เวลาที่ใช้: 0:00";
    }
    else if (lang === "en") {
        document.getElementById("info_stopwatch").value = "Elapsed: 0:00";
    }
    if (lang === "th") {
        document.getElementById("info_guessescount").value = "จำนวนคำที่ใช้: 0";
    }
    else if (lang === "en") {
        document.getElementById("info_guessescount").value = "Guesses: 0";
    }
    if (lang === "th") {
        document.getElementById("info_hintcount").value = "จำนวนคำใบ้ที่ใช้: 0";
    }
    else if (lang === "en") {
        document.getElementById("info_hintcount").value = "Hints: 0";
    }
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
    if (lang === "th") {
        document.getElementById('info_stopwatch').value = "เวลาที่ใช้: " +stopwatchDisplay+ "";
    }
    else if (lang === "en") {
        document.getElementById('info_stopwatch').value = "Elapsed: " +stopwatchDisplay+ "";
    }
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

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");
    const slider = document.querySelector(".slider input");
    
    let screen, stars, params = {speed: 2, number: 300, extinction: 4};
    
    setupStars();
    updateStars();
    
    slider.oninput = function () {
        params.speed = this.value;
    };
    
    // update stars on resize to keep the thing centered
    window.onresize = function () {
        setupStars();
    };
    
    // star constructor
    function Star() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
    
        this.move = function () {
            this.z -= params.speed;
            if (this.z <= 0) {
                this.z = canvas.width;
            }
        };
    
        this.show = function () {
            let x, y, rad, opacity;
            x = (this.x - screen.c[0]) * (canvas.width / this.z);
            x = x + screen.c[0];
            y = (this.y - screen.c[1]) * (canvas.width / this.z);
            y = y + screen.c[1];
            rad = canvas.width / this.z;
            opacity = (rad > params.extinction) ? 1.5 * (2 - rad / params.extinction) : 1;
    
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
            ctx.arc(x, y, rad, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function setupStars() {
        screen = {
            w: window.innerWidth,
            h: window.innerHeight,
            c: [window.innerWidth * 0.5, window.innerHeight * 0.5]
        };
        window.cancelAnimationFrame(updateStars);
        canvas.width = screen.w;
        canvas.height = screen.h;
        stars = [];
        for (let i = 0; i < params.number; i++) {
            stars[i] = new Star();
        }
    }
    
    function updateStars() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        stars.forEach(function (s) {
            s.show();
            s.move();
        });
        window.requestAnimationFrame(updateStars);
    }