const Fighter = function({ name, damage, hp, strength, agility }) {
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
                console.log(`${enemy.getName()} attack missed`);
            }
        }
    }()
}

const fighter1 = new Fighter({ name: 'Ander', damage: 45, strength: 10, hp: 0, agility: 5 });
const fighter2 = new Fighter({ name: 'Victor Petrovich', damage: 60, strength: 20, hp: 0, agility: 5 });


function checkFightersAlive(...fighters) {
    let isAnyDead = false;
    for (const f of fighters) {
        if (f.getHealth() <= 0) {
            const message = `${f.getName()} is dead and can't fight`;
            console.log(message);
            isAnyDead = true;
        }
    }
    return !isAnyDead;
}

function battle(f1, f2) {
    if (!checkFightersAlive(f1, f2)) {
        return;
    }
}

battle(fighter1, fighter2);





// helper func
function logFighterStats(f) {
    console.table({
        name: f.getName(), 
        damage: f.getDamage(), 
        strength: f.getStrength(), 
        agility: f.getAgility(), 
        health: f.getHealth()
    });
}