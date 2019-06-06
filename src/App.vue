<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="https://fakeimg.pl/640x160/" width="112" height="28">
        </a>

        <a role="button" @click="active = !active" :class="{'is-active': active}" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': active}">
        <div class="navbar-start">
          <a @click="$router.push('/')" class="navbar-item">
            Home
          </a>

          <a class="navbar-item">
            Documentation
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a @click="$router.push('/login')" class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>


  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      active: false,
    }
  }
}
</script>

<style>

</style>
