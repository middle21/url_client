<template>
  <div>
    <section class="section" v-if="!showShort">
      <div class="container">
        <div class="columns">
          <div class="column is-6 is-offset-3 has-text-centered">
            <b-field>
              <b-input placeholder="Link"
                  v-model="to_be_short"
                  type="text"
                  icon="link">
              </b-input>
            </b-field>
            <b-button
              @click="shortLink"
              type="is-primary"
              :disabled="loading ? true : false"
              :loading="loading ? true : false">Start</b-button>
          </div>
        </div>
      </div>
    </section>

    <ShortLink v-if="showShort" :link="'http://localhost:8080/'+shorted_link"></ShortLink>
    <MyLinks ref="mylinks"></MyLinks>

    <section class="section">
      <div class="container">
        <h1 class="title">Section</h1>
        <h2 class="subtitle">
          A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import ShortLink from "./ShortLink.vue";
import MyLinks from "./MyLinks";

export default {
  components: {
    ShortLink,
    MyLinks,
  },
  data(){
    return{
      loading: false,
      to_be_short: '',
      shorted_link: '',
      showShort: false,
    }
  },
  watch: {
    shorted_link(){
      //this.shorted_link = 'http://localhost:8080/' + this.shorted_link;
      this.showShort = true;
    }
  },
  methods: {
    async shortLink(){
      this.loading = true;
      if(this.to_be_short == ''){
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
      }else{
        let response = await this.$http.post('/api/item', { originalUrl: this.to_be_short, masterkey: localStorage.ownerId});
        this.loading = false;
        this.shorted_link = response.data.urlCode;
        this.$refs['mylinks'].links.push(response.data)
        if(!localStorage.ownerId){
          localStorage.ownerId = response.data.ownerId;
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
