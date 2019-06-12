<template>
    <div>
        <div class="container">
            <div class="columns section1">
                <div class="column is-6 has-text-left">
                    <div class="title" style="margin-top:100px;">Simplify your links, track & manage them</div>
                    <b-button @click="$router.push('/register')" class="is-primary">Join Now for Free</b-button>
                </div>
                <div class="column is-6">
                    <img src="about1.svg" alt="short your links">
                </div>
            </div>
            
            <div class="columns section2">
                <div class="column is-6">
                    <img src="about2.svg" alt="short your links">
                </div>
                <div class="column is-6">
                    <div class="title">LINK MANAGEMENT PLATFORM</div>
                    <div class="subtitle">URL Shortener</div>
                    <p>
                        User friendly URL Shortener & Link Management Platform with Branded URLs and many features and detailed real-time analytics. Our short links know how, when and where someone clicked or touched your shortened links and even more.
                    </p>
                </div>
            </div>

            <div class="columns section3">
                <div class="column is-6">
                    <div class="title">Get more clicks with custom links</div>
                    <p>
                        We help businesses shine by transforming their links into powerful tools for marketers and customer support teams
                    </p>
                </div>
                <div class="column is-6">
                    <img src="about3.svg" alt="short your links">
                </div>
            </div>
        </div>
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
export default {
    data(){
        return {

        }
    }
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
.section1 {
    margin-top:50px;
}
.section2 {
    margin-top:100px;
}
.section3 {
    margin-top:80px;
}
.cls-1 {
  fill: url(#linear-gradient);
}
</style>
