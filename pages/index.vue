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
  </section>
</template>

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
</style>
