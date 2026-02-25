// ==========================================
// ГЕНЕРАЦІЯ ОЧОК (Global)
// ==========================================
function getPointGen() {
    let gain = new Decimal(1);

    // Rebirth Upgrades
    if (hasUpgrade('R', 11)) gain = gain.times(upgradeEffect('R', 11));
    if (hasUpgrade('R', 13)) gain = gain.times(upgradeEffect('R', 13));
    if (hasUpgrade('R', 14)) gain = gain.times(upgradeEffect('R', 14));
    if (hasUpgrade('R', 21)) gain = gain.times(upgradeEffect('R', 21)); 
    if (hasUpgrade('R', 24)) gain = gain.times(upgradeEffect('R', 24));
    if (hasUpgrade('R', 43)) gain = gain.times(upgradeEffect('R', 43));
    if (hasUpgrade('R', 61)) gain = gain.times(upgradeEffect('R', 61));
    if (hasUpgrade('R', 62)) gain = gain.times(upgradeEffect('R', 62));
    if (hasUpgrade('R', 84)) gain = gain.times(upgradeEffect('R', 84));

    // Prestige Upgrades
    if (player.P && player.P.unlocked) {
        if (hasUpgrade('P', 11)) gain = gain.times(upgradeEffect('P', 11).point);
        if (hasUpgrade('P', 13)) gain = gain.times(upgradeEffect('P', 13).point);
        if (hasUpgrade('P', 22)) gain = gain.times(upgradeEffect('P', 22).point);
        if (hasUpgrade('P', 23)) gain = gain.times(upgradeEffect('P', 23).point);
        gain = gain.times(Decimal.pow(2, player.P.points));
    }
    if (hasChallenge('P', 13)) gain = gain.times(1e4);

    // Mega Upgrades
    if (player.M && hasUpgrade('M', 11)) gain = gain.times(upgradeEffect('M', 11).point);

    // Rebirth Buyables
    if (hasUpgrade('R', 31)) gain = gain.times(buyableEffect('R', 11)); 
    if (hasUpgrade('R', 32)) gain = gain.times(buyableEffect('R', 12));
    if (hasUpgrade('R', 44)) gain = gain.times(buyableEffect('R', 13));
    if (hasUpgrade('R', 53)) gain = gain.times(buyableEffect('R', 14));
    if (inChallenge('P', 13)) gain = gain.pow(0.5);

    return gain;
}

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
        return (player.P && hasMilestone("P", 2)) ? 1 : 0; 
    },
    canKeep(layer) {
        if (player.P && inChallenge("P", 11)) return false; 
        return true;
    },
    
    doReset(resettingLayer) {
        let keep = [];
        if (!resettingLayer || !layers[resettingLayer]) return;

        // ЛОГІКА ЗБЕРЕЖЕННЯ (Keep)
        let keptUpgrades = [];
        let keptBuyables = {};

        // 1. Якщо скидає Prestige (P)
        if (resettingLayer == "P") {
            // Якщо є Mega Milestone 0, то при Prestige ресеті Rebirth ВЗАГАЛІ не чіпаємо
            if (player.M && hasMilestone("M", 0)) return; 

            // Стандартні умови збереження від Prestige Milestones
            if (hasMilestone("P", 0)) keptUpgrades.push(11, 12, 13, 14);
            if (hasMilestone("P", 1)) keptUpgrades.push(21, 22, 23, 24, 31, 32, 33, 34);
            if (hasMilestone("P", 4)) {
                keptUpgrades.push(41, 42, 43, 44);
                [11, 12, 13, 14].forEach(id => {
                    keptBuyables[id] = getBuyableAmount(this.layer, id);
                });
            }
        }

        // 2. Якщо скидає Mega (M)
        if (resettingLayer == "M") {
            // Тут ми нічого не додаємо в keep (окрім, можливо, автоматизації пізніше), 
            // тому Rebirth повністю скинеться.
        }

        // ВИКОНАННЯ СКИНУ
        if (layers[resettingLayer].row > layers[this.layer].row) {
            layerDataReset(this.layer, keep);
        }

        // ПОВЕРНЕННЯ ЗБЕРЕЖЕНИХ ЕЛЕМЕНТІВ
        if (keptUpgrades.length > 0) {
            keptUpgrades.forEach(id => {
                if (!player[this.layer].upgrades.includes(id)) player[this.layer].upgrades.push(id);
            });
        }
        for (let id in keptBuyables) {
            setBuyableAmount(this.layer, id, keptBuyables[id]);
        }
    },
    gainMult() {
        let mult = new Decimal(1);
        
        // Rebirth Upgrades
        if (hasUpgrade('R', 12)) mult = mult.times(upgradeEffect('R', 12));
        if (hasUpgrade('R', 22)) mult = mult.times(upgradeEffect('R', 22)); 
        if (hasUpgrade('R', 23)) mult = mult.times(upgradeEffect('R', 23));
        if (hasUpgrade('R', 41)) mult = mult.times(upgradeEffect('R', 41));
        if (hasUpgrade('R', 42)) mult = mult.times(upgradeEffect('R', 42));
        if (hasUpgrade('R', 54)) mult = mult.times(upgradeEffect('R', 54));
        if (hasUpgrade('R', 63)) mult = mult.times(upgradeEffect('R', 63));
        if (hasUpgrade('R', 64)) mult = mult.times(upgradeEffect('R', 64));
        if (hasUpgrade('R', 71)) mult = mult.times(upgradeEffect('R', 71));
        if (hasUpgrade('R', 72)) mult = mult.times(upgradeEffect('R', 72));
        if (hasUpgrade('R', 73)) mult = mult.times(upgradeEffect('R', 73));
        if (hasUpgrade('R', 74)) mult = mult.times(upgradeEffect('R', 74));
        if (hasUpgrade('R', 82)) mult = mult.times(upgradeEffect('R', 82));
        
        // Prestige Upgrades
        if (player.P && player.P.unlocked) {
            if (hasUpgrade('P', 11)) mult = mult.times(upgradeEffect('P', 11).rp);
            if (hasUpgrade('P', 12)) mult = mult.times(upgradeEffect('P', 12).rp);
            if (hasUpgrade('P', 13)) mult = mult.times(upgradeEffect('P', 13).rp);
            if (hasUpgrade('P', 22)) mult = mult.times(upgradeEffect('P', 22).rp);
            if (hasUpgrade('P', 23)) mult = mult.times(upgradeEffect('P', 23).rp);
        }
        if (hasChallenge('P', 12)) mult = mult.times(250);

        // Mega Upgrades
        if (player.M && hasUpgrade('M', 11)) mult = mult.times(upgradeEffect('M', 11).rp);

        // Milestones
        if (hasMilestone('R', 1)) mult = mult.times(4);
        return mult;
    },
    
    gainExp() { 
        if (player.P && inChallenge("P", 11)) return new Decimal(0.5);
        if (player.P && inChallenge("P", 12)) return new Decimal(0.2);
        return new Decimal(1); 
    },
    
    upgrades: {
        11: { title: "The Start", description: "Points x2", cost: new Decimal(1), effect() { return new Decimal(2) } },
        12: { title: "Rebirth Booster I", description: "RP x1.5", cost: new Decimal(2), unlocked() { return hasUpgrade('R', 11) }, effect() { return new Decimal(1.5) } },
        13: { title: "Point Generator I", description: "Points x2.5", cost: new Decimal(5), unlocked() { return hasUpgrade('R', 12) }, effect() { return new Decimal(2.5) } },
        14: { title: "Point Generator II", description: "Points x1.5", cost: new Decimal(10), unlocked() { return hasUpgrade('R', 12) }, effect() { return new Decimal(1.5) } },
        21: { 
            title: "Rebirth Formula I", cost: new Decimal(25), unlocked() { return hasUpgrade('R', 13) },
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
                return "Boost Points based on RP (RP^" + exp.toFixed(2) + ")";
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        22: { title: "Points Formula I", cost: new Decimal(40), unlocked() { return hasUpgrade('R', 21) },
            effect() { 
                let exp = 0.05; 
                if (hasUpgrade('R', 34)) exp += 0.03;
                if (hasUpgrade('R', 51)) exp += 0.08;
                return player.points.add(1).pow(exp);
            },
            description() { 
                let exp = 0.05;
                if (hasUpgrade('R', 34)) exp += 0.03;
                if (hasUpgrade('R', 51)) exp += 0.08;
                return "Boost RP based on Points (Points^" + exp.toFixed(2) + ")";
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        23: { title: "Rebirth Booster II", description: "RP x2.5", cost: new Decimal(100), unlocked() { return hasUpgrade('R', 22) }, effect() { return new Decimal(2.5) } },
        24: { title: "Big Generator I", description: "Points x10", cost: new Decimal(250), unlocked() { return hasUpgrade('R', 23) }, effect() { return new Decimal(10) } },
        31: { title: "First Buyable", description: "Unlock Rebirth Core", cost: new Decimal(1000), unlocked() { return hasUpgrade('R', 24) } },
        32: { title: "Second Buyable", description: "Unlock Point Core", cost: new Decimal(2500), unlocked() { return hasUpgrade('R', 31) } },
        33: { title: "Formula Booster I", description: "Increase (Rebirth Formula I) exponent by +0.05", cost: new Decimal(10000), unlocked() { return hasUpgrade('R', 32) } },
        34: { title: "Formula Booster II", description: "Increase (Points Formula I) exponent by +0.03", cost: new Decimal(2.5e4), unlocked() { return hasUpgrade('R', 33) } },
        41: { title: "The end?", description: "RP x2", cost: new Decimal(25e4), unlocked() { return hasUpgrade('R', 34) }, effect() { return new Decimal(2) } },
        42: { title: "The power of Rebirth!", description: "RP x5", cost: new Decimal(1e9), unlocked() { return hasUpgrade('P', 12) }, effect() { return new Decimal(5) } },
        43: { title: "Big Generator II", description: "Points x10", cost: new Decimal(2.5e10), unlocked() { return hasUpgrade('P', 12) }, effect() { return new Decimal(10) } },
        44: { title: "Third Buyable", description: "Unlock Point Doubler (Another Buyable?)", cost: new Decimal(1e11), unlocked() { return hasUpgrade('P', 12) } },
        51: { title: "Formula Booster Again?", description: "Increase (Points Formula I) exponent by +0.08", cost: new Decimal(1e15), unlocked() { return hasUpgrade('P', 13) } },
        52: { title: "Stop!", description: "Increase (Rebirth Formula I) exponent by +0.05", cost: new Decimal(1e17), unlocked() { return hasUpgrade('P', 13) } },
        53: { title: "Rebirth Milestone!!!", description: "Unlock Rebirth Milestone", cost: new Decimal(5e18), unlocked() { return hasUpgrade('P', 14) } },
        54: { title: "The power of Rebirth again!", description: "RP x50", cost: new Decimal(1e21), unlocked() { return hasUpgrade('P', 14) }, effect() { return new Decimal(50) } },
        61: { title: "Big Generator III", description: "Points x10", cost: new Decimal(1.5e26), unlocked() { return hasMilestone('R', 2) }, effect() { return new Decimal(10) } },
        62: { title: "More Formulas!", cost: new Decimal(5e27), unlocked() { return hasMilestone('R', 3) },
            effect() { 
                return player.points.add(1).pow(0.005);
            },
            description() { 
                return "Boost Points based on Points (Points^0.005)";
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        63: { title: "Ok..", description: "RP x2", cost: new Decimal(1e28), unlocked() { return hasMilestone('R', 3) }, effect() { return new Decimal(2) } },
        64: { title: "YEAH!", description: "RP x5", cost: new Decimal(1e29), unlocked() { return hasMilestone('R', 4) }, effect() { return new Decimal(5) } },
        71: { title: "M*** (???)",  description: "RP x10 first and new Rebirth Upgrade",  cost: new Decimal(2e32),  unlocked() { return hasMilestone('R', 5) },  effect() { return new Decimal(10) } },
        72: { title: "Me** (???)",  description: "RP x10 second and new Rebirth Upgrade",  cost: new Decimal(3e33),  unlocked() { return hasUpgrade('R', 71) },  effect() { return new Decimal(10) } },
        73: { title: "Meg* (???)",  description: "RP x10 third? and new Rebirth Upgrade",  cost: new Decimal(4e34),  unlocked() { return hasUpgrade('R', 72) },  effect() { return new Decimal(10) } },
        74: { title: "Mega!!! (???)",  description: "Unlock new reset layer!",  cost: new Decimal(1e36),  unlocked() { return hasUpgrade('R', 73) },  effect() { return new Decimal(10) } },
        81: { title: "Challange! x1", description: "Unlock 1 new Prestige Challange", cost: new Decimal(5e45), unlocked() { return hasMilestone('M', 0) } },
        82: { title: "Boost! x1", description: "RP x10", cost: new Decimal(1e48), unlocked() { return hasMilestone('M', 0) },  effect() { return new Decimal(10) } },
        83: { title: "Challange! x2", description: "Unlock 1 new Prestige Challange", cost: new Decimal(1e50), unlocked() { return hasMilestone('M', 0) } },
        84: { title: "Boost! x2", description: "Points x10 and 1 new Buyable (and new layer Booster next Update)", cost: new Decimal(1e55), unlocked() { return hasMilestone('M', 0) },  effect() { return new Decimal(10) } },



    },
    
    milestones: {
        0: {
            requirementDescription: "1e19 RP",
            effectDescription: "Unlock new Buyable",
            unlocked() { return hasUpgrade('R', 53) }, 
            done() { return player.R.points.gte(1e19) && hasUpgrade('R', 53) },
            keepState: true, 
        },
        1: {
            requirementDescription: "1e25 RP",
            effectDescription: "RP x4",
            unlocked() { return hasUpgrade('P', 21) || hasMilestone(this.layer, this.id) }, 
            done() { return player.R.points.gte(1e25) && hasUpgrade('P', 21) },
            keepState: true, 
        },
        2: {
            requirementDescription: "1e26",
            effectDescription: "Unlock 1 new Rebirth Upgrade",
            unlocked() { return hasUpgrade('P', 21) || hasMilestone(this.layer, this.id) }, 
            done() { return player.R.points.gte(1e26) && hasUpgrade('P', 21) },
            keepState: true, 
        },
        3: {
            requirementDescription: "2.5e27",
            effectDescription: "Unlock 2 new Rebirth Upgrade (again Upgrades?...)",
            unlocked() { return hasUpgrade('P', 21) || hasMilestone(this.layer, this.id) }, 
            done() { return player.R.points.gte(2.5e27) && hasUpgrade('P', 21) },
            keepState: true, 
        },
        4: {
            requirementDescription: "5e28",
            effectDescription: "Unlock 1 new Rebirth Upgrade (last before Prestige 5!)",
            unlocked() { return hasUpgrade('P', 21) || hasMilestone(this.layer, this.id) }, 
            done() { return player.R.points.gte(5e28) && hasUpgrade('P', 21) },
            keepState: true, 
        },
        5: {
            requirementDescription: "1e32",
            effectDescription: "Unlock 1 new Rebirth Upgrade! (???)",
            unlocked() { return (player.P && hasChallenge("P", 11)) || hasMilestone(this.layer, this.id) }, 
            done() { return player.R.points.gte(1e32) && player.P && hasChallenge("P", 11) },
            keepState: true, 
        }
    },

    buyables: {
        11: {
            title: "Rebirth Core",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(100).times(Decimal.pow(10, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id];
                return `Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}\nBoost: x${format(data.effect)} Points\n\nCost: ${format(data.cost)} RP`;
            },
            canAfford() { return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost);
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            effect(x) { return Decimal.pow(2, x) },
            unlocked() { return hasUpgrade('R', 31) },
            purchaseLimit: new Decimal(10),
        },
        12: {
            title: "Point Core",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(1e4).times(Decimal.pow(5, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id];
                return `Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}\nBoost: x${format(data.effect)} Points\n\nCost: ${format(data.cost)} Points`;
            },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player.points = player.points.sub(tmp[this.layer].buyables[this.id].cost);
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
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
                let data = tmp[this.layer].buyables[this.id];
                return `Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}\nBoost: x${format(data.effect)} Points\n\nCost: ${format(data.cost)} Points`;
            },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player.points = player.points.sub(tmp[this.layer].buyables[this.id].cost);
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            effect(x) { return Decimal.pow(2, x) },
            unlocked() { return hasUpgrade('R', 44) },
            purchaseLimit: new Decimal(5),
        },
        14: {
            title: "The Power!",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(1e21).times(Decimal.pow(10, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id];
                return `Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}\nBoost: x${format(data.effect)} Points\n\nCost: ${format(data.cost)} Points`;
            },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player.points = player.points.sub(tmp[this.layer].buyables[this.id].cost);
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            effect(x) { return Decimal.pow(2.5, x) },
            unlocked() { return hasMilestone('R', 0) },
            purchaseLimit: new Decimal(25),
        },
        21: {
            title: "Migerd",
            style: { "margin-top": "40px", "height": "200px" },
            cost(x) { return new Decimal(1e55).times(Decimal.pow(10, x)) },
            display() { 
                let data = tmp[this.layer].buyables[this.id];
                return `Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}\nBoost: x${format(data.effect)} Points\n\nCost: ${format(data.cost)} Points`;
            },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                player.points = player.points.sub(tmp[this.layer].buyables[this.id].cost);
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            effect(x) { return Decimal.pow(2, x) },
            unlocked() { return hasUpgrade('R', 84) },
            purchaseLimit: new Decimal(100),
        },
    },
    layerShown() { return true }
});

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
        if (!player.P) return new Decimal(1);
        return Decimal.pow(2, player.P.points);
    },
    effectDescription() {
        return "x" + format(tmp[this.layer].effect) + " Points";
    },
    baseResource: "Rebirth points",
    baseAmount() { return player.R ? player.R.points : new Decimal(0) },
    row: 1, 
    type: "static",
    
    requires: new Decimal(1e6),
    base: new Decimal(1e6), 
    exponent: 1,
    
    canBuyMax() { return hasMilestone('P', 3) },
    hotkeys: [
        {key: "p", description: "P: Reset for Prestige points", onPress(){ if (canReset(this.layer)) doReset(this.layer) }},
    ],
    milestones: {
        0: { requirementDescription: "1 Prestige Point", effectDescription: "Save row 1 of Rebirth Upgrades!", done() { return player.P && player.P.points.gte(1) } },
        1: { requirementDescription: "2 Prestige Points", effectDescription: "Save row 2-3 of Rebirth Upgrades!", done() { return player.P && player.P.points.gte(2) } },
        2: { requirementDescription: "3 Prestige Points", effectDescription: "Generate 100% of your RP current gain!", done() { return player.P && player.P.points.gte(3) } },
        3: { requirementDescription: "4 Prestige Points", effectDescription: "Now you can buy max Prestige!", done() { return player.P && player.P.points.gte(4) } },
        4: { requirementDescription: "5 Prestige Points", effectDescription: "Save Rebirth Core, Point Core, Point Doubler (Buyables) and row 4 of Rebirth Upgrades, Unlock First Number (Challenge)", done() { return player.P && player.P.points.gte(5) } }
    },
    upgrades: {
        11: { title: "Second Start?", description: "Points x5, RP x2", cost: new Decimal(1), effect() { return { point: new Decimal(5), rp: new Decimal(2) } } },
        12: { title: "New Upgrades?", description: "RP x1.5, Unlock 3 new Rebirth Upgrades", cost: new Decimal(1), effect() { return {rp: new Decimal(1.5) } }, unlocked() { return hasUpgrade('P', 11) } },
        13: { title: "The Boost!", description: "Points x50, RP x10 and 2 new Rebirth Upgrades!", cost: new Decimal(2), effect() { return { point: new Decimal(50), rp: new Decimal(10) }}, unlocked() { return hasUpgrade('P', 12) } },
        14: { title: "More!", description: "Unlock 2 new Rebirth Upgrades!", cost: new Decimal(3), unlocked() { return hasUpgrade('P', 13) } },
        21: { title: "You get it!", description: "Unlock 4 new Rebirth Milestones", cost: new Decimal(4), unlocked() { return hasUpgrade('P', 14) } },
        22: { title: "Boost to recover!", description: "Points x10, RP x5", cost: new Decimal(5), effect() { return { point: new Decimal(10), rp: new Decimal(5) }}, unlocked() { return hasUpgrade('P', 21) } },
        23: { title: "Last Upgrade before ****", description: "RP x7.5, Points x2", cost: new Decimal(6), effect() { return { point: new Decimal(2), rp: new Decimal(7.5) }}, unlocked() { return hasUpgrade('P', 22) } },
    },
    challenges: {
        11: {
            name: "First Number",
            challengeDescription: "Rebirth Point gain ^0.5",
            goalDescription: "Get 50,000,000 Rebirth Points",
            canComplete() { return player.R && player.R.points.gte(5e7) },
            rewardDescription: "Unlock 1 new Rebirth Milestone",
            unlocked() { return hasMilestone("P", 4) },
            onEnter() { layerDataReset("R", []); player.points = new Decimal(0) },
        },
        12: {
            name: "Second Number",
            challengeDescription: "Rebirth Point gain ^0.2",
            goalDescription: "Get 10,000 Rebirth Points",
            canComplete() { return player.R && player.R.points.gte(1e4) },
            rewardDescription: "RP x250",
            // ДОДАНО: Перевірка на вже відкритий стан (hasChallenge) 
            // або наявність прогресу, щоб він не зникав після ресету
            unlocked() { 
                return hasUpgrade("R", 81) || hasChallenge("P", 12) || player.P.challenges[12] > 0; 
            },
            onEnter() { 
                layerDataReset("R", []); 
                player.points = new Decimal(0);
            },
        },
        13: {
            name: "Third Number",
            challengeDescription: "Points gain ^0.1",
            goalDescription: "Get 5e13 Points",
            canComplete() { return player && player.points.gte(5e13) },
            rewardDescription: "Points x10,000",
            // ДОДАНО: Перевірка на вже відкритий стан (hasChallenge) 
            // або наявність прогресу, щоб він не зникав після ресету
            unlocked() { 
                return hasUpgrade("R", 83) || hasChallenge("P", 12) || player.P.challenges[12] > 0; 
            },
            onEnter() { 
                layerDataReset("R", []); 
                player.points = new Decimal(0);
            },
        },
    },
    layerShown() { return hasUpgrade('R', 41) || (player.P && player.P.unlocked) }
});

addLayer("M", {
    name: "Mega",
    symbol: "M",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#ff5100",
    resource: "Mega points",
    
    baseResource: "Prestige points",
    baseAmount() { 
        return player.P ? player.P.points : new Decimal(0) 
    }, 
    
    row: 2, 
    type: "static",
    base: 1.5, 
    exponent: 1,
    onUnlock() {
        player.M.unlocked = true;
    },
    
    requires() {
        if (!player.M) return new Decimal(7);
        if (player.M.points.lt(1)) return new Decimal(7);
        return new Decimal(10); 
    },

    canBuyMax() { return false },
    
    effect() {
        return Decimal.pow(5, player.M ? player.M.points : new Decimal(0)) 
    },
    effectDescription() {
        return "x" + format(tmp[this.layer].effect) + " Points\nMega is powerful reset layer for the future!"
    },

    milestones: {
        0: {
            requirementDescription: "1 Mega Point",
            effectDescription: "Save Rebirth Features at Prestige!",
            done() { return player.M && player.M.points.gte(1) },
        },
    },

    upgrades: {
        11: { 
            title: "Finally!", 
            description: "Points x10, RP x5, Unlock 12 new Rebirth Upgrades! (Other 8 will be in next update)", 
            cost: new Decimal(1),
            effect() { return { point: new Decimal(10), rp: new Decimal(5) } }, 
        },
    },
    
    layerShown() { 
        let canSee = player.M.unlocked || 
                     hasUpgrade('R', 74) || 
                     (player.P && player.P.points.gte(7));
        
        return canSee;
    }
});
