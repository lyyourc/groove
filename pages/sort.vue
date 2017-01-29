<template>
<div class="container">
  <nav>
    <ul class="nav-list">
      <li v-for="nav in navs">
        <nuxt-link :to="nav.path" class="nav-item">
          {{ nav.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
  <nuxt-child/>
</div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { name: 'bubble', path: 'bubble' },
        { name: 'select', path: 'select' },
      ]
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #ddd;
  padding: 1.4rem 0;
  margin: 0;
}

.nav-item {
  text-decoration: none;
  text-transform: capitalize;
  margin: .5rem;

  &.nuxt-link-active {
    text-decoration: underline;
  }
}
</style>