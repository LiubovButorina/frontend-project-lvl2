#!/usr/bin/env node

import program from 'commander';
import gendiff from '../src/index.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const [, result] = gendiff(filepath1, filepath2);
    console.log(result);
  })
  .parse(process.argv);
