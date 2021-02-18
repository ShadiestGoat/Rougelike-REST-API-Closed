
//  #api-Types-ObjectTiletype
/**
 * @api {OBJECT} TileType TileType
 * @apiGroup Types
 * 
 * @apiParam {String="◈", "▢", "▩", "▣", "△", "▷"} type TileType type. ◈ is the current user position. ▢ is emptyness. ▩ is a wall. ▣ a chest. △ is a monster. ▷ is a challenger room.
 * @apiSampleRequest off
 */

//  #api-Types-ObjectCoord
 /**
 * @api {OBJECT} Coord Coord
 * @apiGroup Types
 * @apiParam {Number[]} Type Coord type
 * @apiSampleRequest off
*/


// #api-Types-ObjectDir
/**
 * @api {OBJECT} Dir Dir
 * @apiGroup Types
 * @apiParam {String="up", "down", "left", "right"} type Dir type 
 * @apiSampleRequest off
*/

// #api-Types-ObjectElement
/**
 * @api {OBJECT} Element Element
 * @apiGroup Types
 * @apiParam {Object} Element The main element object.
 * @apiParam {[AttackDefense](#api-Types-ObjectAttackdefense)} Fire? attack/defense for fire
 * @apiParam {[AttackDefense](#api-Types-ObjectAttackdefense)} Water? attack/defense for water
 * @apiParam {[AttackDefense](#api-Types-ObjectAttackdefense)} Air? attack/defense for air
 * @apiParam {[AttackDefense](#api-Types-ObjectAttackdefense)} Earth? attack/defense for earth 
 * @apiSampleRequest off
 */

// #api-Types-ObjectAttackdefense
/**
 * @api {OBJECT} AttackDefense AttackDefense
 * @apiGroup Types
 * @apiParam {Object} AttackDefense The attack/defense interface. This is used mainly in [Element](#api-Types-ObjectElement)
 * @apiParam {Number} AttackDefense.Attack How much raw damage (without applying defense) this will do 
 * @apiParam {Number} AttackDefense.Defense How much defense this has. Attack-Defense will result in final attack 
 * @apiSampleRequest off
*/

// #api-Types-ObjectMap

/**
 * @api {OBJECT} Map Map
 * @apiGroup Types
 * @apiParam {Object} Map The main Map object. Not acutall present, ie. not {Map:{stuff:"stuff"}}, but {stuff:"stuff"}
 * @apiParam {[TileType](#api-Types-ObjectTiletype)[][]} Map.layout the layout of the map.
 * @apiParam {[Coord](#api-Types-ObjectCoord)} Map.ExitCoord The coordinate of the exit
 * @apiParam {Number} Map.Level the level of th map
 * @apiParam {Object} Map.MonsterKey This has a Coordinate array ([Coord](#api-Types-ObjectCoord)) .toString() as a key, and the number is the id of monster
 * @apiParam {Object} Map.Rooms This has a Coordinate array ([Coord](#api-Types-ObjectCoord)) .toString() as a key,  and the boolean is weather or not it was completed
 * @apiParam {Object} Map.NPCs This has a Coordinate array ([Coord](#api-Types-ObjectCoord)) .toString() as a key, and the value is the id of the npc;
 * @apiParam {Number} Map.NextLevel? This is only present if you arein a "safe room". The only times you are in a safe room is after a boss battle. It heals you up & it backs up the user.
 * @apiSampleRequest off
*/

// #api-Types-ObjectInventory
/**
 * @api {OBJECT} Inventory Inventory
 * @apiGroup Types
 * @apiParam {Object} Inv The inv object, not actually on the object. So its not like {Inv:{stuff:"stuff"}}, but its like {stuff: "stuff"} 
 * @apiParam {Object} Armor Map.layout the layout of the map.
 * @apiParam {Armor} Armor.Helmet an armor piece
 * @apiParam {Armor} Armor.Chestplate an armor piece
 * @apiParam {Armor} Armor.Pants an armor piece
 * @apiParam {Armor} Armor.Boots an armor piece
 * @apiParam {Armor} Armor.Ring an armor piece
 * @apiParam {Armor} Armor.Necklace an armor piece
 * @apiParam {Weapon} Weapon The weapon that is equiped
 * @apiParam {Object} Container the index of all your item storage
 * @apiParam {Object} Container.Other The general container. It has a [id]:Item interface
 * @apiParam {Object} Container.Potion The Potion container. It has a [id]:Item interface
 * @apiParam {Object} Container.Scroll The Scroll container. It has a [id]:Item interface
 * @apiParam {Object} Container.Rings The rings container. It has a [id]:Item interface
 * @apiParam {Object} Container.Map a container map. It has a [id]:ContrainerType interface. So if you put Container[Contrainer.Map[id]][id] you get the item from the id
 * @apiParam {Object} Bags the index of the bags levels
 * @apiParam {Number} Bags.Other the level of the 'Other' container
 * @apiParam {Number} Bags.Potion the level of the 'Potion' container
 * @apiParam {Number} Bags.Scroll the level of the 'Scroll' container
 * @apiParam {Number} Bags.Rings the level of the 'Rings' container
 * @apiSampleRequest off
*/

// #api-Types-ObjectUser
/**
 * @api {OBJECT} User User
 * @apiGroup Types
 * @apiParam {Object} User The User object, not actually on the object. So its not like {User:{stuff:"stuff"}}, but its like {stuff: "stuff"} 
 * @apiParam {String} User.Token the token of the User
 * @apiParam {String} User.id Id of the user
 * @apiParam {String} User.Name the name of the user
 * @apiParam {Number} User.xp xp of the user
 * @apiParam {Number} User.lvl the level of the user
 * @apiParam {Number} User.Hp how much hp is left in the user
 * @apiParam {Number} User.BHealth The base amount of health
 * @apiParam {Number} User.BDefense The base amount of defense
 * @apiParam {Number} User.BMana The base amount of mana
 * @apiParam {Number} User.BStrength the base amount of strength
 * @apiParam {Number} User.BLuck The base amount of luck
 * @apiParam {Number} User.Mana how much mana the user has
 * @apiParam {Number} User.Power the amount a power has
 * @apiParam {[Element](#api-Types-ObjectElement)} User.Elmnt Base Elmnt stats one has 
 * @apiParam {Number} User.Kills the amount of kills a user has  
 * @apiParam {[Map](#api-Types-ObjectMap)} User.Map the map of a user
 * @apiParam {[Inventory](#api-Types-ObjectInventory)} User.Inv Inventory of a user
 * @apiParam {Monster} User.FightMode if a user is currently mid fight, then this has a monster interface. If not, it will be false  
 * @apiParam {Object} TmpEffect? the temporary effect. If its not there, its undefined & therefor it ran out/not drank any potion. Also, this gets replaced if you drinka  new one
 * @apiParam {Number} Money how much money a user has
 * @apiParam {Number[]} Checkpoints Every 15 levels you reach a new checkpoint, where your info is saved for a backup in case of death
 * 
 * @apiSampleRequest off
*/

// #api-Types-ObjectMonster
/**
 * @api {OBJECT} Monster Monster
 * @apiGroup Types
 * 
 * @apiParam {Number} Type the Id of the monster type
 * @apiParam {Number} Attack How much the monster will attack with damage
 * @apiParam {Number} Level The level of the monster (this is usually for monster types, but will return the map's level)
 * @apiParam {[Element](#api-Types-ObjectElement)} Elmnt Standard elemnt type
 * @apiParam {Number} ExpGiven the amount of xp that will be given to you afterwards 
 * @apiParam {Number} MoneyGiven the amount of money that will be given to you after the fight
 * @apiParam {Number} HP This is usually for normal monster types, but here will always be the same as maxhp
 * @apiParam {Number} MaxHealth The max Hp of the monster
 * @apiParam {Number} Defense Defense of the monster
 * @apiParam {Coords} Coords the coordinates of the monster. If you are getting this on /info, ignore it :D
 * @apiSampleRequest off
 */

