<template>
    <div>
        <div class="columns">
            <div class="column is-6 is-offset-3">
                <div class="level" v-for="(link,index) in links" :key="index">
                    <div class="level-item">{{ link.urlCode }}</div>
                    <div class="level-item">{{ link.createdAt }}</div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6 is-offset-3 has-text-centered">
                <p>Register in order to not lose your links.</p>
                <b-button>Register</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            links: {},
        }
    },
    async created(){
        if(localStorage.ownerId){
            let getGuestLinks = await this.$http.get('/api/getGuestLinks?masterkey=' + localStorage.ownerId);
            this.links = getGuestLinks.data;
            console.log(getGuestLinks.data);
        }
    }
}
</script>

<style scoped>
</style>
