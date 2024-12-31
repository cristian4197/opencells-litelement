import Jasmine from 'jasmine';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

// Import setup.js to ensure the environment is set up correctly
import '../setup.js';

const jasmine = new Jasmine();
const __dirname = dirname(fileURLToPath(import.meta.url));

jasmine.loadConfigFile(resolve(__dirname, '../jasmine.json'));
jasmine.execute();