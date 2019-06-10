<template>
<div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
        
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                <a class="button is-primary">
                    <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                    Log in
                </a>
                </div>
            </div>
            </div>
        </div>
        </nav>
    <section class="section is-medium page_404">
        <div class="container">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <div class="four_zero_four_bg" v-if="four_o_four">
                        <div class="title has-text-centered">404</div>
                    </div>
                    <div v-if="(!four_o_four) & (!protected)" style="margin-left:75px;">
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
                    <div v-else>
                        <div v-if="!loading" class="card">
                            <header class="card-header">
                                <p class="card-header-title">Password Protected</p>
                                <a href="#" class="card-header-icon" aria-label="more options">
                                    <span class="icon">
                                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </header>
                            <div class="card-content">
                                <div class="content">
                                    <b-field label="Password">
                                        <b-input
                                            v-model="password"
                                            type="password"
                                            icon="key"
                                            @keyup.enter.native="verify"
                                        ></b-input>
                                    </b-field>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <b-button style="border:none;" :disabled="loading ? true : false" @click="verify" class="card-footer-item">Go to link</b-button>
                            </footer>
                        </div>
                    </div>
                    <div class="subtitle">
                        {{ status_msg }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
export default {
    data(){
        return{
            status_msg: 'You will be redirected in a few seconds...',
            shortCode: '',
            four_o_four: false,
            protected: false,
            password: '',
            loading: false,
            destination_url: '',
            linkPass: '',
            frame: 0,
        }
    },
    methods: {
        verify(){
            if(this.linkPass == this.password){
                window.location.href = this.destination_url;
            }else{
                this.$snackbar.open({
                    message: 'Invalid password.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true
                });
            }
        }
    },
    async created(){
        this.shortCode = this.$route.params.shortCode;
        try{
            let originalUrl = await this.$http.get('/api/getOriginalUrl?shortCode=' + this.shortCode);
            console.log(originalUrl.data)
            if(originalUrl.data.expiration == 1){
                this.four_o_four = true;
                this.loading = true;
                this.status_msg = "Link not found.";
                return false;
            }else{
                if(originalUrl.data.password != ''){
                    this.linkPass = originalUrl.data.password;
                    this.protected = true;
                    this.status_msg = '';
                    this.destination_url = originalUrl.data.originalUrl;
                    return;
                }else{
                    if(originalUrl.data.redirectionType == 0){
                        //direct redirection
                        window.location = originalUrl.data.originalUrl;
                    }else if(originalUrl.data.redirectionType == 1){
                        this.frame = 1;
                        this.$emit('navbar', 0);
                    }else{
                        //Splash redirection
                    }
                    
                }
            }
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
