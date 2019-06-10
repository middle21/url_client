<template>
    <div class="columns">
        <div class="column is-6 is-offset-3 is-4-desktop is-offset-4-desktop" style="margin-top:150px;">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Login</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        <b-field label="Email">
                            <b-input
                                v-model="email"
                                type="email"
                                icon="envelope"
                            ></b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                v-model="password"
                                icon="key"
                                password-reveal
                                @keyup.enter.native="login"
                            ></b-input>
                        </b-field>
                    </div>
                </div>
                <footer class="card-footer">
                    <b-button style="border:none;" :disabled="loading ? true : false" @click="login" class="card-footer-item">Login</b-button>
                    <a @click="$router.push('/forgot')" class="card-footer-item">I forgot my password.</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            password: '',
            email: '',
            loading: false,
        }
    },
    methods: {
        async login(){
            this.loading = true;
            try{
                let handleLogin = await this.$http.post('/login', {
                    email: this.email,
                    password: this.password
                });

                localStorage.token = handleLogin.data;

                let user;

                this.$user.set({ token: handleLogin.data });
                const token = handleLogin.data;
                localStorage.setItem('ownerId', token);
                localStorage.setItem('access-token', token)

                this.$http.defaults.headers.common['access-token'] = token
                this.$http.get('/api/users/details').then(response => {
                    user = {
                        role: "registered",                        
                        email: response.data.email,
                        username: response.data.username,
                        id: response.data._id
                    };
                    this.$user.set(user);
                });
                this.loading = false;
            }catch(err){
                this.$snackbar.open({
                    message: 'Invalid username/password.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                        this.loading = false;
                    }
                })
            }
            
        }
    }
}
</script>

<style scoped>

</style>
