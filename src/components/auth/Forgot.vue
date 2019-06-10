<template>
    <div class="columns">
        <div class="column is-6 is-offset-3 is-4-desktop is-offset-4-desktop" style="margin-top:150px;">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Reset password</p>
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
                                @keyup.enter.native="forgot"
                            ></b-input>
                        </b-field>
                    </div>
                </div>
                <footer class="card-footer">
                    <b-button style="border:none;" :disabled="loading ? true : false" @click="forgot" class="card-footer-item">Reset password</b-button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            loading: false,
        }
    },
    methods: {
        async forgot(){
            if(this.email.length < 1){
                this.$snackbar.open({
                    message: 'Please enter the email address.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true
                });
                return false;
            }
            this.loading = true;
            try{
                let handleLogin = await this.$http.post('/forgot', {
                    email: this.email
                });
                if(handleLogin.data){
                    this.loading = false;
                    this.$snackbar.open({
                        message: 'An email has been sent to reset your password.',
                        type: 'is-success',
                        position: 'is-top',
                    })
                }
            }catch(err){
                this.$snackbar.open({
                    message: 'Invalid email.',
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
