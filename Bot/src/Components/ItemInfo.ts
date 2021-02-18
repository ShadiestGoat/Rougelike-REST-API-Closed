import { Armor, Potion, Scroll, _weapon_ } from "../APIinteractor/types";


export function PotionInfo(Potion:Potion, id?:number) {
    return `Type: ${Potion.Effect}
            Permanent: ${Potion.Permanent}
            Time:${Potion.Time}
            Level:${Potion.Level}
            ${(id ? "id: " + id.toString() : "")}`
}

export function WeaponInfo(Weapon:_weapon_, id?:number) {
    let chips:string;

    if (Weapon.Ability1.type == "Elmnt") {
        for (let elmnt in Weapon.Ability1.Elmnt) {
            if (Weapon.Ability1.Elmnt[elmnt].Attack) {
                chips+=`Chips.1: ${elmnt}.A: (${Weapon.Ability1.Elmnt[elmnt].Attack})\n`
            }
            if (Weapon.Ability1.Elmnt[elmnt].Defense) {
                chips+=`Chips.1: ${elmnt}.D: (${Weapon.Ability1.Elmnt[elmnt].Defense})\n`
            }
        }
    } else {
        chips+=`Chips.1: ${Weapon.Ability1.type} (${Weapon.Ability1.value})\n`
    }
    if (Weapon.Ability2.type == "Elmnt") {
        for (let elmnt in Weapon.Ability1.Elmnt) {
            if (Weapon.Ability1.Elmnt[elmnt].Attack) {
                chips+=`Chips.2: ${elmnt}.A: (${Weapon.Ability1.Elmnt[elmnt].Attack})\n`
            }
            if (Weapon.Ability1.Elmnt[elmnt].Defense) {
                chips+=`Chips.2: ${elmnt}.D: (${Weapon.Ability1.Elmnt[elmnt].Defense})\n`
            }
        }
    } else {
        chips+=`Chips.2: ${Weapon.Ability1.type} (${Weapon.Ability1.value})\n`
    }
    if (Weapon.Enchantment?.type == "Elmnt") {
        for (let elmnt in Weapon.Ability1.Elmnt) {
            if (Weapon.Ability1.Elmnt[elmnt].Attack) {
                chips+=`Chips.3: ${elmnt}.A: (${Weapon.Ability1.Elmnt[elmnt].Attack})\n`
            }
            if (Weapon.Ability1.Elmnt[elmnt].Defense) {
                chips+=`Chips.3: ${elmnt}.D: (${Weapon.Ability1.Elmnt[elmnt].Defense})\n`
            }
        }
    } else {
        chips+=`Chips.3: ${Weapon.Ability1.type} (${Weapon.Ability1.value})\n`
    }

    return `Base damage: ${Weapon.Damage}
            Type: ${Weapon.Type}
            Quality: ${Weapon.Quality}
            ${chips}${(id ? "id: " + id.toString() : "")}
            `
}

export function ArmorInfo(Armor:Armor, id?:number) {
    let chips:string;

    if (Armor.Ability1.type == "Elmnt") {
        for (let elmnt in Armor.Ability1.Elmnt) {
            if (Armor.Ability1.Elmnt[elmnt].Attack) {
                chips+=`Chips.1: ${elmnt}.A: (${Armor.Ability1.Elmnt[elmnt].Attack})\n`
            }
            if (Armor.Ability1.Elmnt[elmnt].Defense) {
                chips+=`Chips.1: ${elmnt}.D: (${Armor.Ability1.Elmnt[elmnt].Defense})\n`
            }
        }
    } else {
        chips+=`Chips.1: ${Armor.Ability1.type} (${Armor.Ability1.value})\n`
    }
    if (Armor.Ability2.type == "Elmnt") {
        for (let elmnt in Armor.Ability1.Elmnt) {
            if (Armor.Ability1.Elmnt[elmnt].Attack) {
                chips+=`Chips.2: ${elmnt}.A: (${Armor.Ability1.Elmnt[elmnt].Attack})\n`
            }
            if (Armor.Ability1.Elmnt[elmnt].Defense) {
                chips+=`Chips.2: ${elmnt}.D: (${Armor.Ability1.Elmnt[elmnt].Defense})\n`
            }
        }
    } else {
        chips+=`Chips.2: ${Armor.Ability1.type} (${Armor.Ability1.value})\n`
    }
    if (Armor.Enchantment?.type == "Elmnt") {
        for (let elmnt in Armor.Ability1.Elmnt) {
            if (Armor.Ability1.Elmnt[elmnt].Attack) {
                chips+=`Chips.3: ${elmnt}.A: (${Armor.Ability1.Elmnt[elmnt].Attack})\n`
            }
            if (Armor.Ability1.Elmnt[elmnt].Defense) {
                chips+=`Chips.3: ${elmnt}.D: (${Armor.Ability1.Elmnt[elmnt].Defense})\n`
            }
        }
    } else {
        chips+=`Chips.3: ${Armor.Ability1.type} (${Armor.Ability1.value})\n`
    }

    return `Base Defense: ${Armor.Defense}
            Base Health: ${Armor.Health}
            Type: ${Armor.Type}
            Quality: ${Armor.Quality}
            ${chips}${(id ? "id: " + id.toString() : "")}
            `
}

export function ScrollInfo(Item:Scroll, id?:number) {
    return `
    Effect: ${Item.Ability}
    ${(id ? "id: " + id.toString() : "")}
    `
}