function countNumbers(string) {
    // using the same pattern as in makeNumber solution
    let result = {};
    string.split('').filter(c => parseInt(c)).forEach(n => { 
        result[n] = (result[n] || 0) + 1 
    });
    return result;
}

const strings = [
    'dskjfnsjn23jnfjk2njfn34354353465783465347385345', 
    'dsfds3432dfs3232vc3',
    'khb7df7gdf8gydf7gdf78ghdf',
    'j423n4jk324njk32',
    'jn432jkn4j32k4n32jk4n',
    'j4n23kj4n23k4jn32k4',
    'jnjkn324jk324nkj23n4',
    '234j423jjkn243', 
    'a22333444455555', 
    ''
]

strings.forEach(s => console.log(countNumbers(s)));
