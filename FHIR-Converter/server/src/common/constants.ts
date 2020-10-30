import * as fs from 'fs';
import * as path from 'path';

export const LABELS = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../package.nls.json')).toString());