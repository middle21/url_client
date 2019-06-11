<template>
    <div>
        <div v-if="protected_link">
            <div class="columns" style="margin-top:50px;">
                <div class="column is-4 is-offset-4">
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
            </div>
        </div>
        <div v-else>
            <div v-if="redirection_type == 2">
                <div class="container" style="margin-top:50px;">
                    <div v-if="!loading" class="card">
                        <header class="card-header">
                            <p class="card-header-title">You are about to be redirected...</p>
                            <a href="#" class="card-header-icon" aria-label="more options">
                                <span class="icon">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </a>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <img style="max-height:230px;width:auto;" :src="'http://api.miniature.io/?url='+originalUrl+'&width=800&height=600&screen=1024'" />
                            </div>
                        </div>
                        <footer class="card-footer">
                            <b-button style="border:none;" :disabled="loading ? true : false" @click="goToUrl" class="card-footer-item">Go to link</b-button>
                            <b-button style="border:none;" :disabled="loading ? true : false" @click="$router.push('/')" class="card-footer-item">Get me out of here</b-button>
                        </footer>
                    </div>
                </div>
            </div>
            <div v-else-if="redirection_type == 1">
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="https://bulma.io">
                        <img src="https://fakeimg.pl/640x160/" width="112" height="28">
                        </a>
                    </div>
                    
                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-start">
                    
                        </div>

                        <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                            <a @click="goToUrl" class="button is-light">
                                Close
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </nav>
                <section>
                    <iframe :src="originalUrl" frameborder="0" style="border: 0; width: 100%; height: 600px;"></iframe>
                    Frame mode may not work with certain websites.Click the close button to get redirected to the destination.
                </section>
            </div>
            <div v-else>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            error: '',
            protected_link: 0,
            loading: 0,
            password: '',
            originalUrl: '',
            redirection_type: '',
            forceRedirect: 0,
        }
    },
    async created(){
        try{
            let data = await this.$http.get('/api/getOriginalUrl?shortCode=' + this.$route.params.shortCode);
            this.redirection_type = data.data.redirectionType;
            if(data.data.expiration){
                this.error = '404';
            }

            if(data.data.password){
                this.protected_link = 1;
            }else{
                if(this.redirection_type == 1){
                    this.$root.$emit('hide_navbar', 'hide');
                }else if(this.redirection_type == 0){
                    window.location.href = data.data.originalUrl;
                }   
                this.originalUrl = data.data.originalUrl;
            }
        }catch(err){
            this.$router.push('/404');
        }
    },
    methods: {
        async verify(){
            if(this.password.length < 1){
                this.$snackbar.open({
                    message: 'Invalid password.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true
                });

                return false;
            }
            let check = await this.$http.get('/api/checkUrlPassword?shortCode=' + this.$route.params.shortCode + '&password=' + this.password);

            if(check.data.status){
                this.originalUrl = check.data.originalUrl;
                this.protected_link = 0;
                if(this.redirection_type == 0){
                    window.location.href = this.originalUrl;
                }else if(this.redirection_type == 1){
                    this.$root.$emit('hide_navbar', 'hide');
                }
            }else{
                this.$snackbar.open({
                    message: 'Invalid password.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true
                });
            }

        },
        goToUrl(){
            window.location.href = this.originalUrl;
        },
    }
}
</script>