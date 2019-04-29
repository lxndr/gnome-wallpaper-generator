const path = require('path');
const globby = require('globby');
const xmlbuilder = require('xmlbuilder');

var argv = require('yargs')
  .default('duration', 60)
  .argv;

const exts = ['png', 'jpg', 'svg'].join(',');
const dirs = argv._.map(dir => path.join(dir, '**', `*.{${exts}}`));
const files = globby.sync(dirs);

const xml = xmlbuilder.create('background');

const time = xml.ele('starttime');
time.ele('hour', '00');
time.ele('minute', '00');
time.ele('second', '01');

files.forEach((file, index) => {
  const nextFile = index < files.length - 1 ? files[index + 1] : files[0];

  const st = xml.ele('static');
  st.ele('duration', argv.duration);
  st.ele('file', file);

  const tr = xml.ele('transition');
  tr.ele('duration', 2);
  tr.ele('from', file);
  tr.ele('to', nextFile);
});

const txt = xml.end({pretty: true});

console.log(txt);

