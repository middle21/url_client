<template>
    <div class="columns">
        <div class="column is-6 is-offset-3 is-4-desktop is-offset-4-desktop" style="margin-top:150px;">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Reset your password</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        <b-field label="New password">
                            <b-input
                                v-model="new_password"
                                type="password"
                                icon="key"
                                password-reveal
                                @keyup.enter.native="reset"
                            ></b-input>
                        </b-field>
                    </div>
                </div>
                <footer class="card-footer">
                    <b-button style="border:none;" :disabled="loading ? true : false" @click="reset" class="card-footer-item">Reset password</b-button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            token: '',
            new_password: '',
            loading: false,
        }
    },
    methods: {
        async reset(){
            if(this.new_password.length < 1){
                this.$snackbar.open({
                    message: 'Please enter a valid password.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true
                });
                return false;
            }
            this.loading = true;
            try{
                let handleLogin = await this.$http.post('/reset', {
                    token: this.token,
                    new_password: this.new_password
                });
                if(handleLogin.data){
                    this.loading = false;
                    this.$snackbar.open({
                        message: 'Your password has ben reseted.',
                        type: 'is-success',
                        position: 'is-top',
                    })
                }
            }catch(err){
                this.$snackbar.open({
                    message: 'Error.Link expired.',
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
    },
    created(){
        this.token = this.$route.params.token;
    }
}
</script>

<style scoped>

</style>
