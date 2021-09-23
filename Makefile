.PHONY: all test run mrproper
all: test

test: setup
	npm run test -- ${args}

test_e2e: setup db.sqlite
	npm run test:e2e -- ${args}

db.sqlite:
	npx knex migrate:latest

run: setup
	npm run start

run_dev: setup
	npm run start:dev

setup: node_modules/.package-lock.json
node_modules/.package-lock.json: package-lock.json
	npm install

clean:
	rm -rf dist/

mrproper: clean
	rm -rf node_modules/
