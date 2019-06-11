<template>
    <div>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-6 is-offset-3 has-text-centered">
                        Your short link is :
                        <b-field>
                            <b-input placeholder="Link"
                                v-model="this.$props.link"
                                type="text"
                                icon="link"
                                id="short_link">
                            </b-input>
                        </b-field>
                        <b-button
                        type="is-primary"
                        @click="copyToClipboard"
                        >Copy</b-button>
                        <b-button
                            type="is-secondary"
                            @click="$emit('tryAgain',1)"
                        >Try another one</b-button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: [
        'link'
    ],
    data(){
        return {

        }
    },
    mounted(){
        document.getElementById("short_link").select();
    },
    methods:{
        copyToClipboard(){
            document.getElementById("short_link").select();
            document.execCommand("copy");

            this.$snackbar.open(`Short link copied to clipboard!`);
        }
    }
}
</script>

<style scoped>

</style>
