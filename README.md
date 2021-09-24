# Code Chanllenge

## Quickstart

This repository contains a Docker compose file to quickly start a demo instance for this application. To run it run:

    docker-compose up

Then visit: http://localhost:3000

## Development

A Makefile is provided for the most common actions performed during development, it has the following targets:

    make           # setup & test
    make run       # start dev instance of the application
    make test      # run tests
    make lint      # perform lint checks
    make fix       # autoformat code and fix trivial lint issues
    make clean     # remove build artifacts and temporary files
    make mrproper  # clean and also remove installed dependencies

## TODO's

- authentication if simple for MVP, should be replaced with Passport
- authorization is simple for MVP, should be replaced with something like CASL
