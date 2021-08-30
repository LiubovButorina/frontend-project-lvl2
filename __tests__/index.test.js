import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

test('difference of 2 json files', () => {
  const getFixturePath = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fixturePath = path.join(__dirname, '..', '__fixtures__', filename);
    return fixturePath;
  };
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const fixturePath1 = getFixturePath('before.json');
  const fixturePath2 = getFixturePath('after.json');
  const resultJSON = readFile('result.json');
  const [result] = genDiff(fixturePath1, fixturePath2);
  expect(result).toEqual(resultJSON);
});
