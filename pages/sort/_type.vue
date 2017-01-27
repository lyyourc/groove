<template>
<div class="container">
  <transition-group name="flip-list" tag="ul" class="bar-list">
    <li v-for="item in items" :key="item"
      class="bar" :style="{ height: `${item * 2}px` }">
    </li>
  </transition-group>

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
    }
  },
  created() {
    this.animations.push(this.swap.bind(this, this.items))
    this.sort()
  },
  mounted() {
    const start$ = this.$fromDOMEvent('#startBtn', 'click').mapTo('start')
    const stop$ = this.$fromDOMEvent('#stopBtn', 'click').mapTo('stop')
    const reset$ = this.$fromDOMEvent('#resetBtn', 'click').mapTo('reset')

    const { animations } = this
    const items$ = Observable.interval(1000)
      .takeUntil(stop$.merge(reset$))
      .map(i => animations[i % animations.length])

    const animations$ = Observable
      .merge(start$.switchMapTo(items$), reset$)
      .scan((acc, curr) => (curr === 'reset' ? 0 : acc + 1), 0)
      .map(i => animations[i])

    this.$subscribeTo(animations$, fn => fn && fn())
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

            this.animations.push(this.swap.bind(this, itemsCopy))
            items = itemsCopy
          }
        }
      }
    },

    swap(items) {
      this.items = items
    },
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
  transition: transform 1s;
}
.bar-list {
  list-style: none;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}
.bar {
  width: 2rem;
  background: #abcdef;
  border-right: 1px solid #fff;
  &:last-child {
    border-right: none;
  }
}
</style>
