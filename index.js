const envCi = require('env-ci')
const SRError = require('@semantic-release/error')

module.exports = {
  verifyRelease (options, context) {
    const {branch} = envCi()
    const type = context?.nextRelease?.type || ''

    const regex = new RegExp(options.applyRegex, 'g')
    if (!regex.test(branch)) return true

    // Only allow a patch or initial release
    if (type === 'patch' || type === 'initial') {
      return true
    }

    throw new SRError(
      `a 'minor' or a 'major' release is not allowed in a maintenance branch.\n` +
      `Please update your commit messages in the maintenance branch.`
    )
  }
}
