// @ts-ignore
import * as Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const main = () => {
  const templateString = fs.readFileSync(
    path.join(__dirname, './template.html'),
    'utf8',
  );
  const template = Handlebars.compile(templateString);

  const data = {
    location_name: 'Travis County, TX',
    change: 'threat increased',
    last_updated: '5/1/2020',
    img_url: path.join(__dirname, 'alert_image_demo.png'),
  };

  const outputPath = path.join(__dirname, './built.html');
  fs.writeFileSync(outputPath, template(data));
};

main();
