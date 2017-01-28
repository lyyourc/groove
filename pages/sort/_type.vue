<template>
<div class="container">
  <ul class="bar-list" ref="list">
    <li v-for="item in items" :key="item" class="bar" :id="item"
      :style="{ height: `${item * 2}px` }">
    </li>
  </ul>

  <div class="control">
    <button id="startBtn">Start</button>
    <button id="stopBtn">Stop</button>
    <button id="resetBtn">Reset</button>
  </div>
</div>
</template>

<script>
import { Observable } from 'rxjs/Observable'

export default {
  data({ params } = {}) {
    return {
      items: [20, 12, 7, 30, 18],
      animations: [],
      positions: [],
    }
  },
  created() {
    this.animations = [ this.swap.bind(this, this.items) ]
    this.sort()
  },
  updated() {
    this.animate()
    this.updatePosition()
  },
  mounted() {
    this.updatePosition()

    const start$ = this.$fromDOMEvent('#startBtn', 'click').mapTo('start')
    const stop$ = this.$fromDOMEvent('#stopBtn', 'click').mapTo('stop')
    const reset$ = this.$fromDOMEvent('#resetBtn', 'click').mapTo('reset')

    const animations = this.animations
    const interval$ = Observable.interval(1000)
      .take(animations.length)

    const animations$ = Observable
      .merge(start$, stop$, reset$)
      .switchMap(action =>
        action === 'start' ? interval$ : Observable.empty())
      .scan((acc, curr) => (acc + 1), 0)
      .map(i => animations[i])
      .filter(animation => !!animation)

    this.$subscribeTo(animations$, fn => {
      debugger
      fn && fn()
    })
  },
  methods: {
    sort() {
      let items = [...this.items]
      const length = items.length

      for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          const item1 = items[j]
          const item2 = items[j + 1]

          if (item2 < item1) {
            const itemsCopy = [...items]
            const tmp = item1
            itemsCopy[j] = item2
            itemsCopy[j + 1] = tmp

            this.animations = [
              ...this.animations,
              this.swap.bind(this, itemsCopy)
            ]
            items = itemsCopy
          }
        }
      }
    },

    swap(items) {
      this.items = items
    },

    updatePosition() {
      [...this.$refs.list.children].forEach(child => {
        this.positions[child.id] = child.getBoundingClientRect()
      })
    },

    calcPosition(item) {
      const index = this.items.findIndex(iten => iten === item)
      return `translate(${index * 2}rem, 0)`
    },

    animate() {
      [...this.$refs.list.children].map((child, i) => {
        const deltaX = this.positions[child.id].left
          - child.getBoundingClientRect().left

        if (deltaX === 0) return

        requestAnimationFrame(() => {
        // Before the DOM paints, Invert it to its old position
          child.style.transform = `translate(${deltaX}px)`
          // Ensure it inverts it immediately
          child.style.transition = 'transform 0s'  

          requestAnimationFrame(() => {
            // In order to get the animation to play, we'll need to wait for
            // the 'invert' animation frame to finish, so that its inverted
            // position has propagated to the DOM.
            //
            // Then, we just remove the transform, reverting it to its natural
            // state, and apply a transition so it does so smoothly.
            child.style.transform  = ''
            child.style.transition = 'transform 1s'
          })
        })
      })
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flip-list-move {
  /* transition: transform 1s; */
}
.bar-list {
  width: 20rem;
  height: 10rem;
  padding: 0;
  list-style: none;
  border: 1px solid #ddd;
  display: flex;
  align-items: flex-end;
}
.bar {
  width: 2rem;
  background: #abcdef;
  border-right: 1px solid #fff;
  transition: transform 1s;

  &:last-child {
    border-right: none;
  }
}
</style>
