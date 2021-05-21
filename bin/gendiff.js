#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse();

const options = program.opts();
if (options.help === true) {
  program.help();
}
