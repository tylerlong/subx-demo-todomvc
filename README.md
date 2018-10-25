# React & SubX TodoMVC Example

[SubX](https://github.com/tylerlong/subx) is the next generation state container which could replace Redux and MobX. It is flexible yet easy to use.

Use [react-subx](https://github.com/tylerlong/react-subx) if you want to use React together with SubX.


### [Live demo](https://tylerlong.github.io/subx-demo-todomvc/index.html)


## Credit

This TodoMVC application was created by [Tyler Long](https://github.com/tylerlong).


## Minimize rendering

SubX can minimize rendering, it is one of its strengths. React components will not render until absolutely necessary.

In **development** mode, we can watch the rendering by execute the following in browser console:

```js
render$.subscribe(console.log)
```

## Todo

Cannot enter Chinese when editing todo
