<template>
    <div class="columns">
        <div class="column is-6 is-offset-3 is-4-desktop is-offset-4-desktop" style="margin-top:150px;">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Register</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        <b-field label="Username">
                            <b-input
                                v-model="username"
                                type="text"
                                icon="user"
                                required
                            ></b-input>
                        </b-field>
                        <b-field label="Email">
                            <b-input
                                v-model="email"
                                type="email"
                                icon="envelope"
                                required
                            ></b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                v-model="password"
                                icon="key"
                                password-reveal
                                required
                            ></b-input>
                        </b-field>

                        <b-field label="Re-type Password">
                            <b-input
                                type="password"
                                v-model="password2"
                                icon="key"
                                password-reveal
                                required
                                @keyup.enter.native="register"
                            ></b-input>
                        </b-field>
                    </div>
                </div>
                <footer class="card-footer">
                    <b-button style="border:none;" :disabled="loading ? true : false" @click="register" class="card-footer-item">Register</b-button>
                    <a @click="$router.push('/login')" class="card-footer-item">Login</a>
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
            username: '',
            password2: '',
            loading: false,
            msg: ''
        }
    },
    methods: {
        async register(){
            if(this.username.length < 1 || this.email.length < 1 || this.password.length < 1 || this.password2.length < 1){
                this.$snackbar.open({
                    message: 'All fields are required.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true
                })

                return false;
            }

            if(this.password != this.password2){
                this.$snackbar.open({
                    message: 'Passwords not the same.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true
                })

                return false;
            }


            this.loading = true;
            try{
                let handleReg = await this.$http.post('/api/users', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    password2: this.password2
                });
                this.$router.push('/login');
                this.$snackbar.open({
                    message: 'You have successfully registered.',
                    type: 'is-success',
                    position: 'is-top',
                    actionText: 'Login'
                })
            }catch(err){
                this.$snackbar.open({
                    message: 'Email already in use',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Login',
                    indefinite: true
                })
            }

            this.loading = false;
        }
    }
}
</script>

<style scoped>

</style>
