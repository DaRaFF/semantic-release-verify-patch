const assert = require('assert')
const verifyPatch = require('../index')
const options = {applyRegex: '^release-'}
// set DRONE to pretend to be a travis environment
process.env.DRONE = true

// initial commit
let configInitial = {
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
let configPatch = {
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
let configMinor = {
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
let configMajor = {
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
let configEmpty = {}
process.env.DRONE_BRANCH = 'release-2018-01'
assert.throws(
  verifyPatch.bind(null, options, configEmpty),
  /a 'minor' or a 'major' release is not allowed in a maintenance branch/
)

// major commit is allowed on any branch which does not start with 'release-'
let configMajorAllowed = {
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
