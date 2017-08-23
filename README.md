# semantic-release-verify-patch

[![Build Status](https://travis-ci.org/DaRaFF/semantic-release-verify-patch.svg?branch=master)](https://travis-ci.org/DaRaFF/semantic-release-verify-patch)

`semantic-release-verify-patch` is an implementation of
`semantic-release`’s [verifyRelease](https://github.com/semantic-release/semantic-release#verifyrelease)
extension point.

A release is only allowed when it's a `patch` release. `minor` and `major` releases are rejected.

1. it's,
2. on the right branch and
3. not happening before all jobs succeeded

## License

MIT
