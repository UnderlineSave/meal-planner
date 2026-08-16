# Meal Planner — Roadmap

A small project to get into a development rhythm before my .NET program.
Rule: finish each version and commit it before starting the next.
New ideas go here instead of into the version I'm currently building.

## v1.0 — the finishable core (current)
- Define foods: name, calories, protein
- Add foods to a single day's plan with a quantity
- Running total of calories and protein
- Save everything in localStorage
- Remove a food / remove a plan entry

Deliberately NOT in v1.0: multiple days, meal slots, cost,
editing, recipes, search, charts, drag-and-drop.

## Later — the full vision, sequenced
- v1.1  Add cost to foods; edit an existing food
- v1.2  Split the day into named slots (breakfast / lunch / dinner)
- v2.0  Expand one day into a 7-day week (the calendar)
- v2.1  "Meals" as saved bundles of foods (the card), with recipe text
- v3.0  Drag-and-drop cards into slots (polish over click-to-add)

## Someday / maybe
- Nutrition goals + progress indicators
- Weekly cost total / grocery list
- Import / export data

## Someday (needs a backend — i.e. after the .NET program covers it)
- Sync data across phone / laptop / PC via a server + database
  (localStorage is per-device by nature and can't do this — this is a
  fullstack rebuild, and a great capstone once I know backends)