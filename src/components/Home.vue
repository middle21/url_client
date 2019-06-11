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

    <ShortLink v-if="showShort" @tryAgain="tryAgain" style="margin-top:-50px;" :link="'http://localhost:8080/'+shorted_link"></ShortLink>
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
      this.to_be_short = '';
      this.shorted_link = '';
      this.selected_redirection_type = 0;
      this.advanced = 0;
      this.alias = '';
      this.password = '';
      this.description = '';
      this.showShort = false;
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
</style>
