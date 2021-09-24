.PHONY: all test run lint fix setup clean mrproper
all: test

run: setup db.sqlite
	NODE_ENV=test npm run start:dev

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
	# clean database before test
	# TODO: ideally this would be done from the test suite itself
	rm db.sqlite
	npx knex migrate:latest

	npm run test:e2e -- ${args}

db.sqlite:
	npx knex migrate:latest

setup: node_modules/.package-lock.json
node_modules/.package-lock.json: package-lock.json
	npm install

clean:
	rm -rf dist/
	rm -rf db.sqlite

mrproper: clean
	rm -rf node_modules/
