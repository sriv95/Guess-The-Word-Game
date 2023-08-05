function checkGuess() {
    var varguess = document.getElementById("guess");
    var vartext = varguess.value;
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
    var guesses = document.getElementById("guesses");
    guesses.innerHTML = "จำนวนคำ: <strong>" + guessCount + "</strong>";
    if (vartext === secretWord) {
        gameend++;
        showModal();
        var thewordwas = document.getElementById("thewordwas");
        thewordwas.innerHTML = "เฉลยคือ <strong>" + vartext + "</strong>";
        var yougotit = document.getElementById("yougotit");
        yougotit.innerHTML = "คุณเดาถูกภายใน <strong>" + guessCount + "</strong> คำ";
    }

    fetch("Games/001.txt")
        .then((response) => response.text())
        .then((data) => {
        const lines = data.split("\n");
        const totalLines = lines.length;
        const secretWordIndex = lines.findIndex((line) => line.trim() === vartext);
        var similarity = 0.0
        if (secretWordIndex !== -1) {
            similarity = ((totalLines - secretWordIndex) / 10).toFixed(1);
        }
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            if (similarity < 50) {
                cell1.className = "lcoral";
            } else if (similarity >= 50 && similarity < 75) {
                cell1.className = "lsalmon";
            } else {
                cell1.className = "lgreen";
            }  
            cell1.innerHTML = ""+ vartext +"";
            cell2.innerHTML = ""+ similarity +"%";
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
        });
    document.getElementById('guess').value = '';
    }