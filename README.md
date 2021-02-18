# Source Quest: The Debugging


<h3 align="center"> Language </h3>
<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-161616?style=for-the-badge&logo=typescript">
</p>

## Goal

The goal of this project is to make an REST API for a rouge like game, to support beginner game devs. 
Besides that goal, this project basically wants to unify between different interfaces. Like, you can have different interfaces, be it a discord bot, a web app or a full game with graphics & high stakes battles, all using the same api. This way, you can switch between these interfaces which can tell completely different stories, and have all the same item stats on completely different looking items. 

## Functionality

This project has most of the functionalities of a normal rouge like:

- A map that you can move around on
- Map generation, using random walker algorithm, with unobstructed paths
- Monsters that you can fight
- Chests you can open
- NPCs
- A user object which has the following
	- Money
	- Health & Max Health
	- Mana & Max Mana
	- Armor & Weapons
	- Inventory
	- Levels & XP
- Elementary attack & defense
- And some more!
- [ ] TODO: Better rewards for leveling up
- [ ] TODO: Shop keeper NPCs
- [ ] TODO: "Challenger rooms", where the player can fight a group of monsters, and get high rewards
- [ ] TODO: Spells

## Docs

To help new game devs, this project aims to have good documentation. As of the initial commit, docs can be found on https://sq.shadygoat.eu/docs

### Example 

However, an example is also provided in this repository, under the 'bot'. This bot incorporates all the different endpoints, so it should give you an idea of how this should work!

## Adding onto this Project

Unfortunately, I can't allow anyone to contribute to this repository. However, if I am lucky, I will open a new repository with this exact project, allowing any and all to contribute to it. 

