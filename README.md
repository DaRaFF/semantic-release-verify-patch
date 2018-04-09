# Semantic Release Verify Patch

## Introduction
`semantic-release-verify-patch` is a plugin for
`semantic-release`’s [verifyRelease](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/plugins.md#verifyrelease-plugin)
step.

A release is only allowed when it's a `patch` release. `minor` and `major` releases get rejected.

## Setup Example

The setting `applyRegex` defines when the plugin `semantic-release-verify-patch` gets applied.

```js
{
  "devDependencies": {
    "semantic-release-verify-patch": "^2.0.0"
  },
  "release": {
    "verifyRelease": [{
        "path": "semantic-release-verify-patch",
        "applyRegex": "^release-"
      }
    ]
  }
}
```

## Compatibility

This plugin is compatible with semantic-release [11.0.0](https://github.com/semantic-release/semantic-release/releases/tag/v11.0.0) - [15.1.5](https://github.com/semantic-release/semantic-release/releases/tag/v15.1.5) (most current version available at commit time)

## License

MIT
