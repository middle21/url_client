<template>
    <div class="container">
        <div class="columns has-text-centered" style="margin-top:50px;">
            <div class="column is-12">
                <div class="title">Abuse report</div>
                <div class="subtitle">Report a suspicious link</div>

                <b-input
                    placeholder="Provide suspicious link..."
                    v-model="link"
                    required
                ></b-input>

                <div class="block" style="margin-top:25px;">
                    <b-radio v-model="radio"
                        native-value="Malware">
                        Malware
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="Spam">
                        Spam
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="Spyware">
                        Spyware
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="Phishing">
                        Phishing
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="Pharming"d>
                        Pharming
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="Malicious">
                        Malicious
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="Suspicious">
                        Suspicious
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="Other">
                        Other
                    </b-radio>
                </div>

                <b-button @click="report" :disabled="loading ? true : false" :loading="loading ? true : false" class="is-primary">Report</b-button>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            link: '',
            radio: '',
            loading: false,
        }
    },
    methods: {
        async report(){
            this.loading = true;
            if(this.link.length < 1){
                this.$snackbar.open({
                    message: 'Please enter a valid url.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                        this.loading = false;
                    }
                })

                return false;
            }
            if(this.radio.length < 1){
                this.$snackbar.open({
                    message: 'Please select a reason.',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                        this.loading = false;
                    }
                })

                return false;
            }

            let report = await this.$http.post('/api/reportLink', {
                link: this.link,
                motiv: this.radio
            });

            if(report.data.success == 1){
                this.$router.push('/');
                this.$snackbar.open({
                    message: 'Report sent.Thank you.',
                    type: 'is-success',
                    position: 'is-top',
                })
            }
        }
    }
}
</script>

<style scoped>
</style>
