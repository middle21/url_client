<template>
    <div class="columns">
        <div class="column is-6 is-offset-3" style="margin-top:150px;">
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
                            ></b-input>
                        </b-field>
                    </div>
                </div>
                <footer class="card-footer">
                    <a @click="login" class="card-footer-item">Login</a>
                    <a href="#" class="card-footer-item">I forgot my password.</a>
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
        }
    },
    methods: {
        async login(){
            let handleLogin = await this.$http.post('/login', {
                email: this.email,
                password: this.password
            });

            localStorage.token = handleLogin.data;
        }
    }
}
</script>

<style scoped>

</style>
