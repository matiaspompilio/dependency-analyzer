# Dependency Analyzer

Dependency Analyzer is a CLI app designed for analyze and parse information from different websites. The goal is to get information about urls previously written in a csv file.

## Requisites

You’ll need to have Node 14 or later on your local development machine. You can use [nvm](https://github.com/nvm-sh/nvm) to easily switch Node versions between different projects.

### Quickstart

```sh
$ git clone https://github.com/matiaspompilio/dependency-analyzer.git
$ cd dependency-analyzer
$ nvm use
$ yarn
$ yarn analyze --file <csv_file_path> [options]
```

### CSV Format

The csv input must have the following format:

| title             | url                                                                    |
| ----------------- | ---------------------------------------------------------------------- |
| Facebook          | www.facebook.com                                                       |
| Example           | ~/example/index.html

As the example shows, the url column could be a local path.
The headers `title` and `url` are required.

### Options

- -V, --version output the version number
- -f, --file <path> Csv file where the website data is read
- -l, --length Returns each website name with its length in bytes
- -d, --dependencies Returns each js with the website where it belongs
- -r, --resources Returns how often resources appear on the websites
- -h, --help display help for command

### Tests

Running unit test using Jest

Execute `yarn test` to run project tests

### TODO

- Improve the test coverage.
- Publish package to npm registry to make it easier to use
