<template>
  <div>
      <v-carousel style="height:70vh!important;max-height:650px;min-height:450px">
          <v-carousel-item dark class="carouselBackground1">
              <v-container fill-height>
                  <v-layout justify-center row wrap align-center>
                      <v-flex style="max-width:500px" class="text-xs-center text-md-left" xs12 offset-md1 md5>
                          <div :class="{ 'display-2' : this.$vuetify.breakpoint.smAndUp, 'display-1 boldMe' : this.$vuetify.breakpoint.xsOnly }">Jämför priser på mobiljakt.nu!</div>
                          <div id="title-height" :class="{ 'title my-3' : this.$vuetify.breakpoint.smAndUp, 'smallText my-3' : this.$vuetify.breakpoint.xsOnly }">Priser på mobiler &amp; abonnemang från Sveriges alla mobiloperatörer.</div>
                          <v-divider></v-divider>
                          <v-layout row wrap justify-start>
                              <v-flex xs12 md5>
                                <v-btn to="/mobiler" block flat large round class="success mt-3 myBtnHover">Jämför mobiler <v-icon>arrow_right</v-icon></v-btn>
                              </v-flex>
                              <v-flex :ml-3="this.$vuetify.breakpoint.mdAndUp" xs12 md5>
                                <v-btn to="/mobilguiden" style="border:1px solid white" block flat large round class="my-outline mt-3 myBtnHover">Matcha mig! <v-icon>arrow_right</v-icon></v-btn>
                              </v-flex>
                          </v-layout>
                      </v-flex>
                      <v-flex class="text-xs-center hidden-sm-and-down" xs12 md6>
                          <img style="max-height:470px;max-width:470px" src="@/images/phones-pair.png" width="70%" alt="Mobiltelefon">
                      </v-flex>
                  </v-layout>
              </v-container>
          </v-carousel-item>
          <v-carousel-item dark class="carouselBackground1">
              <v-container fill-height>
                  <v-layout justify-center row wrap align-center>
                      <v-flex class="text-xs-center hidden-sm-and-down" xs12 md6 lg6>
                          <img style="max-height:470px;max-width:470px" src="@/images/abonnemang.png" width="60%" alt="Mobilabonnemang">
                      </v-flex>
                      <v-flex style="max-width:500px" class="text-xs-center text-md-left" xs12 md6 offset-lg1 lg5>
                          <div :class="{ 'display-2' : this.$vuetify.breakpoint.smAndUp, 'display-1 boldMe' : this.$vuetify.breakpoint.xsOnly }">Jämför mobilabonnemang</div>
                          <div id="title-height" :class="{ 'title my-3' : this.$vuetify.breakpoint.smAndUp, 'smallText my-3' : this.$vuetify.breakpoint.xsOnly }">Jämför Sveriges alla mobilabonnemang &amp; hitta den bästa dealen med mobiljakt.nu!</div>
                          <v-divider></v-divider>
                          <v-layout row wrap>
                              <v-flex md8>
                                <v-btn to="/abonnemang" block flat large round class="success mt-3 myBtnHover">Jämför Abonnemang <v-icon>arrow_right</v-icon></v-btn>
                             </v-flex>
                          </v-layout>
                      </v-flex>
                  </v-layout>
              </v-container>
          </v-carousel-item>
      </v-carousel>
      <section class="myTheme">
          <v-container>
              <v-layout style="margin-top:-12px;margin-bottom:-12px" class="hidden-md-and-down" justify-center text-xs-center row wrap>
                      <v-card class="cardNav mr-5 myTheme white--text" flat>
                          <v-card-text @click="toGuiden">
                              <div><v-icon style="color:inherit!important" large class="mb-2">perm_device_information</v-icon></div>
                              <div class="title ml-3" style="font-size:14pt!important">Guiden<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                          </v-card-text>
                      </v-card>
                      <v-card class="cardNav mr-5 myTheme white--text" flat>
                          <v-card-text @click="toPhones">
                              <div><v-icon style="color:inherit!important" large class="mb-2">smartphone</v-icon></div>
                              <div class="title ml-3" style="font-size:14pt!important">Mobiler<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                          </v-card-text>
                      </v-card>
                      <v-card class="cardNav mr-5 myTheme white--text" flat>
                          <v-card-text @click="toAbb">
                              <div><v-icon style="color:inherit!important" large class="mb-2">sim_card</v-icon></div>
                              <div class="title ml-4" style="font-size:14pt!important">Abonnemang<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                          </v-card-text>
                      </v-card>
                      <v-card class="cardNav myTheme white--text" flat>
                          <v-card-text @click="toOss">
                              <div><v-icon style="color:inherit!important" large class="mb-2">favorite</v-icon></div>
                              <div class="title ml-4" style="font-size:14pt!important">Om Mobiljakt<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                          </v-card-text>
                      </v-card>
              </v-layout>
              <v-layout class="hidden-lg-and-up" justify-center row wrap>
                  <v-flex class="cardNav" @click="toGuiden" text-xs-center xs6>
                      <div><v-icon style="color:inherit!important" large class="mb-2">perm_device_information</v-icon></div>
                      <div class="title ml-3" style="font-size:12pt!important">Guiden<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                  </v-flex>
                  <v-flex class="cardNav" @click="toPhones" text-xs-center xs6>
                      <div><v-icon style="color:inherit!important" large class="mb-2">smartphone</v-icon></div>
                      <div class="title ml-3" style="font-size:12pt!important">Mobiler<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                  </v-flex>
                  <v-flex class="cardNav" @click="toAbb" mt-4 text-xs-center xs6>
                      <div><v-icon style="color:inherit!important" large class="mb-2">sim_card</v-icon></div>
                      <div class="title ml-3" style="font-size:12pt!important">Abonnemang<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                  </v-flex>
                  <v-flex class="cardNav" @click="toOss" mt-4 text-xs-center xs6>
                      <div><v-icon style="color:inherit!important" large class="mb-2">favorite</v-icon></div>
                      <div class="title ml-3" style="font-size:12pt!important">Om Mobiljakt<v-icon style="color:inherit!important">arrow_right</v-icon></div>
                  </v-flex>
              </v-layout>
          </v-container>
      </section>

      <section class="featuredPhones">
          <v-container class="maxWidthContent" py-5>
              <div class="display-1 text-xs-center boldMe">Populära Telefoner</div>
              <v-layout row wrap mt-5 text-xs-center>
                  <v-flex text-xs-center v-if="topPhones === ''">
                      <div class="title">Laddar telefoner...</div>
                      <v-progress-circular class="mt-5" :size="100" :width="7" color="primary" indeterminate></v-progress-circular>
                  </v-flex>
                  <v-flex :key="phone.name" v-for="phone in topPhones" px-2 xs12 md4>
                      <v-card :class="popCard">
                          <div class="white--text">-</div>
                          <v-card-media 
                          :src="phone.img[0]"
                          contain
                          height="260px"
                          ></v-card-media>
                          <v-card-text>
                             <div class="title secondary--text">{{ phone.name }}</div>
                             <div class="subheading mt-2 secondary--text" style="font-weight:bold">Pris fr. <span class="success--text">{{ phone.pris }} kr i 24 mån</span></div>
                             <div class="body-2 py-1">Tillgänglig hos <span class="red--text">{{ phone.antalOperatorer}}</span> operatörer</div>
                          </v-card-text>
                          <v-card-actions style="margin-top:-20px" class="justify-center">
                              <v-btn to="/mobiler" block round class="success myBtnHover">Till Mobiler <v-icon>arrow_right</v-icon></v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-flex>
              </v-layout>
          </v-container>
      </section>
      <section class="myThemeLinear">
          <v-container class="maxWidthContent">
              <v-layout my-5 dark justify-center row wrap>
                  <v-flex xs12 text-xs-center>
                      <div class="display-1 white--text pb-5 boldMe">Abonnemang</div>
                  </v-flex>
                  <v-flex text-xs-center xs12 md4 mb-3>
                      <v-card style="border-radius:15px" class="mx-2 py-2 px-2">
                          <v-card-title class="justify-center">
                              <div class="headline" style="font-weight:bold">Bäst Täckning</div>
                          </v-card-title>
                          <v-card-media 
                          src="https://mobiljakt.nu/images/telia.png"
                          contain
                          height="50px"
                          ></v-card-media>
                          <v-card-text>
                              <div class="title px-2 pt-2 pb-3">
                                  <span class="left">Surf: </span> <span class="right purple--text">1 - 100 GB</span>
                              </div>
                              <div class="title px-2 py-4">
                                  <span class="left">Pris: </span> <span class="right purple--text">199 - 739 kr/mån.</span>
                              </div>
                          </v-card-text>
                          <v-card-actions class="justify-center">
                              <v-btn to="/abonnemang" block round class="success myBtnHover">Till Abonnemang <v-icon>arrow_right</v-icon></v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-flex>
                  <v-flex text-xs-center xs12 md4 mb-3>
                      <v-card style="border-radius:15px" class="mx-2 py-2 px-2">
                          <v-card-title class="justify-center">
                              <div class="headline" style="font-weight:bold">Nöjdast kunder</div>
                          </v-card-title>
                          <v-card-media 
                          src="https://mobiljakt.nu/images/halebop.png"
                          contain
                          height="50px"
                          ></v-card-media>
                          <v-card-text>
                              <div class="title px-2 pt-2 pb-3">
                                  <span class="left">Surf: </span> <span class="right orange--text">1 - 30 GB</span>
                              </div>
                              <div class="title px-2 py-4">
                                  <span class="left">Pris: </span> <span class="right orange--text">99 - 369 kr/mån.</span>
                              </div>
                          </v-card-text>
                          <v-card-actions class="justify-center">
                              <v-btn to="/abonnemang" block round class="success myBtnHover">Till Abonnemang <v-icon>arrow_right</v-icon></v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-flex>
                  <v-flex text-xs-center xs12 md4 mb-3>
                      <v-card style="border-radius:15px" class="mx-2 py-2 px-2">
                          <v-card-title class="justify-center">
                              <div class="headline" style="font-weight:bold">Billigast</div>
                          </v-card-title>
                          <v-card-media
                          src="https://mobiljakt.nu/images/hallon.png"
                          contain
                          height="50px"
                          ></v-card-media>
                          <v-card-text>
                              <div class="title px-2 pt-2 pb-3">
                                  <span class="left">Surf: </span> <span class="right red--text text--darken-3">4 - 100 GB</span>
                              </div>
                              <div class="title px-2 py-4">
                                  <span class="left">Pris: </span> <span class="right red--text text--darken-3">99 - 349 kr/mån.</span>
                              </div>
                          </v-card-text>
                          <v-card-actions class="justify-center">
                              <v-btn to="/abonnemang" block round class="success myBtnHover">Till Abonnemang <v-icon>arrow_right</v-icon></v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-flex>
              </v-layout>
          </v-container>
      </section>
      <section class="white">
          <v-container class="py-5 maxWidthContent">
              <v-layout row wrap>
                  <v-flex px-4 xs12 md8>
                      <div class="display-1 pb-3 boldMe">Total klarhet över ditt nästa mobilköp</div>
                      <p class="body1">
                          Mobiljakt.nu är en ny och ledande jämförelsetjänst för mobiltelefoner och abonnemang från svenska mobiloperatörer. Tjänsten grundades 2018. Syftet är att underlätta för dig som konsument att kunna jämföra alla Sveriges alla mobiloperatörers priser på ett snabbt och smidigt sätt utan att behöva besöka varje operatörs hemsida eller butik varje gång du ska beställa en ny telefon eller abonnemang.
                      </p>
                      <p class="body1">
                          Vi vill ge svenska konsumenter en total klarhet över vilka valmöjligheter som finns, samt ge en korrekt och tydlig produkt- &amp; nät information. 
                      </p>
                      <p class="body-1">
                          Vi samarbetar med samtliga operatörer i landet och ger konsumenterna ett större inflytande och fler valmöjligheter på mobilmarknaden, samtidigt som vi hjälper operatörerna att öka sin “onlinenärvaro” som är ett snabbt växande segment för alla operatör, och ett mycket viktigt område att “hänga med i” för att fortsätta vara en konkurrenskraftig mobiloperatör.
                      </p>
                  </v-flex>
                  <v-flex class="hidden-sm-and-down" md4>
                      <img class="mt-4 ml-3" src="@/images/mobiler.jpg" width="400px" alt="Jämför mobiloperatörer">
                  </v-flex>
              </v-layout>
          </v-container>
      </section>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      topPhones: ''
    }
  },
  methods: {
    toGuiden () {
      this.$router.push('/mobilguiden')
    },
    toPhones () {
      this.$router.push('/mobiler')
    },
    toAbb () {
      this.$router.push('/abonnemang')
    },
    toOss () {
      this.$router.push('/om')
    }
  },
  computed: {
    popCard () {
      if (this.$vuetify.breakpoint.smAndUp) {
        return 'cardStyle my-2 mx-4'
      } else {
        return 'cardStyle my-2'
      }
    }
  },
  created () {
    var topPhones = []
    var global = this
    var count = 0
    Axios.get('https://mobiljakt.firebaseio.com//.json')
      .then(function (response) {
        // Hämta Top 3 Populära Lurar
        for (var i in response.data.phones) {
          if (response.data.phones[i].pop === 10 && topPhones.length < 3) {
            topPhones.push(response.data.phones[i])
          }
        }
        // Hämta Lägsta Priser
        topPhones.forEach(val => {
          val.pris = 1000
          val.antalOperatorer = 0
          for (var ii in response.data.operatorer) {
            count = 0
            if (response.data.operatorer[ii].hasOwnProperty('phones')) {
              for (var phs in response.data.operatorer[ii].phones) {
                if (val.name === response.data.operatorer[ii].phones[phs].name) {
                  val.antalOperatorer++
                }
              }
            }
            for (var abb in response.data.operatorer[ii].abb) {
              if (response.data.operatorer[ii].abb[abb].hasOwnProperty('phones')) {
                for (var ph in response.data.operatorer[ii].abb[abb].phones) {
                  if (val.name === response.data.operatorer[ii].abb[abb].phones[ph].name) {
                    if (count === 0) {
                      val.antalOperatorer++
                      count++
                    }
                    if (val.pris > (response.data.operatorer[ii].abb[abb].pris + response.data.operatorer[ii].abb[abb].phones[ph].lurPris)) {
                      val.pris = (response.data.operatorer[ii].abb[abb].pris + response.data.operatorer[ii].abb[abb].phones[ph].lurPris)
                    }
                  }
                }
              }
            }
          }
        })
        global.topPhones = topPhones
      })
    .catch(function (error) {
      console.log(error.message)
    })
  }
}
</script>


<style scoped>
.cardStyle {
    border-radius: 15px;
    border: 1px solid lightgrey;
    box-shadow: 2px 4px 15px grey;
}
.orangeHover:hover {
    color: orange;
}
.cardNav {
    width: 200px;
    border-radius: 20px;
    cursor: pointer;
    color: #fff;
}
.cardNav:hover {
    width: 200px;
    border-radius: 30px;
    cursor: pointer;
    color: orange !important;
}
.carouselBackground1 {
    background: linear-gradient(0deg,#c59dde, #692294,#320b4c,#2d0944);
}
.carouselBackground1Hard {
    background: linear-gradient(to top, #c59dde, #2d0944, #2d0944);
}
.carouselBackground1Extra {
    background: linear-gradient(225deg,#00ffd4 -20%,#498ce7 35%,#4e84e8 50%,#5c6feb 60%,#852ef6);
}
.carouselBackground3 {
    background: linear-gradient(180deg,#009688,#009688,#009688, teal);
}
.carouselBackground2 {
    background: linear-gradient(150deg,#00ffd4 -20%,#498ce7 35%,#4e84e8 50%,#5c6feb 60%,#852ef6);
}
#title-height {
  line-height:1.7em!important;
}
.smallText {
  font-size: 15pt;
  line-height: 25px !important;
}
.boldMe {
  font-weight: 500;
}
.featuredPhones {
  background: linear-gradient(0deg,#dedede,#efefef, #ffffff)!important;
  border-bottom: 10px solid white;
}
.myThemeLinear {
  background: linear-gradient(0deg,#5e2a7f,#9c66c1)!important;
}
</style>

