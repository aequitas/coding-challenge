.PHONY: all test run lint fix setup clean mrproper
all: test

run: setup
	npm run start:dev

lint:
	npx prettier --check .
	npm run lint

fix: setup
	npx prettier --write .
	npm run lint

test: unit_test e2e_test

unit_test: setup
	npm run test -- ${args}

e2e_test: setup db.sqlite
	npm run test:e2e -- ${args}

db.sqlite:
	npx knex migrate:latest

setup: node_modules/.package-lock.json
node_modules/.package-lock.json: package-lock.json
	npm install

clean:
	rm -rf dist/

mrproper: clean
	rm -rf node_modules/
