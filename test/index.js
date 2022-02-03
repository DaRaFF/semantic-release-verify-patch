const assert = require('assert')
const verifyPatch = require('../index').verifyRelease
const options = {applyRegex: '^release-'}
// set DRONE to pretend to be a travis environment
process.env.DRONE = true

// initial commit
const configInitial = {
  nextRelease: {
    type: 'initial'
  }
}
process.env.DRONE_BRANCH = 'release-2018-01'
assert.equal(
  verifyPatch(options, configInitial),
  true,
  'expect an initial commit to be allowed'
)

// patch commit
const configPatch = {
  nextRelease: {
    type: 'patch'
  }
}
process.env.DRONE_BRANCH = 'release-2018-01'
assert.equal(
  verifyPatch(options, configPatch),
  true,
  'expect a patch commit to be allowed'
)

// minor commit
const configMinor = {
  nextRelease: {
    type: 'minor'
  }
}
process.env.DRONE_BRANCH = 'release-2018-01'
assert.throws(
  verifyPatch.bind(null, options, configMinor),
  /a 'minor' or a 'major' release is not allowed in a maintenance branch/
)

// major commit
const configMajor = {
  nextRelease: {
    type: 'major'
  }
}
process.env.DRONE_BRANCH = 'release-2018-01'
assert.throws(
  verifyPatch.bind(null, options, configMajor),
  /a 'minor' or a 'major' release is not allowed in a maintenance branch/
)

// config is empty
const configEmpty = {}
process.env.DRONE_BRANCH = 'release-2018-01'
assert.throws(
  verifyPatch.bind(null, options, configEmpty),
  /a 'minor' or a 'major' release is not allowed in a maintenance branch/
)

// major commit is allowed on any branch which does not start with 'release-'
const configMajorAllowed = {
  nextRelease: {
    type: 'major'
  }
}
process.env.DRONE_BRANCH = 'master'
assert.equal(
  verifyPatch(options, configMajorAllowed),
  true,
  'expect a patch commit to be allowed'
)
