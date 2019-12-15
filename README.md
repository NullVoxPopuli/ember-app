# ember-app
meta package for all the packages in ember's app blueprint.

This may or may not be a bad idea, but it'll help you clean up your package.json to figure out which dependencies are used by ember (by default), and which are not.

## Notes on releases / SemVer

When a sub-dependencies has a minor or patch version,`ember-app` will do the same type of release.
If any package bumps a major, ember-app will also do a major version bump.

