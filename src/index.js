import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (pathToFile1, pathToFile2) => {
  const path1 = path.resolve(pathToFile1);
  const path2 = path.resolve(pathToFile2);
  const data1 = fs.readFileSync(path1, 'utf-8');
  const object1 = JSON.parse(data1);
  const data2 = fs.readFileSync(path2, 'utf-8');
  const object2 = JSON.parse(data2);
  const commonObjects = { ...object1, ...object2 };
  const keys = Object.keys(commonObjects).sort();
  const result = keys.flatMap((key) => {
    if (_.has(object1, key)) {
      if (_.has(object2, key)) {
        if (object1[key] === object2[key]) {
          return `  ${key}: ${object1[key]}`;
        }
        return [`- ${key}: ${object1[key]}`, `+ ${key}: ${object2[key]}`];
      }
      return `- ${key}: ${object1[key]}`;
    }
    return `+ ${key}: ${object2[key]}`;
  });
  const str = result.join('\n  ');
  const strFormatted = `{\n  ${str}\n}`;
  console.log(strFormatted);
};

export default genDiff;
