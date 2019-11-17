<template>
<div>
  <v-btn v-if="0" @click="test">TEST</v-btn>
    <div v-if="listIsNotReady || !listIsReadyStat">
        <v-container>
            <v-layout py-5 align-center justify-center wrap>
                <v-flex xs12>
                <div class="text-xs-center display-1">Vänta medans vi hämtar dina resultat ...</div>
                </v-flex>
                <v-flex my-3 xs12 text-xs-center>
                <v-progress-circular :size="120" :width="7" indeterminate color="purple"></v-progress-circular>
                </v-flex>
                <v-flex xs12 text-xs-center>
                    <img src="@/images/trick.png" style="max-width:220px" width="70%" alt="Mobilresultat">
                </v-flex>
            </v-layout>
        </v-container>
    </div>
  <div v-if="listIsReadyStat">
      <!-- Resultat med bara Abb -->
      <div v-if="q1Stats && abbs !== ''">
          <v-dialog v-model="rabattInfo" max-width="400">
         <v-card>
        <v-card-title class="justify-center">
            <v-icon @click="rabattInfoClose" style="position:absolute;left:8px;top:8px">close</v-icon>
            <div class="title"><v-icon>info</v-icon> Rabatt Info</div>
          </v-card-title>
          <v-card-text>
            <div class="body-2">Här visas standard-priser. Eventuella rabatter dras vanligtvis vid kassan hos samtliga operatörer.</div>
            <div class="caption py-2">OBS! Ibland kan du välja hos operatören om du är student/ungdom eller senior.</div>
            <v-icon large>add_shopping_cart</v-icon>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="rabattInfoClose" round class="info">Tack, Då vet jag!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
          <div class="mb-4 pt-2 pl-3 body-1 primary--text">Mobiljakt.nu <v-icon>arrow_right</v-icon><span class="primary--text">Mobilguiden <v-icon>arrow_right</v-icon></span><span class="grey--text">Resultat</span></div>
          <!-- För Small Screens ABB Below -->
          <v-container class="hidden-md-and-up">
            <div class="display-1 text-xs-center pb-4 secondary--text" style="font-weight:bold;margin-top:-30px">Abonnemang</div>
            <div class="title secondary--text mb-3">Antal träffar: <span class="success--text">{{ abbs.length }}</span></div>
            <v-layout class="white" :key="abb.id" v-for="(abb, index) in abbs" py-2 mb-4 style="box-shadow:2px 2px 8px grey;border-radius:5px" row wrap>
              <div class="body-2 black--text" style="position:absolute;margin-left:10px;margin-top:5px;z-index:10">{{ procentMatch[index] }}%</div>
              <v-progress-circular style="position:absolute;margin-left:5px" :value="procentMatch[index]" color="success"></v-progress-circular>
              <v-flex style="border-bottom:1px solid lightgrey;margin-top:-10px" mx-3 py-2 xs12 text-xs-center>
                <img v-if="abb.corp !== 'Fello' && abb.corp !== 'Tre'" :src="abb.img" style="max-height:75px!important;max-width:140px!important" alt="Logga">
                <img v-if="abb.corp === 'Fello'" :src="abb.imgExtra" width="100px" alt="Logga">
                <img v-if="abb.corp === 'Tre'" :src="abb.img" width="65px" alt="Logga">
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" mx-3 py-2 xs12>
                <div>
                  <span class="title left secondary--text">{{ abb.pris }} kr</span>
                  <span class="title right grey--text">Pris/mån.</span>
                </div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" mx-3 py-2 xs12>
                <div>
                  <span class="title left secondary--text">{{ abb.gb }} GB</span>
                  <span class="title right grey--text">Surf/mån.</span>
                </div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" mx-3 py-2 xs12>
                <div>
                  <span class="title left secondary--text">{{ abb.bindTid }} mån.</span>
                  <span class="title right grey--text">Bind. tid</span>
                </div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" mx-3 py-2 xs12>
                <div>
                  <span class="body-2 left secondary--text">{{ abb.fordel1 }}</span>
                  <v-icon small class="right success--text">check_circle</v-icon>
                </div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" mx-3 py-2 xs12>
                <div>
                  <span class="body-2 left secondary--text">{{ abb.beskrivning }}</span>
                </div>
              </v-flex>
              <v-flex text-xs-center xs12>
                <v-btn :href="abb.link" target="_blank" style="width:90%" medium round class="teal white--text">Till Butik <v-icon>arrow_right</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- För Big Screens ABB Below -->
          <v-container class="hidden-sm-and-down" style="max-width:1100px">
              <div class="display-2 text-xs-center pb-3 success--text" style="font-weight:bold">Abonnemang</div>
              <div class="title">Antal träffar: <span class="success--text">{{ abbs.length }}</span></div>
              <v-layout :key="abb.id" v-for="(abb, index) in abbs" mt-2 mb-4 py-4 class="bigAbbStyle" justify-center text-xs-center row wrap>
                  <v-flex xs2>
                    <div style="position:absolute;margin-top:-23px;margin-left:10px;z-index:10" class="body-2 white--text">Match: {{ procentMatch[index] }}%</div>
                    <v-progress-linear style="position:absolute;width:160px;margin-top:-20px;margin-left:5px;border-radius:5px" :value="procentMatch[index]" height="14" color="primary"></v-progress-linear>
                    <div>
                        <img v-if="abb.corp !== 'Fello' && abb.corp !== 'Tre' && abb.corp !== 'Hallon'" class="ml-5" :src="abb.img" style="max-height:72px!important;max-width:140px!important" alt="Logga">
                        <img v-if="abb.corp === 'Fello'" class="ml-5" :src="abb.imgExtra" width="110px" alt="Logga">
                        <img v-if="abb.corp === 'Tre'" class="ml-5" :src="abb.img" width="70" alt="Logga">
                        <img v-if="abb.corp === 'Hallon'" class="ml-5" :src="abb.img" width="165" alt="Logga">
                    </div>
                  </v-flex>
                  <v-flex xs3>
                      <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.pris }} kr</div>
                      <div class="body-2 secondary--text">Pris/mån.</div>
                  </v-flex>
                  <v-flex xs3>
                      <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.gb }} <span v-if="!isNaN(abb.gb)">GB</span></div>
                      <div class="body-2 secondary--text">Surf/mån.</div>
                  </v-flex>
                  <v-flex xs2>
                      <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.bindTid }} mån.</div>
                      <div class="body-2 secondary--text">Bind. tid</div>
                  </v-flex>
                  <v-flex xs2>
                      <v-btn :href="abb.link" target="_blank" large round class="teal white--text myBtnHover">Till Butik <v-icon>arrow_right</v-icon></v-btn>
                  </v-flex>
                  <v-flex style="border-top:1px solid lightgrey" mt-3 pt-3 xs5>
                      <div class="body-2">{{ abb.fordel1 }} <v-icon small class="success--text">check_circle</v-icon></div>
                  </v-flex>
                  <v-flex style="border-top:1px solid lightgrey" mt-3 pt-3 xs5>
                      <div class="body-2">{{ abb.beskrivning }} <v-icon small class="success--text">check_circle</v-icon></div>
                  </v-flex>
              </v-layout>
          </v-container>
      </div>
      <!-- Resultat Med Mobil + Abb. -->
      <div v-if="!q1Stats && phones !== ''">
          <v-dialog v-model="rabattInfo" max-width="400">
         <v-card>
        <v-card-title class="justify-center">
            <v-icon @click="rabattInfoClose" style="position:absolute;left:8px;top:8px">close</v-icon>
            <div class="title"><v-icon>info</v-icon> Rabatt Info</div>
          </v-card-title>
          <v-card-text>
            <div class="body-2">Eventuella rabatter dras vanligtvis vid kassan hos samtliga operatörer.</div>
            <div class="caption py-2">OBS! Ibland har en operatör en dedikerad sida med student/senior rabatter. Då hittar du sidan via menyn hos den valda operatören.</div>
            <v-icon large>add_shopping_cart</v-icon>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="rabattInfoClose" round class="info">Tack, Då vet jag!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- För Small Screens || Below -->
      <v-container v-if="this.$vuetify.breakpoint.smAndDown">
        <div style="margin-top:-25px;margin-left:-20px" class="mb-4 pt-2 pl-3 body-1 primary--text">Mobiljakt.nu <v-icon>arrow_right</v-icon><span class="primary--text">Mobilguiden <v-icon>arrow_right</v-icon></span><span class="grey--text">Resultat</span></div>
        <v-flex xs12>
            <div class="display-1 secondary--text text-xs-center pb-4" style="font-weight:bold;margin-top:-15px">Resultat...</div>
          </v-flex>
        <v-layout v-if="index < phones.length && index < 5" :key="phone.id" v-for="(phone, index) in phones" py-2 mb-4 style="box-shadow:2px 2px 10px grey;border-radius:10px" justify-center row wrap>
          <v-flex text-xs-center xs3>
            <img :src="phone.img[0]" height="120px" alt="">
          </v-flex>
          <v-flex text-xs-left xs9>
            <div style="position:absolute;margin-top:-3px;margin-left:10px;z-index:10" class="body-2 white--text">Matchning: {{ procentMatch[index] }}%</div>
            <v-progress-linear style="width:160px;margin-top:-0px;margin-left:5px;border-radius:5px" :value="procentMatch[index]" height="15" color="success"></v-progress-linear>
            <div class="title pl-2">{{ phone.name }}</div>
            <div class="py-2 mb-3">
            <v-select
              @change="thePricesModel(index)"
              class="mx-2 input-group--focused"
              style="width:150px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phone.surf"
              ></v-select>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-select
              class="mx-2 input-group--focused"
              style="width:90%;margin-top:-20px"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed(index)"
              multi-line
              v-model="phone.thePricesModel"
              ></v-select>
          </v-flex>
          <v-flex text-xs-center xs12>
            <img v-if="phone.thePricesModel.split(' ')[0] !== 'Tre'" :src="getImage(index)" width="120px" alt="Mobiloperatör">
            <img v-if="phone.thePricesModel.split(' ')[0] === 'Tre'" :src="getImage(index)" width="50px" alt="Mobiloperatör">
            <div class="pb-1"><span class="display-1 success--text" style="font-weight:bold">{{ phone.thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/24 mån.</span></div>
            <div class="pb-1"><span class="title success--text" style="font-weight:bold"><span class="body-2 secondary--text"></span> {{ phone.thePricesModel.split(' ')[1].replace('(', '') }} GB surf</span><span>/mån.</span></div>
            <div class="body-1 pb-1 px-1"><v-icon small class="pr-1">info</v-icon>{{ abbBesk(index) }}</div>
            <a :href="phoneLink(index)" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn medium round style="width:90%" class="teal white--text myBtnHover">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- För Big Screens || Below -->
      <v-carousel v-if="this.$vuetify.breakpoint.mdAndUp" class="fill-height" light :cycle="false">
       <v-carousel-item v-if="index < phones.length && index < 5" :key="phone.id" v-for="(phone, index) in phones">
           <v-layout ml-3 pt-3 row>
           <v-flex xs9>
        <div class="body-1 primary--text">Mobiljakt.nu <v-icon>arrow_right</v-icon><span class="primary--text">Mobilguiden <v-icon>arrow_right</v-icon></span><span class="grey--text">Matchning {{ index + 1 }}</span></div>
           </v-flex>
           <v-flex px-4 xs3>
               <div style="position:absolute;margin-top:8px;margin-left:15px;z-index:10" class="title white--text">Matchning: {{ procentMatch[index] }}%</div>
            <v-progress-linear style="border-radius:5px;margin-top:6px" :value="procentMatch[index]" height="25" color="success"></v-progress-linear>
           </v-flex>
           </v-layout>          
           <v-container class="maxWidthContent">
            <v-layout class="white" style="box-shadow:2px 2px 8px grey;border-radius:5px;margin-bottom:-10px" py-4 align-center justify-center row>
                <!-- Första Field -->
                <v-flex text-xs-center md4 px-4>
                    <div style="margin-top:-80px" class="display-2 pb-5 secondary--text">{{ phone.name }}</div>
                    <v-carousel light style="box-shadow:0 0 0;height:380px;border-radius:15px">
                        <v-carousel-item :key="x" v-for="x in phone.img" class="pt-4">
                            <img :src="x" height="290px" alt="">
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
                <!-- Andra Field -->
                <v-flex pl-4 md4>
            <div style="border:4px outset" class="px-2 py-2 mb-3">
            <div class="headline pl-1 primary--text">Välj abonnemang:</div>
            <v-select
              @change="thePricesModel(index)"
              class="mx-2 input-group--focused"
              style="width:200px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phone.surf"
              ></v-select>
              <v-select
              class="mx-2 input-group--focused"
              style="width:90%"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed(index)"
              multi-line
              v-model="phone.thePricesModel"
              ></v-select>
            </div>
              <v-layout my-2 justify-center row wrap>
                <v-flex class="my-2" xs12>Tekniska Specifikationer:</v-flex> 
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-1">Skärm (Tum):</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-1">{{ phone.screen }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Batteri:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phone.batteri }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Vikt:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phone.vikt }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Minne:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phone.lagring }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Kamera:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phone.kamera }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Skärmupplösning:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phone.skarmupplosning }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Operativsystem:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phone.operativsystem }}</div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phone.fordel1 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phone.fordel2 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                </v-layout>
                </v-flex>
                <!-- Tredje Field -->
                <v-flex px-4 text-xs-center md4>
                    <div class="headline mb-4 secondary--text" style="font-weight:bold">Sammanfattning</div>
                    <img class="mb-1" :src="getImage(index)" style="max-width:250px!important;max-height:95px!important" alt="Mobiloperatör">
                    <div class="mb-1"><span class="display-3 success--text" style="font-weight:bold">{{ phone.thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/mån.</span></div>
                    <div class="body-2 mb-1">Bind. tid: <span class="body-1">24 månader</span></div>
                    <div class="mb-1"><span class="headline success--text" style="font-weight:bold">{{ phone.thePricesModel.split(' ')[1].replace('(', '') }} GB surf</span><span class="body-1">/mån.</span></div>
                    <div class="body-1 pb-1"><v-icon small>info</v-icon> {{ abbBesk(index) }}</div>
                    <a :href="phoneLink(index)" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn large round block class="teal white--text">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
                </v-flex>
            </v-layout>
          </v-container>
         </v-carousel-item>
       </v-carousel>
       </div>
  </div>
</div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      qStatus: 1,
      valjSurf: ['1 GB+', '5 GB+', '10 GB+', '20 GB+', '30 GB+', '40 GB+', '50 GB+', '60 GB+', '80 GB+', '100 GB+'],
      phones: '',
      lurPriser: '',
      abbs: '',
      abbsOrignal: '',
      procentMatch: [],
      priceModelCount: 0,
      getImageCount: 0,
      abbBeskCount: 0,
      phoneLinkCount: 0,
      thePricesFixedCount: 0,
      listIsReadyStat: 0
    }
  },
  methods: {
    test () {
      console.log('test')
    },
    rabattInfoClose () {
      this.$store.state.guideRabatt = false
    },
    thePricesModel (index) {
      var global = this
      setTimeout(function () { global.modelNext(index) }, 100)
    },
    modelNext (index) {
      var arr = []
      this.phones[index].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[index].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      this.phones[index].thePricesModel = arr[0]
    },
    getImage (index) {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[index].thePricesModel.split(' ')[0]) {
          x = val.operatorImg
        }
      })
      return x
    },
    abbBesk (index) {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[index].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[index].thePricesModel.split(' ')[1].replace('(', ''))) {
          x = val.beskrivning
        }
      })
      return x
    },
    phoneLink (index) {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[index].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[index].thePricesModel.split(' ')[1].replace('(', '')) && val.name === this.phones[index].name) {
          x = val.link
        }
      })
      return x
    },
    thePricesFixed (index) {
      var arr = []
      this.phones[index].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[index].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      return arr
    },
    readyStat () {
      var global = this
      setTimeout(function () { global.listIsReadyStat = 1 }, 1000)
    }
  },
  computed: {
    listIsNotReady () {
      return this.phones === '' && this.abbs === '' ? true : this.readyStat()
    },
    q1Stats () {
      return this.$store.state.q1Stats
    },
    rabattInfo () {
      return this.$store.state.guideRabatt
    }
  },
  mounted () {
    this.$store.commit('showResultStat', true)
  },
  created () {
    var phonesArr = []
    var global = this
    var lurPriser = []
    var thePrices = []
    var abbs = []
    var filteredAbbs = []
    var idCount = 0
    Axios.get('https://mobiljakt.firebaseio.com//.json')
    .then(function (response) {
      // Priserna För Telefoner
      for (var o in response.data.operatorer) {
        // Lägg över lurarna till varje abb om de alla har samma priser
        if (response.data.operatorer[o].hasOwnProperty('phones')) {
          for (var oo in response.data.operatorer[o].abb) {
            response.data.operatorer[o].abb[oo].phones = JSON.parse(JSON.stringify(response.data.operatorer[o].phones))
          }
        }
        for (var a in response.data.operatorer[o].abb) {
          // Samla ihop alla abben bara Först
          response.data.operatorer[o].abb[a].corp = response.data.operatorer[o].corp
          response.data.operatorer[o].abb[a].img = response.data.operatorer[o].img
          response.data.operatorer[o].abb[a].name = response.data.operatorer[o].name
          if (response.data.operatorer[o].hasOwnProperty('imgExtra')) {
            response.data.operatorer[o].abb[a].imgExtra = response.data.operatorer[o].imgExtra
          }
          abbs.push(response.data.operatorer[o].abb[a])
          // Om BindTid finns ...
          if (response.data.operatorer[o].abb[a].hasOwnProperty('bind12') && response.data.operatorer[o].abb[a].bind12.pris > 0) {
            response.data.operatorer[o].abb[a].bind12.corp = response.data.operatorer[o].corp
            response.data.operatorer[o].abb[a].bind12.img = response.data.operatorer[o].img
            response.data.operatorer[o].abb[a].bind12.name = response.data.operatorer[o].name
            response.data.operatorer[o].abb[a].bind12.beskrivning = response.data.operatorer[o].abb[a].beskrivning
            response.data.operatorer[o].abb[a].bind12.fordel1 = response.data.operatorer[o].abb[a].fordel1
            response.data.operatorer[o].abb[a].bind12.gb = response.data.operatorer[o].abb[a].gb
            abbs.push(response.data.operatorer[o].abb[a].bind12)
          }
          if (response.data.operatorer[o].abb[a].hasOwnProperty('phones')) {
            for (var p in response.data.operatorer[o].abb[a].phones) {
              // Börja med MinneLarge
              if (response.data.operatorer[o].abb[a].phones[p].hasOwnProperty('minneLarge') && response.data.operatorer[o].abb[a].phones[p].minneLarge.lurPris > 0) {
                // Priset först (Checka om bind12 finns annars ta vanliga)
                if (response.data.operatorer[o].abb[a].hasOwnProperty('bind12') && response.data.operatorer[o].abb[a].bind12.pris > 0) {
                  response.data.operatorer[o].abb[a].phones[p].minneLarge.pris = (response.data.operatorer[o].abb[a].phones[p].minneLarge.lurPris + response.data.operatorer[o].abb[a].bind12.pris)
                } else {
                  response.data.operatorer[o].abb[a].phones[p].minneLarge.pris = (response.data.operatorer[o].abb[a].phones[p].minneLarge.lurPris + response.data.operatorer[o].abb[a].pris)
                }
                response.data.operatorer[o].abb[a].phones[p].minneLarge.name = response.data.operatorer[o].abb[a].phones[p].name
                response.data.operatorer[o].abb[a].phones[p].minneLarge.link = response.data.operatorer[o].abb[a].phones[p].link
                response.data.operatorer[o].abb[a].phones[p].minneLarge.bindTid = response.data.operatorer[o].abb[a].phones[p].bindTid
                response.data.operatorer[o].abb[a].phones[p].minneLarge.corp = response.data.operatorer[o].corp
                response.data.operatorer[o].abb[a].phones[p].minneLarge.gb = response.data.operatorer[o].abb[a].gb
                response.data.operatorer[o].abb[a].phones[p].minneLarge.operatorImg = response.data.operatorer[o].img
                response.data.operatorer[o].abb[a].phones[p].minneLarge.beskrivning = response.data.operatorer[o].abb[a].beskrivning
                response.data.operatorer[o].abb[a].phones[p].minneLarge.fordel1 = response.data.operatorer[o].abb[a].fordel1
                lurPriser.push(response.data.operatorer[o].abb[a].phones[p].minneLarge)
              }
              // Standard 'Minne' Lurar
              if (response.data.operatorer[o].abb[a].hasOwnProperty('bind12') && response.data.operatorer[o].abb[a].bind12.pris > 0) {
                response.data.operatorer[o].abb[a].phones[p].pris = (response.data.operatorer[o].abb[a].phones[p].lurPris + response.data.operatorer[o].abb[a].bind12.pris)
              } else {
                response.data.operatorer[o].abb[a].phones[p].pris = (response.data.operatorer[o].abb[a].phones[p].lurPris + response.data.operatorer[o].abb[a].pris)
              }
              response.data.operatorer[o].abb[a].phones[p].corp = response.data.operatorer[o].corp
              response.data.operatorer[o].abb[a].phones[p].gb = response.data.operatorer[o].abb[a].gb
              response.data.operatorer[o].abb[a].phones[p].operatorImg = response.data.operatorer[o].img
              response.data.operatorer[o].abb[a].phones[p].beskrivning = response.data.operatorer[o].abb[a].beskrivning
              response.data.operatorer[o].abb[a].phones[p].fordel1 = response.data.operatorer[o].abb[a].fordel1
              lurPriser.push(response.data.operatorer[o].abb[a].phones[p])
            }
          }
        }
      }
      // OM De är lurar + abbs (Spara energy ;))
      if (!global.$store.state.q1Stats) {
        // Sortera lurPriser
        lurPriser.sort((a, b) => {
          return a.pris - b.pris
        })
        // För alla Lurar
        for (var i in response.data.phones) {
          thePrices = []
          response.data.phones[i].surf = global.$store.state.guideSurf + ' GB+'
          lurPriser.forEach(val => {
            if (response.data.phones[i].name === val.name) {
              if (val.corp === 'Comviq') {
                if (val.gb === 10 || val.gb === 40) {
                  thePrices.push(val.corp + ' (' + val.gb + ' GB surf). ' + val.pris + ' kr i 24 mån. ' + val.minne + ' GB minne.')
                  response.data.phones[i].thePrices = thePrices
                }
              } else {
                thePrices.push(val.corp + ' (' + val.gb + ' GB surf). ' + val.pris + ' kr i 24 mån. ' + val.minne + ' GB minne.')
                response.data.phones[i].thePrices = thePrices
              }
            }
          })
          for (var ww = 0; ww < thePrices.length; ww++) {
            if (Number(thePrices[ww].split(' ')[1].replace('(', '')) >= global.$store.state.guideSurf || isNaN(thePrices[ww].split(' ')[1].replace('(', ''))) {
              response.data.phones[i].thePricesModel = thePrices[ww]
              break
            }
          }
        }
        // Sortera ALLA lurar efter POP
        if (global.$store.state.guidePoints === 0) {
          global.procentMatch = [94, 88, 81, 72, 65]
          for (var ii in response.data.phones) {
            phonesArr.push(response.data.phones[ii])
          }
        }
        // Sortera APPLE lurar efter POP
        if (global.$store.state.guidePoints === 10) {
          global.procentMatch = [97, 92, 84, 78, 72]
          for (var xx in response.data.phones) {
            if (response.data.phones[xx].corp === 'Apple') {
              phonesArr.push(response.data.phones[xx])
            }
          }
        }
        // Sortera SAMSUNG Lurar efter POP
        if (global.$store.state.guidePoints === 100) {
          global.procentMatch = [96, 93, 82, 77, 71]
          for (var ss in response.data.phones) {
            if (response.data.phones[ss].corp === 'Samsung') {
              phonesArr.push(response.data.phones[ss])
            }
          }
        }
      }
        // Filtrera abbsen om resultat är enbart ABBS
      if (global.$store.state.q1Stats) {
        abbs.forEach(val => {
          if ((val.gb >= global.$store.state.guideSurf || isNaN(val.gb)) && (filteredAbbs.length < 10)) {
            if (global.$store.state.guideBind === 1) {
              if (val.bindTid === 0) {
                val.id = 'id' + idCount++
                filteredAbbs.push(val)
                global.procentMatch = [98, 92, 88, 72, 65, 61, 55, 51, 48, 40]
              }
            } else {
              val.id = 'id' + idCount++
              filteredAbbs.push(val)
              global.procentMatch = [94, 91, 88, 75, 68, 61, 57, 51, 48, 42]
            }
          }
        })
      }
      // Filtrera Lurar Och Abbs
      phonesArr.sort((a, b) => {
        return b.pop - a.pop
      })
      filteredAbbs.sort((a, b) => {
        return a.pris - b.pris
      })
      abbs.sort((a, b) => {
        return a.pris - b.pris
      })
      // Assign The Values
      global.abbsOrignal = abbs
      global.abbs = filteredAbbs
      global.phones = phonesArr
      global.lurPriser = lurPriser
    })
    .catch(function (error) {
      console.log(error.message)
    })
  }
}
</script>

<style scoped>
.bigAbbStyle {
  box-shadow: 2px 2px 10px grey;
  border-radius: 10px;
  border-bottom: 2px solid orange;
  background: #fff;
}
.bigAbbStyle:hover {
  box-shadow: 4px 4px 20px grey;
  border-radius: 10px;
  border-bottom: 2px solid green;
}
</style>

