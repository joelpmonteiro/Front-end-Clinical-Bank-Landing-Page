<template>
  <div class="col-10 col-sm-6 col-md-6 col-lg-5 position_img me-5 d-m-none">
    <div class="row">
      <a href="/" style="margin: -3rem auto">
        <img class="img-fluid" loading="lazy" src="../assets/Group_1.png" />
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media (max-width: 600px) {
  .position_img {
    margin-top: 8%;
  }

  .d-m-none {
    display: none;
  }
}

@media (max-width: 767.98px) {
  .position_img {
    margin-top: 10%;
  }

  .d-m-none {
    display: none;
  }
}

@media (max-width: 991.98px) {
  .position_img {
    margin-top: 10%;
  }
}
</style>
