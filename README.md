# IG+VSCO fullsize

Click extension icon to open current Instagram, VSCO or TikTok image or profile picture in the highest resolution possible.

Released on [Chrome Web Store](https://chrome.google.com/webstore/detail/ig+vsco-fullsize/ngdfnokoifnihnknoibnbhfhnkmlfocb) and [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/ig-vsco-fullsize/). See example below:

![Example usage](example.gif)

Functionality tested on 2020-11-09.

## Changelog

### 1.3.2

- Added support for opening reels. Thanks to [@JohnPlanetary](https://github.com/JohnPlanetary) for reporting issue
- Fixed VSCO profile picture after class name change
- Fixed TikTok profile issue, but still has trouble after browsing between profiles
- Known issue with HD profile pictures after API-change still being investigated

### 1.3.1

Added ctrl/command-click to Instagram "not logged in" functionality. This allows for opening in new window, so that you don't loose your scroll position.

### 1.3.0

- Allowed browsing Instagram without being logged in
- Added TikTok support for video and profile picture
- Fixed removal of Instagram login dialog
- Fixed VSCO profile picture

### 1.2.8

Fixed broken VSCO profile picture after they started using "/gallery" postfix for URL.

### 1.2.7

Fixed broken Instagram picture under certain conditions.

### 1.2.6

Fixed broken VSCO profile picture after they started using infinite scroll ("load more").

### 1.2.5

Removed blocking Instagram login dialog.

### 1.2.4

Added Instagram HD profile picture support. This requires being logged in, but falls back to default profile picture.

### 1.2.3

- Fixed broken VSCO profile picture support

### 1.2.2

- Added VSCO and Instagram profile picture support
- Improved tab placement/inheritance

### 1.2.1

Added VSCO video support.

### 1.2

Added wider range of supported formats for Instagram:

- Supports single and multiple images
- Supports single and multiple videos

Added functionality to open VSCO images inn the highest resolution possible.

### 1.0

Initial store release. Basic Instagram functionality.

## License

The software in this repo is released under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), also found in the `LICENSE` file.

## Credits

The Instagram approach used is derived from [this StackOverflow answer](https://stackoverflow.com/a/48296606/2732991).

The logo icon is the "camera" icon from [Material Design Icons](https://materialdesignicons.com/).
