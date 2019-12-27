function makeNumber(string) {
    return string.split('').filter(c => parseInt(c)).join('');
}

// another solution based on regexpr
function makeNumber2(string) {
    let resultNums = [];
    let currResult;
    let regex = /\d+/g;
    while ((currResult = regex.exec(string)) !== null) {
        if (currResult.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        resultNums.push(currResult[0]);
    }
    return resultNums.join('');
}


const strings = [
    'dsfds3432dfs3232vc3',
    'khb7df7gdf8gydf7gdf78ghdf',
    'j423n4jk324njk32',
    'jn432jkn4j32k4n32jk4n',
    'j4n23kj4n23k4jn32k4',
    'jnjkn324jk324nkj23n4',
    '234j423jjkn243', 
    'a2'
];

for (let str of strings) {
    console.log(makeNumber(str))
}

console.log('----------------------------------');

for (let str of strings) {
    console.log(makeNumber2(str))
}

