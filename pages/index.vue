<template>
<section class="container">
  <header>
    <nuxt-link to="/">
      <img src="../assets/img/logo.png" alt="logo" class="logo" />
    </nuxt-link>
    <nuxt-link to="/">
      <h1 class="title"> I 🍴 algorithm </h1>
    </nuxt-link>
  </header>

  <main>
    <ul class="item-list">
      <li class="item" v-for="nav in navs">
        <nuxt-link :to="nav.path">
          <h2>{{ nav.name }}</h2>
        </nuxt-link>
      </li>
    </ul>
  </main>
</section>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { name: 'sort', path: '/sort'}
      ],
    }
  },
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .6rem 1rem;
}

.logo {
  width: 3rem;
  height: auto;
  margin-right: 1rem;
}

.title {
  color: #505153;
  font-size: 1.5rem;
}

.item-list {
  list-style: none;
  padding: 0;

  display: flex;
}
.item {
  flex: 1;
  border: 1px solid #eee;
  padding: 3rem;
}
</style>
