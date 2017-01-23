<template>
<div id="sorting">
  <ul class="nav-list">
    <li class="nav-item" v-for="nav in navs">
      <router-link :to="nav.path">{{ nav.name }}</router-link>
    </li>
  </ul>

  <router-view></router-view>
</div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { name: 'bubble', path: '/sorting/bubble' },
        { name: 'select', path: '/sorting/select' },
      ]
    }
  }
}
</script>

<style scoped>
.nav-list {
  list-style: none;
  display: flex;
  margin: 1rem;
  padding: 0;
}

.nav-item {
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
}
</style>