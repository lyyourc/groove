<template>
<div>
  <header>
    <img class="logo" src="../assets/logo.png" alt="logo">
    <h2 class="title"> I Hate Algorithm </h2>
  </header>

  <main class="nav-list">
    <section class="nav-item" v-for="nav in navs">
      <router-link :to="nav.path">{{ nav.name }}</router-link>
    </section>
  </main>

  <router-view></router-view>
</div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { name: 'sorting', path: '/sorting' },
        { name: 'link list', path: '/link-list' },
      ],
    }
  },
}
</script>

<style scoped>
header {
  height: 4rem;
  display: flex;
  align-items: center;

  background: #eee;
  padding: 1rem;
}

.logo {
  height: 50%;
  width: auto;
  margin-right: .5rem;
}

.title {
  margin: 0;
  text-transform: capitalize;
}

.nav-list {
  display: flex;
}

.nav-item {
  height: 10rem;
  width: 10rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #eee;
  &:nth-of-type(2n) {
    border-left: none;
  }

  & a {
    color: var(--main-color);
    font-size: 1.6rem;
  }
}

</style>