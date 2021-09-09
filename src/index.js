import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const makeFileData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath), 'utf-8');
  return data;
};

const buildDiff = (parseBefore, parseAfter) => {
  const commonParse = { ...parseBefore, ...parseAfter };
  const keys = Object.keys(commonParse).sort();
  const newObj = {};
  const result = keys.flatMap((key) => {
    if (_.has(parseBefore, key)) {
      if (_.has(parseAfter, key)) {
        if (parseBefore[key] === parseAfter[key]) {
          newObj[`  ${key}`] = parseBefore[key];
          return `  ${key}: ${parseBefore[key]}`;
        }
        newObj[`- ${key}`] = parseBefore[key];
        newObj[`+ ${key}`] = parseAfter[key];
        return [`- ${key}: ${parseBefore[key]}`, `+ ${key}: ${parseAfter[key]}`];
      }
      newObj[`- ${key}`] = parseBefore[key];
      return `- ${key}: ${parseBefore[key]}`;
    }
    newObj[`+ ${key}`] = parseAfter[key];
    return `+ ${key}: ${parseAfter[key]}`;
  });
  let formattedResult = result.join('\n  ');
  formattedResult = `{\n  ${formattedResult}\n}`;
  const resultJSON = JSON.stringify(newObj);
  return [resultJSON, formattedResult];
};

const genDiff = (filepath1, filepath2) => {
  const beforeConfig = makeFileData(filepath1);
  const afterConfig = makeFileData(filepath2);

  const parseBefore = JSON.parse(beforeConfig);
  const parseAfter = JSON.parse(afterConfig);
  return buildDiff(parseBefore, parseAfter);
};

export default genDiff;
