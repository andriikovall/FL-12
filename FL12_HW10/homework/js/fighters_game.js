const Fighter = function({ name, damage, strength, agility, hp }) {
    // probably should check input values but it wasnt mentioned in task 
    // and we can assume that all inputs are valid
    const maxHP = hp;
    let combatHistory = {
        wins: 0,
        losses: 0
    };
    return new function() {
        this.getName = () => name;
        this.getDamage = () => damage;
        this.getStrength = () => strength;
        this.getAgility = () => agility;
        this.getHealth = () => hp;
        this.heal = (hpToHeal) => {
            hp += hpToHeal;
            if (hp > maxHP) {
                hp = maxHP;
            }
        };
        this.dealDamage = (dmg) => {
            hp -= dmg;
            if (hp < 0) {
                hp = 0;
            }
        };
        this.addWin = () => {
            combatHistory.wins += 1
        };
        this.addLoss = () => {
            combatHistory.losses += 1
        };
        this.logCombatHistory = () => {
            const message = `Name: ${name}, Wins: ${combatHistory.wins}, Losses: ${combatHistory.losses}`;
            console.log(message);
        }, 
        this.attack = (enemy) => {
            const oneHundred = 100;
            const successProbability = 1 - (enemy.getStrength() + enemy.getAgility()) / oneHundred;
            const isAttackSuccess = Math.random() <= successProbability;
            if (isAttackSuccess) {
                const attackerDmg = this.getDamage();
                enemy.dealDamage(attackerDmg);
                console.log(`${this.getName()} makes ${attackerDmg} damage to ${enemy.getName()}`);
            } else {
                console.log(`${this.getName()} attack missed`);
            }
        }
    }()
}

const fighter1 = new Fighter({ name: 'Andrey', damage: 15, strength: 10, agility: 50, hp: 130 });
const fighter2 = new Fighter({ name: 'Victor Petrovich', damage: 10, strength: 50, agility: 10, hp: 200 });
const fighter3 = new Fighter({ name: 'EPAM ADMIN', damage: 10, strength: 40, agility: 5, hp: 120 });


function getDeadFighters(...fighters) {
    return fighters.filter(f => f.getHealth() <= 0);
}

function getAliveFighters(...fighters) {
    return fighters.filter(f => f.getHealth() > 0);
}

function checkFightersAliveInTheBegining(fighters) {
    const deadFighters = getDeadFighters(...fighters);
    for (const f of deadFighters) {
        const message = `${f.getName()} is dead and can't fight`;
        console.log(message);
    }
    return deadFighters.length === 0;
}

function getWinner(f1, f2) {
    const aliveFighters = getAliveFighters(f1, f2);
    return aliveFighters.length === 1 ? aliveFighters[0] : null;
}

function getLoser(f1, f2) {
    const deadFighters = getDeadFighters(f1, f2);
    return deadFighters.length === 1 ? deadFighters[0] : null;
}

function battle(f1, f2) {
    console.log(`\nBATTLE BEETWEEN --${f1.getName()}-- and --${f2.getName()}--`);
    if (!checkFightersAliveInTheBegining([f1, f2])) {
        return;
    }
    let winner = null;
    let loser = null;
    do {
        f1.attack(f2);
        winner = getWinner(f1, f2);
        loser = getLoser(f1, f2);
        [f1, f2] = [f2, f1];
    } while (!winner);
    winner.addWin();
    loser.addLoss();
    const message = `${winner.getName()} has won!`;
    console.log(message);
    console.log(`BATTLE HAS ENDED ---\n`);
    return;
}

battle(fighter1, fighter2);
battle(fighter2, fighter3);
battle(fighter3, fighter1);

[fighter1, fighter2, fighter3].forEach(f => f.logCombatHistory());
