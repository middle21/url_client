<template>
    <div>
        <div class="columns">
            <div class="column is-6 is-offset-3">
                <div class="level" v-for="(link,index) in links" :key="index">
                    <div class="level-item">
                        <b-tooltip v-if="link.description" :label="link.description">
                             {{ link.urlCode }}
                        </b-tooltip>
                        <div v-else>{{ link.urlCode }}</div>
                    </div>
                    <div class="level-item">{{ link.createdAt }}</div>
                </div>
            </div>
        </div>
        <div v-if="isGuest" class="columns">
            <div class="column is-6 is-offset-3 has-text-centered">
                <p>Register in order to not lose your links.</p>
                <b-button @click="$router.push('/register')">Register</b-button>
            </div>
        </div>
        <div v-else class="columns">
            <div v-if="links.length > 0" class="column is-6 is-offset-3 has-text-centered">
                <b-button v-if="toggleButton == 0" @click="loadAllLinks" class="is-primary">View all links</b-button>
                <b-button v-else @click="hideLinks" class="is-secondary">Hide</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            links: [],
            toggleButton: 0
        }
    },
    async created(){
        if( this.$user.get().role === 'guest' ){
            if(localStorage.ownerId){
                let getGuestLinks = await this.$http.get('/api/getGuestLinks?limit=5&masterkey=' + localStorage.ownerId);
                this.links = getGuestLinks.data;
            }
        }else if( this.$user.get().role === 'registered' ){
            if(localStorage.ownerId){
                let getMyLinks = await this.$http.get('/api/getMyLinks?limit=5');
                if(getMyLinks.data !== "not found"){
                    this.links = getMyLinks.data;
                }
            }
        }
    },
    methods: {
        hideLinks(){
            this.toggleButton = 0;
            this.links.splice(5,this.links.length);
        },
        async loadAllLinks(){
            this.toggleButton = 1;
            if( this.$user.get().role === 'guest' ){
                if(localStorage.ownerId){
                    let getGuestLinks = await this.$http.get('/api/getGuestLinks?masterkey=' + localStorage.ownerId);
                    this.links = getGuestLinks.data;
                }
            }else if( this.$user.get().role === 'registered' ){
                if(localStorage.ownerId){
                    let getMyLinks = await this.$http.get('/api/getMyLinks');
                    if(getMyLinks.data !== "not found"){
                        this.links = getMyLinks.data;
                    }
                }
            }
        }
    },
    computed: {
        isGuest() {
            return this.$user.get().role === 'guest'
        }
    },
    watch: {
        isGuest(oldval, newval){
            this.links = []
        }
    }
}
</script>

<style scoped>
</style>
