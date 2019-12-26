if (confirm('Do you want to play a game?')) {

    const inGame = true;

    const defaultMaxPrize = 100;
    const defaultMaxRange = 8;

    let minRange = 0;
    let maxRange = defaultMaxRange;
    const maxAttemps = 3;
    let attempsLeft = maxAttemps;
    let maxPrize = defaultMaxPrize;
    let totalPrize = 0;

    let radmonPocket = Math.round(Math.random() * maxRange);

    const totalPrizeDividerKoef = 2;
    const maxRangeDelta = 4;

    do {
        const possiblePrize = maxPrize / Math.pow(totalPrizeDividerKoef, maxAttemps - attempsLeft);
        const uiString = `Choose a roulette pocket number from ${minRange} to ${maxRange}\n` +
                         `Attempts left: ${attempsLeft}\n` +
                         `Total prize: ${totalPrize} $\n` +
                         `Possible prize on current attempt: ${possiblePrize} $`;
        const guessedPocket = parseInt(prompt(uiString));
        if (isNaN(guessedPocket)) {
            break;
        }
        if (guessedPocket === radmonPocket) {
            totalPrize += possiblePrize;
            const winString = `Congratulation, you won! Your prize is: ${totalPrize} $. Do you want to continue?`;
            if (confirm(winString)) {
                // each code repetition and hardcode can be easily avoided with functions but they are forbidden
                maxRange += maxRangeDelta;
                maxPrize *= totalPrizeDividerKoef;
                attempsLeft = maxAttemps;
                radmonPocket = Math.round(Math.random() * maxRange);
            } else {
                const thanksString = `Thank you for your participation. Your prize is: ${totalPrize} $`;
                alert(thanksString);
                break;
            }
        } else {
            attempsLeft -= 1;
            if (attempsLeft <= 0) {
                const thanksString = `Thank you for your participation. Your prize is: ${totalPrize} $`;
                alert(thanksString);
                if (!confirm('Do you want to play again?')) {
                    break;
                } else {
                    totalPrize = 0;
                    maxPrize = defaultMaxPrize;
                    maxRange = defaultMaxRange;
                    attempsLeft = maxAttemps;
                    radmonPocket = Math.round(Math.random() * maxRange);
                }
            }
        }
    } while (inGame)

} else {
    alert('You did not become a billionaire, but can');
}