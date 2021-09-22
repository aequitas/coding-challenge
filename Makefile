.PHONY: all test run mrproper
all: test

test: setup
	npm run test

test_e2e: setup
	npm run test:e2e

run: setup
	npm run start

setup: node_modules/.package-lock.json
node_modules/.package-lock.json: package-lock.json
	npm install

clean:
	rm -rf dist/

mrproper: clean
	rm -rf node_modules/
