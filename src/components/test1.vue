<template>
<div>
  <v-btn v-if="0" @click="test">TEST</v-btn>
    <div v-if="phones === '' && abbs === ''">
        <v-container>
            <v-layout py-5 align-center justify-center wrap>
                <v-flex xs12>
                <div class="text-xs-center display-1">Vänta medans vi hämtar dina resultat ...</div>
                </v-flex>
                <v-flex xs12 text-xs-center>
                <v-progress-circular :size="110" :width="7" indeterminate color="purple"></v-progress-circular>
                </v-flex>
                <v-flex xs12 text-xs-center>
                    <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/566434-200.png" width="300px" alt="">
                </v-flex>
            </v-layout>
        </v-container>
    </div>
  <div v-if="phones !== '' || abbs !== ''">
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
            <v-layout :key="abb.id" v-for="(abb, index) in abbs" py-2 mb-4 style="box-shadow:2px 2px 8px grey;border-radius:5px" row wrap>
              <div class="body-2 black--text" style="position:absolute;margin-left:10px;margin-top:5px;z-index:10">{{ procentMatch[index] }}%</div>
              <v-progress-circular style="position:absolute;margin-left:5px" :value="procentMatch[index]" color="success"></v-progress-circular>
              <v-flex style="border-bottom:1px solid lightgrey;margin-top:-10px" mx-3 py-2 xs12 text-xs-center>
                <img v-if="abb.corp !== 'Fello' && abb.corp !== 'Tre'" class="ml-5" :src="abb.img" width="140px" alt="Logga">
                <img v-if="abb.corp === 'Fello'" class="ml-5" :src="abb.imgExtra" width="140px" alt="Logga">
                <img v-if="abb.corp === 'Tre'" class="ml-5" :src="abb.img" width="65px" alt="Logga">
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
                <v-btn style="width:90%" medium round class="teal white--text">Beställ <v-icon>arrow_right</v-icon></v-btn>
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
                        <img v-if="abb.corp !== 'Fello'" class="ml-5" :src="abb.img" width="140px" alt="Logga">
                        <img v-if="abb.corp === 'Fello'" class="ml-5" :src="abb.imgExtra" width="140px" alt="Logga">
                    </div>
                  </v-flex>
                  <v-flex xs3>
                      <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.pris }} kr</div>
                      <div class="body-2 secondary--text">Pris/mån.</div>
                  </v-flex>
                  <v-flex xs3>
                      <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.gb }} <span v-if="!isNaN(abb.gb)">GB/mån.</span></div>
                      <div class="body-2 secondary--text">Surf</div>
                  </v-flex>
                  <v-flex xs2>
                      <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.bindTid }} mån.</div>
                      <div class="body-2 secondary--text">Bind. tid</div>
                  </v-flex>
                  <v-flex xs2>
                      <v-btn large round class="success myBtnHover">Beställ <v-icon>arrow_right</v-icon></v-btn>
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
        <v-layout py-2 mb-4 style="box-shadow:2px 2px 10px grey;border-radius:10px" justify-center row wrap>
          <v-flex text-xs-left xs3>
            <img style="margin-left:-18px" :src="phones[0].img[0]" width="120px" alt="">
          </v-flex>
          <v-flex text-xs-left xs9>
            <div style="position:absolute;margin-top:-3px;margin-left:10px;z-index:10" class="body-2 white--text">Match: {{ procentMatch[0] }}%</div>
            <v-progress-linear style="width:160px;margin-top:-0px;margin-left:5px;border-radius:5px" :value="procentMatch[0]" height="14" color="success"></v-progress-linear>
            <div class="title pl-2">{{ phones[0].name }}</div>
            <div class="py-2 mb-3">
            <v-select
              @change="thePricesModel1"
              class="mx-2 input-group--focused"
              style="width:150px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phones[0].surf"
              ></v-select>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-select
              class="mx-2 input-group--focused"
              style="width:90%;margin-top:-20px"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed1"
              multi-line
              v-model="phones[0].thePricesModel"
              ></v-select>
          </v-flex>
          <v-flex text-xs-center xs12>
            <div class="title text-xs-center pb-3 secondary--text">SAMMAFATTNING:</div>
            <img v-if="phones[0].thePricesModel.split(' ')[0] !== 'Tre'" :src="getImage1" width="120px" alt="">
            <img v-if="phones[0].thePricesModel.split(' ')[0] === 'Tre'" :src="getImage1" width="50px" alt="">
            <div class="pb-1"><span class="display-2 success--text" style="font-weight:bold">{{ phones[0].thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/24 mån.</span></div>
            <div class="pb-1"><span class="display-1 success--text" style="font-weight:bold"><span class="body-2 secondary--text">Surf:</span> {{ phones[0].thePricesModel.split(' ')[1].replace('(', '') }} GB</span><span>/mån.</span></div>
            <div class="body-2 pb-1">{{ abbBesk1 }}</div>
            <a :href="phoneLink1" target="_blank" style="text-decoration:none!important"><v-btn large round style="width:90%" class="success myBtnHover">Beställ <v-icon>arrow_right</v-icon></v-btn></a>
          </v-flex>
        </v-layout>
        <v-layout py-2 mb-4 style="box-shadow:2px 2px 10px grey;border-radius:10px" justify-center row wrap>
          <v-flex text-xs-left xs3>
            <img style="margin-left:-18px" :src="phones[1].img[0]" width="120px" alt="">
          </v-flex>
          <v-flex text-xs-left xs9>
            <div style="position:absolute;margin-top:-3px;margin-left:10px;z-index:10" class="body-2 white--text">Match: {{ procentMatch[1] }}%</div>
            <v-progress-linear style="width:160px;margin-top:-0px;margin-left:5px;border-radius:5px" :value="procentMatch[1]" height="14" color="success"></v-progress-linear>
            <div class="title pl-2">{{ phones[1].name }}</div>
            <div class="py-2 mb-3">
            <v-select
              @change="thePricesModel2"
              class="mx-2 input-group--focused"
              style="width:150px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phones[1].surf"
              ></v-select>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-select
              class="mx-2 input-group--focused"
              style="width:90%;margin-top:-20px"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed2"
              multi-line
              v-model="phones[1].thePricesModel"
              ></v-select>
          </v-flex>
          <v-flex text-xs-center xs12>
            <div class="title text-xs-center pb-3 secondary--text">SAMMAFATTNING:</div>
            <img v-if="phones[1].thePricesModel.split(' ')[0] !== 'Tre'" :src="getImage2" width="120px" alt="">
            <img v-if="phones[1].thePricesModel.split(' ')[0] === 'Tre'" :src="getImage2" width="50px" alt="">
            <div class="pb-1"><span class="display-2 success--text" style="font-weight:bold">{{ phones[1].thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/24 mån.</span></div>
            <div class="pb-1"><span class="display-1 success--text" style="font-weight:bold"><span class="body-2 secondary--text">Surf:</span> {{ phones[1].thePricesModel.split(' ')[1].replace('(', '') }} GB</span><span>/mån.</span></div>
            <div class="body-2 pb-1">{{ abbBesk2 }}</div>
            <a :href="phoneLink2" target="_blank" style="text-decoration:none!important"><v-btn large round style="width:90%" class="success myBtnHover">Beställ <v-icon>arrow_right</v-icon></v-btn></a>
          </v-flex>
        </v-layout>
        <v-layout py-2 mb-4 style="box-shadow:2px 2px 10px grey;border-radius:10px" justify-center row wrap>
          <v-flex text-xs-left xs3>
            <img style="margin-left:-18px" :src="phones[1].img[0]" width="120px" alt="">
          </v-flex>
          <v-flex text-xs-left xs9>
            <div style="position:absolute;margin-top:-3px;margin-left:10px;z-index:10" class="body-2 white--text">Match: {{ procentMatch[2] }}%</div>
            <v-progress-linear style="width:160px;margin-top:-0px;margin-left:5px;border-radius:5px" :value="procentMatch[2]" height="14" color="success"></v-progress-linear>
            <div class="title pl-2">{{ phones[2].name }}</div>
            <div class="py-2 mb-3">
            <v-select
              @change="thePricesModel3"
              class="mx-2 input-group--focused"
              style="width:150px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phones[2].surf"
              ></v-select>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-select
              class="mx-2 input-group--focused"
              style="width:90%;margin-top:-20px"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed3"
              multi-line
              v-model="phones[2].thePricesModel"
              ></v-select>
          </v-flex>
          <v-flex text-xs-center xs12>
            <div class="title text-xs-center pb-3 secondary--text">SAMMAFATTNING:</div>
            <img v-if="phones[2].thePricesModel.split(' ')[0] !== 'Tre'" :src="getImage3" width="120px" alt="">
            <img v-if="phones[2].thePricesModel.split(' ')[0] === 'Tre'" :src="getImage3" width="50px" alt="">
            <div class="pb-1"><span class="display-2 success--text" style="font-weight:bold">{{ phones[2].thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/24 mån.</span></div>
            <div class="pb-1"><span class="display-1 success--text" style="font-weight:bold"><span class="body-2 secondary--text">Surf:</span> {{ phones[2].thePricesModel.split(' ')[1].replace('(', '') }} GB</span><span>/mån.</span></div>
            <div class="body-2 pb-1">{{ abbBesk3 }}</div>
            <a :href="phoneLink3" target="_blank" style="text-decoration:none!important"><v-btn large round style="width:90%" class="success myBtnHover">Beställ <v-icon>arrow_right</v-icon></v-btn></a>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- För Big Screens || Below -->
      <v-carousel v-if="this.$vuetify.breakpoint.mdAndUp" class="fill-height" light :cycle="false">
       <v-carousel-item>
           <v-layout ml-3 pt-3 row>
           <v-flex xs6>
        <div class="body-1 primary--text">Mobiljakt.nu <v-icon>arrow_right</v-icon><span class="primary--text">Mobilguiden <v-icon>arrow_right</v-icon></span><span class="grey--text">Matchning 1</span></div>
           </v-flex>
           <v-flex xs6>
               <div class="title right pr-5">Matchning: <span class="success--text">{{ procentMatch[0] }}%</span></div>
           </v-flex>
           </v-layout>          
           <v-container>
            <v-layout class="white" style="box-shadow:2px 2px 8px grey;border-radius:5px" py-4 px-2 align-center justify-center row>
                <!-- Första Field -->
                <v-flex text-xs-center md4 px-4>
                    <div style="margin-top:-80px" class="display-2 pb-5 secondary--text">{{ phones[0].name }}</div>
                    <v-carousel light style="box-shadow:0 0 0;height:380px;border-radius:15px">
                        <v-carousel-item :key="x" v-for="x in phones[0].img" class="pt-4">
                            <img :src="x" height="290px" alt="">
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
                <!-- Andra Field -->
                <v-flex pl-4 md4>
            <div style="border:4px outset" class="px-2 py-2 mb-3">
            <div class="headline pl-1 primary--text">Välj abonnemang:</div>
            <v-select
              @change="thePricesModel1"
              class="mx-2 input-group--focused"
              style="width:200px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phones[0].surf"
              ></v-select>
              <v-select
              class="mx-2 input-group--focused"
              style="width:90%"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed1"
              multi-line
              v-model="phones[0].thePricesModel"
              ></v-select>
            </div>
              <v-layout my-2 justify-center row wrap>
                <v-flex class="my-2" xs12>Tekniska Specifikationer:</v-flex> 
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-1">Skärm (Tum):</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-1">{{ phones[0].screen }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Batteri:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[0].batteri }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Vikt:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[0].vikt }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Minne:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[0].lagring }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Kamera:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[0].kamera }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Skärmupplösning:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[0].skarmupplosning }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Operativsystem:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[0].operativsystem }}</div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phones[0].fordel1 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phones[0].fordel2 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                </v-layout>
                </v-flex>
                <!-- Tredje Field -->
                <v-flex pl-5 text-xs-center md4>
                    <div class="display-1 pb-2 secondary--text" style="font-weight:bold">SAMMAFATTNING:</div>
                    <img v-if="phones[0].thePricesModel.split(' ')[0] !== 'Tre'" :src="getImage1" width="220px" alt="">
                    <img v-if="phones[0].thePricesModel.split(' ')[0] === 'Tre'" :src="getImage1" width="100px" alt="">
                    <div class="pb-1"><span class="display-3 success--text" style="font-weight:bold">{{ phones[0].thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/24 mån.</span></div>
                    <div class="pb-1"><span class="display-1 success--text" style="font-weight:bold"><span class="body-2 secondary--text">Surf:</span> {{ phones[0].thePricesModel.split(' ')[1].replace('(', '') }} GB</span><span>/mån.</span></div>
                    <div class="body-2 pb-1">{{ abbBesk1 }}</div>
                    <a :href="phoneLink1" target="_blank" style="text-decoration:none!important"><v-btn large round block class="success myBtnHover">Beställ <v-icon>arrow_right</v-icon></v-btn></a>
                </v-flex>
            </v-layout>
          </v-container>
         </v-carousel-item>
         <!-- Andra Resultat -->
         <v-carousel-item>
           <v-layout ml-3 pt-3 row>
           <v-flex xs6>
        <div class="body-1 primary--text">Mobiljakt.nu <v-icon>arrow_right</v-icon><span class="primary--text">Mobilguiden <v-icon>arrow_right</v-icon></span><span class="grey--text">Matchning 2</span></div>
           </v-flex>
           <v-flex xs6>
               <div class="title right pr-5">Matchning: <span class="success--text">{{ procentMatch[1] }}%</span></div>
           </v-flex>
           </v-layout>          
           <v-container>
            <v-layout class="white" style="box-shadow:2px 2px 8px grey;border-radius:5px" py-4 px-2 align-center justify-center row>
                <!-- Första Field -->
                <v-flex text-xs-center md4 px-4>
                    <div style="margin-top:-80px" class="display-2 pb-5 secondary--text">{{ phones[1].name }}</div>
                    <v-carousel light style="box-shadow:0 0 0;height:380px;border-radius:15px">
                        <v-carousel-item :key="x" v-for="x in phones[1].img" class="pt-4">
                            <img :src="x" height="290px" alt="">
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
                <!-- Andra Field -->
                <v-flex pl-4 md4>
            <div style="border:4px outset" class="px-2 py-2 mb-3">
            <div class="headline pl-1 primary--text">Välj abonnemang:</div>
            <v-select
              @change="thePricesModel2"
              class="mx-2 input-group--focused"
              style="width:200px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phones[1].surf"
              ></v-select>
              <v-select
              class="mx-2 input-group--focused"
              style="width:90%"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed2"
              multi-line
              v-model="phones[1].thePricesModel"
              ></v-select>
            </div>
              <v-layout my-2 justify-center row wrap>
                <v-flex class="my-2" xs12>Tekniska Specifikationer:</v-flex> 
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-1">Skärm (Tum):</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-1">{{ phones[1].screen }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Batteri:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[1].batteri }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Vikt:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[1].vikt }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Minne:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[1].lagring }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Kamera:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[1].kamera }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Skärmupplösning:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[1].skarmupplosning }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Operativsystem:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[1].operativsystem }}</div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phones[1].fordel1 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phones[1].fordel2 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                </v-layout>
                </v-flex>
                <!-- Tredje Field -->
                <v-flex pl-5 text-xs-center md4>
                    <div class="display-1 pb-2 secondary--text" style="font-weight:bold">SAMMAFATTNING</div>
                    <img v-if="phones[1].thePricesModel.split(' ')[0] !== 'Tre'" :src="getImage2" width="220px" alt="">
                    <img v-if="phones[1].thePricesModel.split(' ')[0] === 'Tre'" :src="getImage2" width="100px" alt="">
                    <div class="pb-1"><span class="display-3 success--text" style="font-weight:bold">{{ phones[1].thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/24 mån.</span></div>
                    <div class="pb-1"><span class="display-1 success--text" style="font-weight:bold"><span class="body-2 secondary--text">Surf:</span> {{ phones[1].thePricesModel.split(' ')[1].replace('(', '') }} GB</span><span>/mån.</span></div>
                    <div class="body-2 pb-1">{{ abbBesk2 }}</div>
                    <a :href="phoneLink2" target="_blank" style="text-decoration:none!important"><v-btn large round block class="success myBtnHover">Beställ <v-icon>arrow_right</v-icon></v-btn></a>
                </v-flex>
            </v-layout>
          </v-container>
         </v-carousel-item>
         <!-- Tredje resultat -->
         <v-carousel-item>
           <v-layout ml-3 pt-3 row>
           <v-flex xs6>
        <div class="body-1 primary--text">Mobiljakt.nu <v-icon>arrow_right</v-icon><span class="primary--text">Mobilguiden <v-icon>arrow_right</v-icon></span><span class="grey--text">Matchning 3</span></div>
           </v-flex>
           <v-flex xs6>
               <div class="title right pr-5">Matchning: <span class="success--text">{{ procentMatch[2] }}%</span></div>
           </v-flex>
           </v-layout>          
           <v-container>
            <v-layout class="white" style="box-shadow:2px 2px 8px grey;border-radius:5px" py-4 px-2 align-center justify-center row>
                <!-- Första Field -->
                <v-flex text-xs-center md4 px-4>
                    <div style="margin-top:-80px" class="display-2 pb-5 secondary--text">{{ phones[2].name }}</div>
                    <v-carousel light style="box-shadow:0 0 0;height:380px;border-radius:15px">
                        <v-carousel-item :key="x" v-for="x in phones[0].img" class="pt-4">
                            <img :src="x" height="290px" alt="">
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
                <!-- Andra Field -->
                <v-flex pl-4 md4>
            <div style="border:4px outset" class="px-2 py-2 mb-3">
            <div class="headline pl-1 primary--text">Välj abonnemang:</div>
            <v-select
              @change="thePricesModel3"
              class="mx-2 input-group--focused"
              style="width:200px"
              label="Min. surf (GB)"
              :items="valjSurf"
              multi-line
              v-model="phones[2].surf"
              ></v-select>
              <v-select
              class="mx-2 input-group--focused"
              style="width:90%"
              label="Alla Priser (Billigast Först)"
              :items="thePricesFixed3"
              multi-line
              v-model="phones[2].thePricesModel"
              ></v-select>
            </div>
              <v-layout my-2 justify-center row wrap>
                <v-flex class="my-2" xs12>Tekniska Specifikationer:</v-flex> 
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-1">Skärm (Tum):</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-1">{{ phones[2].screen }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Batteri:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[2].batteri }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Vikt:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[2].vikt }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Minne:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[2].lagring }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Kamera:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[2].kamera }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Skärmupplösning:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[2].skarmupplosning }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Operativsystem:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phones[2].operativsystem }}</div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phones[2].fordel1 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phones[2].fordel2 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                </v-layout>
                </v-flex>
                <!-- Tredje Field -->
                <v-flex pl-5 text-xs-center md4>
                    <div class="display-1 pb-2 secondary--text" style="font-weight:bold">SAMMAFATTNING</div>
                    <img v-if="phones[2].thePricesModel.split(' ')[0] !== 'Tre'" :src="getImage3" width="220px" alt="">
                    <img v-if="phones[2].thePricesModel.split(' ')[0] === 'Tre'" :src="getImage3" width="100px" alt="">
                    <div class="pb-1"><span class="display-3 success--text" style="font-weight:bold">{{ phones[2].thePricesModel.split(' ')[4] }}</span><span class="secondary--text body-2"> kr/24 mån.</span></div>
                    <div class="pb-1"><span class="display-1 success--text" style="font-weight:bold"><span class="body-2 secondary--text">Surf:</span> {{ phones[2].thePricesModel.split(' ')[1].replace('(', '') }} GB</span><span>/mån.</span></div>
                    <div class="body-2 pb-1">{{ abbBesk3 }}</div>
                    <a :href="phoneLink3" target="_blank" style="text-decoration:none!important"><v-btn large round block class="success myBtnHover">Beställ <v-icon>arrow_right</v-icon></v-btn></a>
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
      procentMatch: []
    }
  },
  methods: {
    test () {
      console.log(this.abbs)
    },
    rabattInfoClose () {
      this.$store.state.guideRabatt = false
    },
    thePricesModel1 () {
      var global = this
      setTimeout(function () { global.model1Next() }, 100)
    },
    model1Next () {
      var arr = []
      this.phones[0].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[0].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      this.phones[0].thePricesModel = arr[0]
    },
    thePricesModel2 () {
      var global = this
      setTimeout(function () { global.model2Next() }, 100)
    },
    model2Next () {
      var arr = []
      this.phones[1].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[1].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      this.phones[1].thePricesModel = arr[0]
    },
    thePricesModel3 () {
      var global = this
      setTimeout(function () { global.model3Next() }, 100)
    },
    model3Next () {
      var arr = []
      this.phones[2].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[2].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      this.phones[2].thePricesModel = arr[0]
    }
  },
  computed: {
    getImage1 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[0].thePricesModel.split(' ')[0]) {
          x = val.operatorImg
        }
      })
      return x
    },
    abbBesk1 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[0].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[0].thePricesModel.split(' ')[1].replace('(', ''))) {
          x = val.beskrivning
        }
      })
      return x
    },
    phoneLink1 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[0].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[0].thePricesModel.split(' ')[1].replace('(', '')) && val.name === this.phones[0].name) {
          x = val.link
        }
      })
      return x
    },
    getImage2 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[1].thePricesModel.split(' ')[0]) {
          x = val.operatorImg
        }
      })
      return x
    },
    abbBesk2 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[1].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[1].thePricesModel.split(' ')[1].replace('(', ''))) {
          x = val.beskrivning
        }
      })
      return x
    },
    phoneLink2 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[1].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[1].thePricesModel.split(' ')[1].replace('(', '')) && val.name === this.phones[1].name) {
          x = val.link
        }
      })
      return x
    },
    getImage3 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[2].thePricesModel.split(' ')[0]) {
          x = val.operatorImg
        }
      })
      return x
    },
    abbBesk3 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[2].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[2].thePricesModel.split(' ')[1].replace('(', ''))) {
          x = val.beskrivning
        }
      })
      return x
    },
    phoneLink3 () {
      var x
      this.lurPriser.forEach(val => {
        if (val.corp === this.phones[2].thePricesModel.split(' ')[0] && val.gb === Number(this.phones[2].thePricesModel.split(' ')[1].replace('(', '')) && val.name === this.phones[2].name) {
          x = val.link
        }
      })
      return x
    },
    thePricesFixed1 () {
      var arr = []
      this.phones[0].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[0].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      return arr
    },
    thePricesFixed2 () {
      var arr = []
      this.phones[1].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[1].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      return arr
    },
    thePricesFixed3 () {
      var arr = []
      this.phones[2].thePrices.forEach(val => {
        if ((Number(val.split(' ')[1].replace('(', '')) >= Number(this.phones[2].surf.split(' ')[0])) || isNaN(val.split(' ')[1].replace('(', ''))) {
          arr.push(val)
        }
      })
      return arr
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
      console.log(response.data)
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

