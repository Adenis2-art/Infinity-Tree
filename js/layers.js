// ==========================================
// ШАР 1: REBIRTH (Row 0)
// ==========================================
addLayer("R", {
    name: "Rebirth",
    symbol: "R",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#1327dc",
    requires: new Decimal(10),
    resource: "Rebirth points",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5,
    row: 0,
    passiveGeneration() {
        // Якщо є мілестоун 2 у шарі P, генеруємо 100% (1) на секунду. Інакше 0%.
        return hasMilestone("P", 2) ? 1 : 0; 
    },
    doReset(resettingLayer) {
        let keep = [];
        
        // ЗАХИСТ: Якщо гра просто завантажується і немає шару для ресету, нічого не робимо
        if (!resettingLayer || !layers[resettingLayer]) return;

        let keptUpgrades = [];

        // 1. ЗАПАМ'ЯТОВУЄМО
        if (resettingLayer == "P") {
            // Перевіряємо перший мілестоун
            if (hasMilestone("P", 0)) {
                [11, 12, 13, 14].forEach(id => {
                    if (hasUpgrade("R", id)) keptUpgrades.push(id);
                });
            }
            // Перевіряємо другий мілестоун
            if (hasMilestone("P", 1)) {
                [21, 22, 23, 24, 31, 32, 33, 34].forEach(id => {
                    if (hasUpgrade("R", id)) keptUpgrades.push(id);
                });
            }
        }

        // 2. РЕСЕТ (стирає все, що не в keep)
        if (layers[resettingLayer].row > layers[this.layer].row) {
            layerDataReset(this.layer, keep);
        }

        // 3. БЕЗПЕЧНО ПОВЕРТАЄМО АПГРЕЙДИ
        if (keptUpgrades.length > 0) {
            keptUpgrades.forEach(id => {
                player[this.layer].upgrades.push(id);
            });
        }
    }, // <--- ОБОВ'ЯЗКОВО МАЄ БУТИ КОМА ТУТ!

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('R', 12)) mult = mult.times(upgradeEffect('R', 12))
        if (hasUpgrade('R', 22)) mult = mult.times(upgradeEffect('R', 22)) 
        if (hasUpgrade('R', 23)) mult = mult.times(upgradeEffect('R', 23))
        if (hasUpgrade('R', 41)) mult = mult.times(upgradeEffect('R', 41))
        if (hasUpgrade('R', 42)) mult = mult.times(upgradeEffect('R', 42))
        if (hasUpgrade('R', 54)) mult = mult.times(upgradeEffect('R', 54))
        
        // Беремо буст RP від Prestige апгрейда 11
        if (hasUpgrade('P', 11)) mult = mult.times(upgradeEffect('P', 11).rp)
        if (hasUpgrade('P', 13)) mult = mult.times(upgradeEffect('P', 13).rp)
        
        return mult
    },
    gainExp() { return new Decimal(1) },
    
    upgrades: {
        11: { title: "The Start", description: "Points x2", cost: new Decimal(1), effect() { return new Decimal(2) } },
        12: { title: "Rebirth Booster I", description: "RP x1.5", cost: new Decimal(2), unlocked() { return hasUpgrade('R', 11) }, effect() { return new Decimal(1.5) } },
        13: { title: "Point Generator I", description: "Points x2.5", cost: new Decimal(5), unlocked() { return hasUpgrade('R', 12) }, effect() { return new Decimal(2.5) } },
        14: { title: "Point Generator II", description: "Points x1.5", cost: new Decimal(20), unlocked() { return hasUpgrade('R', 12) }, effect() { return new Decimal(1.5) } },
        21: { 
            title: "Rebirth Formula I", cost: new Decimal(30), unlocked() { return hasUpgrade('R', 13) },
            effect() { 
                let exp = 0.3; 
                if (hasUpgrade('R', 33)) exp += 0.05;
                if (hasUpgrade('R', 52)) exp += 0.05;
                return player.R.points.add(1).pow(exp);
            },
            description() { 
                let exp = 0.3;
                if (hasUpgrade('R', 33)) exp += 0.05;
                if (hasUpgrade('R', 52)) exp += 0.05;
                return "Boost Points based on RP (RP^" + exp.toFixed(2) + ") | Points: x" + format(this.effect());
            } 
        },
        22: { title: "Points Formula I", cost: new Decimal(50), unlocked() { return hasUpgrade('R', 21) },
            effect() { 
                let exp = 0.05; 
                if (hasUpgrade('R', 34)) exp += 0.03;
                if (hasUpgrade('R', 51)) exp += 0.02;
                return player.points.add(1).pow(exp);
            },
            description() { 
                let exp = 0.05;
                if (hasUpgrade('R', 34)) exp += 0.03;
                if (hasUpgrade('R', 51)) exp += 0.02;
                return "Boost RP based on Points (Points^" + exp.toFixed(2) + ") | RP: x" + format(this.effect());
            } 
        },
        23: { title: "Rebirth Booster II", description: "RP x2.5", cost: new Decimal(100), unlocked() { return hasUpgrade('R', 22) }, effect() { return new Decimal(2.5) } },
        24: { title: "Big Generator I", description: "Points x10", cost: new Decimal(250), unlocked() { return hasUpgrade('R', 23) }, effect() { return new Decimal(10) } },
        31: { title: "First Buyable", description: "Unlock Point Core", cost: new Decimal(1000), unlocked() { return hasUpgrade('R', 24) } },
        32: { title: "Second Buyable", description: "Unlock Rebirth Core", cost: new Decimal(2500), unlocked() { return hasUpgrade('R', 31) } },
        33: { title: "Formula Booster I", description: "Increase (Rebirth Formula I) exponent by +0.05", cost: new Decimal(10000), unlocked() { return hasUpgrade('R', 32) } },
        34: { title: "Formula Booster II", description: "Increase (Points Formula I) exponent by +0.03", cost: new Decimal(2.5e4), unlocked() { return hasUpgrade('R', 33) } },
        41: { title: "The end?", description: "RP x2", cost: new Decimal(25e4), unlocked() { return hasUpgrade('R', 34) }, effect() { return new Decimal(2) } },
        42: { title: "The power of Rebirth!", description: "RP x5", cost: new Decimal(1e9), unlocked() { return hasUpgrade('P', 12) }, effect() { return new Decimal(5) } },
        43: { title: "Increase Your Points!", description: "Points x10", cost: new Decimal(2.5e10), unlocked() { return hasUpgrade('P', 12) }, effect() { return new Decimal(10) } },
        44: { title: "Third Buyable", description: "Unlock Point Doubler (Another Buyable?)", cost: new Decimal(1e11), unlocked() { return hasUpgrade('P', 12) } },
        51: { title: "Formula Booster Again?", description: "Increase (Points Formula I) exponent by +0.02", cost: new Decimal(1e15), unlocked() { return hasUpgrade('P', 13) } },
        52: { title: "Stop!", description: "Increase (Rebirth Formula I) exponent by +0.05", cost: new Decimal(1e17), unlocked() { return hasUpgrade('P', 13) } },
        53: { title: "Rebirth Milestone!!!", description: "Unlock Rebirth Milestone", cost: new Decimal(1e19), unlocked() { return hasUpgrade('P', 14) } },
        54: { title: "The Last Upgrade?", description: "x50 RP", cost: new Decimal(1e21), unlocked() { return hasUpgrade('P', 14) }, effect() { return new Decimal(50) } },
    },
    milestones: {
        0: {
            requirementDescription: "1e19 RP",
            effectDescription: "Unlock new Buyable",
            done() { return player.R.points.gte(1e19) },
            unlocked() { return hasUpgrade('R', 53) }
        },

    },

    buyables: {
        11: {
            title: "Point Core",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(100).times(Decimal.pow(10, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Level: " + formatWhole(player[this.layer].buyables[this.id]) +
                       "\nBoost: x" + format(data.effect) + " Points\n\nCost: " + format(data.cost) + " RP"
            },
            canAfford() { return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) { return Decimal.pow(2, x) },
            unlocked() { return hasUpgrade('R', 31) },
            purchaseLimit: new Decimal(10),
        },
        12: {
            title: "Rebirth Core",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(1e4).times(Decimal.pow(5, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Level: " + formatWhole(player[this.layer].buyables[this.id]) +
                       "\nBoost: x" + format(data.effect) + " Points\n\nCost: " + format(data.cost) + " Points"
            },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player.points = player.points.sub(tmp[this.layer].buyables[this.id].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) { return Decimal.pow(2.5, x) },
            unlocked() { return hasUpgrade('R', 32) },
            purchaseLimit: new Decimal(10),
        },
        13: {
            title: "Point Doubler",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(1e14).times(Decimal.pow(10, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Level: " + formatWhole(player[this.layer].buyables[this.id]) +
                       "\nBoost: x" + format(data.effect) + " Points\n\nCost: " + format(data.cost) + " Points"
            },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player.points = player.points.sub(tmp[this.layer].buyables[this.id].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) { return Decimal.pow(2, x) },
            unlocked() { return hasUpgrade('R', 44) },
            purchaseLimit: new Decimal(5),
        },
        14: {
            title: "The Power!",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(1e25).times(Decimal.pow(10, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Level: " + formatWhole(player[this.layer].buyables[this.id]) +
                       "\nBoost: x" + format(data.effect) + " Points\n\nCost: " + format(data.cost) + " Points"
            },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player.points = player.points.sub(tmp[this.layer].buyables[this.id].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) { return Decimal.pow(3, x) },
            unlocked() { return hasMilestone('R', 0) },
            purchaseLimit: new Decimal(5),
        },
    },
    layerShown() { return true }
});

// ==========================================
// ГЕНЕРАЦІЯ ОЧОК (Має бути в mod.js, але можна і тут)
// ==========================================
function getPointGen() {
    let gain = new Decimal(1)
    
    if (hasUpgrade('R', 11)) gain = gain.times(upgradeEffect('R', 11))
    if (hasUpgrade('R', 13)) gain = gain.times(upgradeEffect('R', 13))
    if (hasUpgrade('R', 14)) gain = gain.times(upgradeEffect('R', 14))
    if (hasUpgrade('R', 21)) gain = gain.times(upgradeEffect('R', 21)) 
    if (hasUpgrade('R', 24)) gain = gain.times(upgradeEffect('R', 24))
    if (hasUpgrade('R', 43)) gain = gain.times(upgradeEffect('R', 43))
    
    // Беремо буст Points від Prestige апгрейда 11
    if (hasUpgrade('P', 11)) gain = gain.times(upgradeEffect('P', 11).point)
    if (hasUpgrade('P', 13)) gain = gain.times(upgradeEffect('P', 13).point)
    
    if (hasUpgrade('R', 31)) gain = gain.times(buyableEffect('R', 11)) 
    if (hasUpgrade('R', 32)) gain = gain.times(buyableEffect('R', 12))
    if (hasUpgrade('R', 44)) gain = gain.times(buyableEffect('R', 13))
    if (hasUpgrade('R', 53)) gain = gain.times(buyableEffect('R', 14))
    if (player.P.unlocked) {
            gain = gain.times(tmp.P.effect) // Беремо значення з ефекту шару P
    }

    return gain
}

// ==========================================
// ШАР 2: PRESTIGE (Row 1)
// ==========================================
addLayer("P", {
    name: "Prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#13dc13",
    resource: "Prestige points",
    effect() {
        return Decimal.pow(2, player.P.points) // Твій буст 2 в степені очок
    },
    effectDescription() {
        return "x" + format(this.effect()) + " Points"
    },
    baseResource: "Rebirth points",
    baseAmount() { return player.R.points },
    row: 1, // Другий поверх

    // --- ЛОГІКА ЦІНИ (1e6 -> 1e12 -> 1e18) ---
    type: "static",
    requires: new Decimal(1e6), // Ціна першого очка
    base: 1e6, // Множить ціну на 1 млн за кожне наступне очко
    exponent: 1, // Залишаємо 1, щоб множення було рівним
    canBuyMax: false, // Дозволяємо купувати по кілька очок

    gainMult() { return new Decimal(1) },
    gainExp() { return new Decimal(1) },
    
    hotkeys: [
        {key: "p", description: "P: Reset for Prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    // --- МІЛЕСТОУНИ ---
    milestones: {
        0: {
            requirementDescription: "1 Prestige Point",
            effectDescription: "Save row 1 of Rebirth Upgrades",
            done() { return player.P.points.gte(1) }
        },
        1: {
            requirementDescription: "2 Prestige Points",
            effectDescription: "Save row 2-3 of Rebirth Upgrades",
            done() { return player.P.points.gte(2) }
        },
        2: {
            requirementDescription: "3 Prestige Points",
            effectDescription: "Generate 100% of your RP current gain",
            done() { return player.P.points.gte(3) }
        }
    },

    upgrades: {
        11: { 
            title: "Second Start?", 
            description: "Points x5, RP x2", 
            cost: new Decimal(1),
            effect() { return { point: new Decimal(5), rp: new Decimal(2) } }, 
        },
        12: { title: "New Upgrades?", description: "Unlock 3 new Rebirth Upgrades", cost: new Decimal(1), unlocked() { return hasUpgrade('P', 11) } },
        13: { title: "The Boost!", 
            description: "Points x50, RP x10 and 2 new Rebirth Upgrades!", 
            cost: new Decimal(2), 
            unlocked() { return hasUpgrade('P', 12) }, 
            effect() { 
                return { 
                    point: new Decimal(50), 
                    rp: new Decimal(10) 
                }}, 
        },
        14: { title: "Current End", 
            description: "Unlock 2 last Rebirth Upgrades!", 
            cost: new Decimal(3), 
            unlocked() { return hasUpgrade('P', 13) }, 
        }

    },
    
    layerShown() { return hasUpgrade('R', 41) || player.P.unlocked }
});