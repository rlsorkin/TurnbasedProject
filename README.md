# First Build
I wonder if I'll remember to update this...

# 0.01
This is the base for the project. Only things implemented are the basics actions.
Attack selection, health, damage, player turn and npc turn implemented only

# Next
Brainstorming where to go from here, next up were going to implement some wrinkles into the combat.

# 0.02
Win state has been added
Enemy class has been half implemented
Created PostFightBox component

# 0.03
Implemented Start Menu and top layer
Creating PlayerModel and siloing player actions into it
Created StatsPanel for quick display of object properties
Migrated most styles to style sheet, some inline left for edge case

# 0.04
Migrating most player actions to the player model
Refactoring, gonna have to mess this up pretty bad
Yeah its messed up pretty bad, implemented TempGame component for experimenting
Stats Panel is commented out in component
Completely fucked. Transitioning between turns is fucked. Rebuilding.
I think I unfucked it. Gonna move on after I re implement the log.
Success? Gonna finish enemy stats panel and then iterate.
Hell yeah, starting to work again, iterating

# 0.05 
Implementing turn structure, currently turns are happening instantaneously and it doesnt feel great
setTimeout in a few places, should be standardized though
Need to separate npc functions out to make turn timing easier
placed 0.04 diags in folder, will update after next push
