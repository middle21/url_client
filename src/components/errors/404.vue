<template>
    <div class="container" style="margin-top:100px;">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="four_zero_four_bg">
                    <div class="title has-text-centered">404</div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12 has-text-centered">
                <b-button class="is-primary">Home</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
svg{
  width: 100px;
  height: 100px;
  margin: 20px;
  display:inline-block;
}
.page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
}

.page_404  img{ width:100%;}

.four_zero_four_bg{
 
 background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
 }
</style>
