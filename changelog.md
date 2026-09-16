
# Changelog

## [Unreleased]
### Added
- Members now gain XP while sending message with a configurable cooldowns
- Level command to view XP
- Leaderboard command
- Anti-raid system
- All commands are now logged 
- Bait channel to intercept bot message or spam account 
- Now a card will dispaly for the /level command
- /xp-(add/remove) command to manually change user's xp
- Adding more bug to fix later
- /money command to see user's money
- /money-(addèremove) to manualy change user's money

### Changed
- put a real description for all command
- change all the Interaction to interaction according to convention
- Put all hard-codded parameters is config.json and full restructure config.json
- clarify logs by using name instead of ID
- centralize all logs in interactionCreate.js exept some specific logs like ban

### Fixed
- The Send command cause an error
- fixed various bugs here and there


## [1.2.1]
### Fixed
- A warning may appear when deleting a ticket.

## [1.2.0]
### Changed
- Replacing SQLite with MariaDB

## [1.1.1]
### Fixed
- Orthographic and syntax correction


## [1.1.0]
### Added
- Role selection system
- timestamp of message

### Changed
- Report system
- Suggest system


## [1.0.0]
### Added
- Initial Commit
