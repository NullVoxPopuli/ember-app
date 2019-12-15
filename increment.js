const fs = require('fs');
const semver = require('semver');
const execa = require('execa');
const childProcess = require('child_process');


const current = require('./package.json');
const previous = execa.sync('git show HEAD~2:package.json', { shell: true }).stdout;

const currentDepVers = current.dependencies;
const previousDepVers = JSON.parse(previous).dependencies;

const currentDeps = Object.keys(currentDepVers);
const previousDeps = Object.keys(previousDepVers);

if (currentDeps.length !== previousDeps.length) {
  console.log('major');
  process.exit(0);
}


let increment;

for (let dep of currentDeps) {
  let currentVersion = currentDepVers[dep];
  let previousVersion = previousDepVers[dep];

  let currentSV = semver.coerce(currentVersion);
  let previousSV = semver.coerce(previousVersion);

  if (!currentSV || !previousSV) {
    continue;
  }

  // what was the change?
  let result = semver.diff(currentSV, previousSV);

  if (result) {

    // possible: major, premajor, minor, preminor, patch, prepatch, or prerelease (or the same)
    switch (increment) {
      case 'patch':
        increment = result;
        break;
      case 'minor':
        if (result !== 'patch') increment = result;
        break;
      case 'major':
        break;
      default:
        increment = result;
    }
  }

}

if (!increment) {
  console.log('There are no differences');
  process.exit(1);
} else {
  console.log(increment);
}



