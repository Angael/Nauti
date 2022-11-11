import * as fs from 'fs';

export default (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString());
