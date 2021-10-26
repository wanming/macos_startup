# macos-startup

Get list of macOS startup items.

Under macos, some software will automatically start after installation. The purpose of this software is to obtain the list of macos startup items.

If you want to disable auto-start, just rename the corresponding plist file to a non-plist suffix and restart your mac.

If you want to see which app a plist file corresponds to, you can use the cat command to see.

Some plist files may not be parsed correctly.

plist files that start with com.apple will be ignored.

## Prerequisites

[Node.js](https://nodejs.org/)

## Installation

```shell
npm i -g macos-startup
```

## Usage

```shell
startup_items
```

## License

Distributed under the MIT License.
