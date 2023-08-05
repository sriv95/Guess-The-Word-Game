var secretWord = "banana";
    function readSecretWordFromFile() {
        fetch("Games/001.txt")
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