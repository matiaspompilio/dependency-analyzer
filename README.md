# Dependency Analyzer

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
