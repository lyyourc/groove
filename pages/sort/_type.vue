<template>
<div class="sort-container">
  <ul class="bar-list" ref="list">
    <li v-for="item in items" :key="item" class="bar" 
      :id="'item-'+item"
      :style="{ height: `${item * 2}px` }">
    </li>
  </ul>

  <div class="control">
    <button id="restartBtn" v-show="isPlayDone">Restart</button>
    <button id="startBtn" v-show="!isPlaying && !isPlayDone">Start</button>
    <button id="stopBtn" v-show="isPlaying && !isPlayDone">Stop</button>
  </div>
</div>
</template>

<script>
import { Observable } from 'rxjs/Observable'

export default {
  data({ params } = {}) {
    return {
      isPlaying: false,
      currentStep: -1,
      items: [20, 12, 7, 30, 18],
      animations: [],
      positions: {},
    }
  },
  computed: {
    isPlayDone() {
      return this.currentStep === this.animations.length - 1
    }
  },
  created() {
    this.initItems = this.items
    this.sort()
  },
  updated() {
    this.animate()
    this.updatePosition()
  },
  mounted() {
    this.updatePosition()

    const start$ = this.$fromDOMEvent('#startBtn', 'click')
      .do(() => this.isPlaying = true)

    const stop$ = this.$fromDOMEvent('#stopBtn', 'click')
      .do(() => this.isPlaying = false)

    const restart$ = this.$fromDOMEvent('#restartBtn', 'click')
      .do(() => {
        this.isPlaying = true
        this.items = this.initItems
      })

    const { animations } = this
    const interval$ = Observable.interval(1000)
      .takeUntil(stop$)
      .map(() => this.currentStep = this.isPlayDone ? 0 : this.currentStep + 1)

    const animations$ = start$
      .merge(restart$.delay(500))
      .switchMapTo(interval$)
      .take(animations.length)
      .map(i => animations[i])
      .repeat()

    this.$subscribeTo(animations$, fn => fn())
  },

  methods: {
    sort() {
      let items = [...this.items]
      const length = items.length

      // if not set, `null` will exist in this array, but why?
      this.animations = [] 

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
.sort-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.bar-list {
  padding: 0;
  margin: 1rem;
  list-style: none;
  // border: 1px solid #ddd;
  display: flex;
  align-items: flex-end;
}
.bar {
  width: 2rem;
  background: #abcdef;
  border-right: 1px solid #fff;
  flex: 1;
  transition: transform 1s;

  &:last-child {
    border-right: none;
  }
}

.control {
  margin: 1rem;
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
