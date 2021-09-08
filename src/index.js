import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getFileData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath), 'utf-8');
  return data;
};

const getFilesData = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  // const object1 = JSON.parse(data1);
  // const object2 = JSON.parse(data2);
  // return [object1, object2];
  return [data1, data2];
};

const getObjectsData = (data1, data2) => {
  const object1 = JSON.parse(data1);
  const object2 = JSON.parse(data2);
  return [object1, object2];
};

const genDiff = (filepath1, filepath2) => {
  // const [object1, object2] = getFilesData(filepath1, filepath2);
  const [data1, data2] = getFilesData(filepath1, filepath2);
  const [object1, object2] = getObjectsData(data1, data2);
  const commonObjects = { ...object1, ...object2 };
  const keys = Object.keys(commonObjects).sort();
  const newObj = {};
  const result = keys.flatMap((key) => {
    if (_.has(object1, key)) {
      if (_.has(object2, key)) {
        if (object1[key] === object2[key]) {
          newObj[`  ${key}`] = object1[key];
          return `  ${key}: ${object1[key]}`;
        }
        newObj[`- ${key}`] = object1[key];
        newObj[`+ ${key}`] = object2[key];
        return [`- ${key}: ${object1[key]}`, `+ ${key}: ${object2[key]}`];
      }
      newObj[`- ${key}`] = object1[key];
      return `- ${key}: ${object1[key]}`;
    }
    newObj[`+ ${key}`] = object2[key];
    return `+ ${key}: ${object2[key]}`;
  });
  let formattedResult = result.join('\n  ');
  formattedResult = `{\n  ${formattedResult}\n}`;
  const resultJSON = JSON.stringify(newObj);
  return [resultJSON, formattedResult];
};

export default genDiff;
