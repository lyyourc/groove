<template>
<div class="container">
  {{ name }}
</div>
</template>

<script>
export default {
  data({ params }) {
    return {
      name: params.type
    }
  }
}
</script>