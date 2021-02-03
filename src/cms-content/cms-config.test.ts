import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const CMS_CONFIG_PATH = path.join(__dirname, '../../public/admin/config.yml');

describe('CMS Config', () => {
  test('Config Branch is cms-content-entry', () => {
    const config = yaml.load(fs.readFileSync(CMS_CONFIG_PATH, 'utf8'));
    // @ts-ignore: TODO: Add better typing for config
    const configBranchName = config['backend']['branch'];

    // cms-content-entry is the current CMS branch we work off of. During development
    // this branch is often changed.  This check ensures that it is
    // set to the default before merging.
    expect(configBranchName).toBe('cms-content-entry');
  });
});
