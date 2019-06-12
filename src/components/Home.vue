<template>
  <div>
    
    <div class="container">
      <div class="columns">
        <div class="column is-10-mobile is-offset-1-mobile is-6 is-offset-3 has-text-centered">
          <img src="moon.svg">
        </div>
      </div>
    </div>
    <section class="section" v-if="!showShort">
      <div class="container" style="margin-top:-50px;">
        <div class="columns">
          <div class="column is-6 is-offset-3 has-text-centered">
            <b-field>
              <b-input placeholder="Link"
                  v-model="to_be_short"
                  type="text"
                  icon="link"
                  @keyup.enter.native="shortLink"
                  >
              </b-input>
            </b-field>
            <div class="level">
              <div class="level-item">
                <b-select placeholder="Redirection type" v-model='selected_redirection_type'>
                  <option
                      v-for="option in redirection_types"
                      :value="option.id"
                      :key="option.id">
                      {{ option.name }}
                  </option>
                </b-select>
              </div>
              <div class="level-item">
                <b-button
                  @click="shortLink"
                  type="is-primary"
                  :disabled="loading ? true : false"
                  :loading="loading ? true : false">Start</b-button>
              </div>
              <div class="level-item">
                <b-button @click="advanced = !advanced">Advanced</b-button>
              </div>
            </div>

            <div v-if="advanced" class="columns">
              <div class="column is-3">
                Custom Alias
                <b-tooltip label="If you need a custom alias you can enter it below." position="is-bottom" multilined>
                  <b-input
                    placeholder="Alias here"
                    v-model="alias" 
                  ></b-input>
                </b-tooltip>
              </div>
              <div class="column is-3">
                Expiration
                <b-tooltip label="Set an expiration date." position="is-bottom" multilined>
                  <b-datepicker
                      v-model="expiration"
                      placeholder="Click to select...">
                  </b-datepicker>
                </b-tooltip>
              </div>
              <div class="column is-3">
                Password
                <b-tooltip label="By adding a password, you can restrict the access." position="is-bottom" multilined>
                  <b-input
                    placeholder="Password"
                    v-model="password" 
                  ></b-input>
                </b-tooltip>
              </div>
              <div class="column is-3">
                Description
                <b-tooltip label="This can be used to identify URLs on your account." position="is-bottom" multilined>
                  <b-input
                    placeholder="Description"
                    v-model="description" 
                  ></b-input>
                </b-tooltip>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>

    <ShortLink v-if="showShort" @tryAgain="$router.go('/')" style="margin-top:-50px;" :link="'http://localhost:8080/'+shorted_link"></ShortLink>
    <MyLinks ref="mylinks"></MyLinks>

    <section class="section">
      <div class="container">
        <h1 class="title">Links that mean business</h1>
        <h2 class="subtitle">
          Create and share trusted, <strong>powerful</strong> short links
        </h2>
      </div>
    </section>
    <br><br>
    <footer>
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1794 274.42">
        <defs>
          <linearGradient id="linear-gradient" x1="1269.83" y1="1426.04" x2="735.17" y2="499.96" gradientUnits="userSpaceOnUse">
            <stop offset="0.1" stop-color="#5f5f5f" stop-opacity="0"/>
            <stop offset="0.19" stop-color="#626262" stop-opacity="0.02"/>
            <stop offset="0.3" stop-color="#6c6c6c" stop-opacity="0.09"/>
            <stop offset="0.43" stop-color="#7d7d7d" stop-opacity="0.19"/>
            <stop offset="0.57" stop-color="#949494" stop-opacity="0.34"/>
            <stop offset="0.71" stop-color="#b1b1b1" stop-opacity="0.54"/>
            <stop offset="0.86" stop-color="#d5d5d5" stop-opacity="0.77"/>
            <stop offset="1" stop-color="#f9f9f9"/>
          </linearGradient>
        </defs>
        <title>shortlink</title>
        <path class="cls-1" d="M105.5,863.5v199h1794v-199C1473,946,866.6,804.24,612,790,326,774,105.5,863.5,105.5,863.5Z" transform="translate(-105.5 -788.08)"/>
      </svg>
    </footer>
    
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
      redirection_types: [
        { id: 0, name: 'Direct' },
        { id: 1, name: 'Frame' },
        { id: 2, name: 'Splash' }
      ],
      selected_redirection_type: 0,
      advanced: 0,
      alias: '',
      expiration: '',
      password: '',
      description: ''
    }
  },
  watch: {
    shorted_link(){
      //this.shorted_link = 'http://localhost:8080/' + this.shorted_link;
      this.showShort = true;
    }
  },
  methods: {
    tryAgain(){
      this.showShort = false;
      this.to_be_short = '';
      this.selected_redirection_type = 0;
      this.alias = '';
      this.expiration = '';
    },
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
        try{
          let response = await this.$http.post('/api/item', {
            originalUrl: this.to_be_short,
            masterkey: localStorage.ownerId,
            redirectionType: this.selected_redirection_type,
            alias: this.alias,
            expiration: this.expiration,
            password: this.password,
            description: this.description
          });
          this.loading = false;
          this.shorted_link = response.data.urlCode;
          this.$refs['mylinks'].links.unshift(response.data)
          if(!localStorage.ownerId){
            localStorage.ownerId = response.data.ownerId;
          }
        }catch(error){
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
        }
      }
    }
  }
}
</script>

<style scoped>
.cls-1 {
  fill: url(#linear-gradient);
}

</style>
