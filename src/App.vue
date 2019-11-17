<template>
  <v-app>
    <v-navigation-drawer
    app
    temporary
    v-model="navDrawer"
    >
    <v-toolbar dark class="myTheme" flat>
    <v-toolbar-title @click="toHome">
        <div class="mylogoArea">
        <v-icon class="logoIcon">chat</v-icon>
        <div class="headLogo">Mobiljakt.nu</div>
        <div class="logoSlogan">Hitta mobil till bästa pris</div>
        </div>
    </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile :key="page.name" v-for="page in pages">
        <v-list-tile-content>
          <v-list-tile-title @click="navigate(page.to)">{{ page.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar id="topId" dark class="myTheme" flat>
      <v-toolbar-title style="cursor:pointer" @click="toHome">
        <img v-if="false" style="margin-top:10px" src="@/images/logo2.png" width="200px" alt="Logga">
        <div class="mylogoArea">
        <v-icon class="logoIcon">chat</v-icon>
        <div class="headLogo">Mobiljakt.nu</div>
        <div class="logoSlogan">Hitta mobil till bästa pris</div>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="navDrawer = !navDrawer"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn :key="page.name" :to="page.to" v-for="page in pages" flat>
          <v-icon small>{{ page.icon }}</v-icon>
          {{ page.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div class="myToolbarBottom"></div>
    <transition name="component-fade" mode="out-in">
    <router-view></router-view>
    </transition>

<section style="border-top:6px solid green !important" class="white">
          <v-container class="maxWidthContent">
              <v-layout row wrap my-2 justify-center>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:5px" src="@/images/tele2.png" width="60px" alt="Tele2 logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:-1px" src="@/images/Telenor-logga.png" width="80px" alt="Telenor logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:4px" src="@/images/telia.png" width="70px" alt="Telia logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:8px" src="@/images/comviq.png" width="70px" alt="Comviq logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:6px" src="@/images/halebop.png" width="75px" alt="Halebop logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:6px" src="@/images/hallon.png" width="80px" alt="Hallon logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:1px;margin-left:15px" src="@/images/tre-logga.png" width="25px" alt="Tre logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:1px" src="@/images/fello.png" width="55px" alt="Fello logga">
              </v-flex>
              <v-flex mr-1 xs3 md1>
                  <img style="margin-top:-3px" src="https://mobiljakt.nu/images/mybeat.jpg" width="35px" alt="My Beat logga">
              </v-flex>
              <v-flex style="margin-top:6px" xs3 md1>
                  <img src="@/images/vimla.png" width="70px" alt="Vimla logga">
              </v-flex>
              </v-layout>
          </v-container>
      </section>
    <section class="footerBackground" style="margin-bottom:4px;border-top:6px solid darkgreen!important">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="py-3">
            <v-flex xs12>
              <div class="display-1 text-xs-center white--text">Direktlänkar</div>
            </v-flex>
            <v-flex xs4 md2>
              <v-btn to="/" class="white white--text" block outline round>Hem</v-btn>
            </v-flex>
            <v-flex xs4 md2>
              <v-btn to="/mobilguiden" class="white white--text" outline block round>Guiden</v-btn>
            </v-flex>
            <v-flex xs4 md2>
              <v-btn to="/mobiler" class="white white--text" outline block round>Mobiler</v-btn>
            </v-flex>
            <v-flex xs5 md2>
              <v-btn to="abonnemang" class="white white--text" outline block round>Abonnemang</v-btn>
            </v-flex>
            <v-flex xs5 md2>
              <v-btn to="om" class="white white--text" outline block round>Om Mobiljakt</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    <v-footer class="black white--text justify-center">
      <span>&copy; {{ new Date().getFullYear() }} Mobiljakt.nu - All rights reserved.</span>
    </v-footer>
    <v-btn v-if="false" href="#topId" class="red" right bottom fixed fab>
          <v-icon class="white--text">keyboard_arrow_up</v-icon>
        </v-btn>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      navDrawer: false,
      pages: [
        { name: 'Hem', to: '/', icon: 'home' },
        { name: 'Guiden', to: '/mobilguiden', icon: 'question_answer' },
        { name: 'Mobiler', to: '/mobiler', icon: 'smartphone' },
        { name: 'Abonnemang', to: '/abonnemang', icon: 'sim_card' },
        { name: 'Om oss', to: '/om', icon: '' }
      ]
    }
  },
  methods: {
    navigate (page) {
      this.$router.push(page)
    },
    toHome () {
      this.$router.push('/')
    }
  },
  name: 'App'
}
</script>

<style>
.myTheme {
  background: #2c0844 !important;
}
.footerBackground {
  background: linear-gradient(to bottom, #676767, #424242, #292929)!important;
}
li > label {
  font-weight: bold !important;
}
@media only screen and (min-width:1904px){.maxWidthContent{max-width:1185px!important}}
.my-outline {
  background: transparent !important;
}
.headLogo {
  font-size: 19pt !important;
  margin-left: 45px;
  margin-bottom: -7px;
  color: aqua !important;
  font-weight: bold;
}
.logoSlogan {
  font-size: 9.2pt !important;
  margin-left: 45px;
  color: white;
}
.logoIcon {
  position: absolute;
  margin-top: 5px;
  font-size: 30pt !important;
  color: aqua !important;
}
.myToolbarBottom {
  height: 0px;
  background: #b70d00;
}
.myBtnHover:hover {
    background: orange!important;
    color: white !important;
}
.btn--active .btn__content:before, .btn:focus .btn__content:before, .btn:hover .btn__content:before {
    background: transparent!important;
}
.btn--active {
  color: orange !important;
  font-weight: bold !important;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

