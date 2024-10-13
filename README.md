# Swida transport management system

Super simplified transport management system.

# Project description
This simple monorepo consists of separate folders for front-end (vue) and back-end (express) with a shared models folder that are used between FE & BE.


# Setup
- in FE and BE folder install dependencies
- BE uses Postre SQL, use db_dump file for DB initialization, DB connection details are for simplification hardcoded:
	```
	host: 'localhost',
	database: 'swida_transport'
	user: 'root'
	password: 'root'
	port: 5432
	```
- run both with `npm run dev`
