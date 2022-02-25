<!--
 * @Author: liuchenxi <lcxcsy@126.com>
 * @Date: 2021-09-01 17:00:06
 * @LastEditTime: 2021-11-08 15:14:09
 * @LastEditors: Please set LastEditors
 * @Description: README
 * @FilePath: \MyCode\Hikvision\MyGithub\browser-voice-plugin\README.md
-->

## browser-voice-plugin

> A minimalist speech broadcast library (only 3kb) based on JavaScript V8.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

### Overall

VoicePlugin supports speaking text in the browser side, as well as the ability to pause, resume, and stop speaking. Currently, VoicePlugin only supports Internet Explorer (based on Sapi.Spvoice library), Chrome, and Firefox (based on SpeechSynthesisUtterance Object).

### Options

For IE browser, you can set volume (range: 0.1 ~ 1) and rate (range: 0.1 ~ 10), such as

```js
const options = {
  volume: 0.5,
  rate: 1
};
const hiSounder = new VoicePlugin(options);
```

For Chrome and FireFox browser, you can set lang (zh-CN or en-US) and pitch (range: 0 ~ 2), such as:

```js
const options = {
  volume: 0.5,
  rate: 1,
  lang: 'zh-CN',
  pitch: 1
};
const hiSounder = new VoicePlugin(options);
```

### Usage

HTML

```html
<script src="../dist/voicePlugin.min.js"></script>
<script type="text/javascript">
  const hiSounder = new VoicePlugin();
  hiSounder.speak('我爱你，中国');
</script>
```

CLI

```js
import VoicePlugin from 'browser-voice-plugin';
const hiSounder = new VoicePlugin();
hiSounder.speak('我爱你，中国');
```

### License

Browser-voice-plugin is licensed under a [MIT License](https://opensource.org/licenses/MIT)

### References

1. [https://blog.csdn.net/xjl271314/article/details/106220492/](https://blog.csdn.net/xjl271314/article/details/106220492/)
2. [SpeechSynthesisVoice](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice)
3. [SpVoice Volume property](<https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms723615(v=vs.85)>)
