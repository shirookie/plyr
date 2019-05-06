## usage
```js
import VueAPlyr from 'vue-aplyr';

// if you don't want to use v-aplyr-[component], ignore the second param.
Vue.use(VueAPlyr, {
    controls: ['button', 'progress', 'time'],
});
```
### easiest way
```html
<v-aplyr src="./example.mp3" type="audio/mp3"></v-aplyr>
```
or
```html
<v-aplyr>
    <source src="myAudio.mp3" type="audio/mpeg">
    <source src="myAudio.ogg" type="audio/ogg">
    <p>Your browser doesn't support HTML5 audio. Here is a <a href="myAudio.mp4">link to the audio</a> instead.</p>
</v-aplyr>
```
just like the way using `<audio>` directly.

### customize your own control
use `slot="controls"`
```html
<v-aplyr src="./example.mp3" type="audio/mp3">
    <div slot="controls">
        <!-- your own controls -->
        <v-aplyr-button control="play">PLAY BUTTON</v-aplyr-button>
    </div>
</v-aplyr>
```
