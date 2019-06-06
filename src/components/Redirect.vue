<template>
    <section class="section is-medium page_404">
        <div class="container">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <div class="four_zero_four_bg" v-if="four_o_four">
                        <div class="title has-text-centered">404</div>
                    </div>
                    <div v-if="!four_o_four" style="margin-left:75px;">
                        <svg version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                            <circle fill="none" stroke="#7957d5" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                            <line fill="none" stroke-linecap="round" stroke="#7957d5" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                            <animateTransform 
                                attributeName="transform" 
                                dur="2s"
                                type="rotate"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                            </line>
                            <line fill="none" stroke-linecap="round" stroke="#7957d5" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
                            <animateTransform 
                                attributeName="transform" 
                                dur="15s"
                                type="rotate"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                            </line>
                        </svg>
                    </div>
                    <div class="subtitle">
                        {{ status_msg }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            status_msg: 'You will be redirected in a few seconds...',
            shortCode: '',
            four_o_four: false,
        }
    },
    async created(){
        this.shortCode = this.$route.params.shortCode;
        try{
            let originalUrl = await this.$http.get('/api/getOriginalUrl?shortCode=' + this.shortCode);
            window.location = originalUrl.data;
        }catch(err){
            this.status_msg = err;
            this.four_o_four = true;
        }
    }
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
