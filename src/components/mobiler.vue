<template>
  <div class="white">
    <v-btn v-if="0" @click="test">TestFnc</v-btn>

    <v-dialog v-model="rabattInfo" max-width="400">
      <v-card>
        <v-card-title class="justify-center">
            <v-icon @click="rabattInfo = false" style="position:absolute;left:8px;top:8px">close</v-icon>
            <div class="title"><v-icon>info</v-icon> Rabatt Info</div>
          </v-card-title>
          <v-card-text>
            <div class="body-2">Eventuella rabatter dras vanligtvis vid kassan hos samtliga operatörer.</div>
            <div class="caption py-2">OBS! Ibland har en operatör en dedikerad sida med student/senior rabatter. Då hittar du sidan via menyn hos den valda operatören.</div>
            <v-icon large>add_shopping_cart</v-icon>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="rabattInfo = false" round class="info">Tack, Då vet jag!</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="smallScreenInfo" max-width="400">
        <v-card>
          <v-card-title class="justify-center">
            <v-icon @click="smallScreenInfo = false" style="position:absolute;left:8px;top:8px">close</v-icon>
            <div class="title"><v-icon>info</v-icon> Visste du...</div>
          </v-card-title>
          <v-card-text>
            <div class="body-2">...att du får alla specifikationer genom att klicka på en telefon!?</div>
            <img src="@/images/valj-icon.png" height="40px" alt="Jämför mobiler">
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="smallScreenInfo = false" round class="info">Visste redan!</v-btn>
            <v-btn @click="smallScreenInfo = false" round class="info">Nej, men då vet jag!</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog transition="dialog-bottom-transition" hide-overlay fullscreen v-model="buyDialog">
      <v-toolbar dark color="secondary">
        <v-toolbar-title>
          <div class="mylogoArea">
          <v-icon class="logoIcon">chat</v-icon>
          <div class="headLogo">Mobiljakt.nu</div>
          <div class="logoSlogan">Hitta mobil till bästa pris</div>
        </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn round @click="buyDialog = false" class="primary">Stäng<v-icon large>keyboard_arrow_down</v-icon></v-btn>
      </v-toolbar>
      <v-card style="background:#f0f0f0">
        <div class="body-1 primary--text ml-3 pt-3">Mobiljakt.nu <v-icon>arrow_right</v-icon><span class="primary--text">Mobiler <v-icon>arrow_right</v-icon></span><span v-if="buyDialog" class="grey--text">{{ valdaProdukter[0].name }}</span></div>
        <v-container class="maxWidthContent" v-if="buyDialog">
        <v-layout class="white" style="box-shadow:2px 2px 5px grey" py-4 px-3 fill-height align-center justify-center row wrap my-4>
          <v-flex xs12 md4>
            <div class="display-1 mb-3 secondary--text text-xs-center pr-4" style="font-weight:bold">{{ valdaProdukter[0].name }}</div>
            <v-carousel light :style="carouselPhone">
              <v-carousel-item :key="img" v-for="img in valdaProdukter[0].img">
                <v-card-media style="margin-top:25px" :src="img" contain height="400"></v-card-media>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-flex xs12 md4>
            <div style="border:4px outset" class="px-2 py-2 mb-3">
            <div class="headline pl-1">Välj abonnemang:</div>
            <v-select
              class="mx-2 input-group--focused"
              style="width:200px"
              label="Min. surf"
              :items="abbPriser"
              multi-line
              v-model="valdSurfModel"
              ></v-select>
              <v-select
              class="mx-2 input-group--focused"
              style="width:90%"
              label="Alla Priser (Billigast Först)"
              :items="valdaProdukter[0].abbPriser"
              multi-line
              v-model="valdaProdukter[0].valdAbb"
              ></v-select>
            </div>
              <v-layout my-2 justify-center row wrap>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-1">Skärm (Tum):</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-1">{{ valdaProdukter[0].screen }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Batteri:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ valdaProdukter[0].batteri }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Vikt:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ valdaProdukter[0].vikt }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Minne:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ valdaProdukter[0].lagring }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Kamera:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ valdaProdukter[0].kamera }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Skärmupplösning:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ valdaProdukter[0].skarmupplosning }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Operativsystem:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ valdaProdukter[0].operativsystem }}</div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ valdaProdukter[0].fordel1 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ valdaProdukter[0].fordel2 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                </v-layout>
          </v-flex>
          <v-flex xs12 md4>
            <div class="headline text-xs-center mb-4 secondary--text" style="font-weight:bold">Sammanfattning</div>
            <v-layout px-3 fill-height row wrap align-center>
              <v-flex text-xs-center xs12>
                <img class="mb-2" :src="valdOperator" style="max-height:95px!important;max-width:250px!important" alt="Logga">
                <div class="display-3 success--text" style="font-weight:bold">{{ valdPris }}<span class="body-2 secondary--text"> kr/mån.</span> </div>
                <div class="body-2 mb-1">Bind. tid: <span class="body-1">24 månader</span></div>
                <div class="body-2 mb-1"><span style="font-weight:bold" class="success--text headline">{{ valdSurf }} GB surf</span><span class="body-1">/mån.</span></div>
                <div class="body-1 secondary--text" style="margin-bottom:-15px"><v-icon small>info</v-icon> {{ valdAbbBeskrivning }}</div>
                <div class="pl-2 mt-4">
                <a target="_blank" :href="valdAbbLink" rel="nofollow" style="text-decoration:none!important"><v-btn large block round class="teal white--text mt-2" style="font-weight:bold">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        </v-container>
      </v-card>
      <v-footer>
        <div class="body-1 pl-2"><span>&copy; {{ new Date().getFullYear() }} Mobiljakt.nu. All rights reserved.</span></div>
      </v-footer>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-container>
                <h2 class="text-xs-center mb-2">{{ phoneObj.name }}</h2>
                <div class="subheading text-xs-center" style="font-weight:bold">Pris fr. <span class="success--text">{{ phoneObj.pris }} kr/mån.</span></div>
                <v-layout my-2 justify-center row wrap>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-1">Skärm (Tum):</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-1">{{ phoneObj.screen }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Batteri:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phoneObj.batteri }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Vikt:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phoneObj.vikt }}</div></v-flex>
                  <v-flex xs3><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Kamera:</div></v-flex>
                  <v-flex xs9><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phoneObj.kamera }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Skärmupplösning:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phoneObj.skarmupplosning }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Operativsystem:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phoneObj.operativsystem }}</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">Lagring:</div></v-flex>
                  <v-flex xs6><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2">{{ phoneObj.lagring }}</div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phoneObj.fordel1 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                  <v-flex xs11><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-left pl-2 my-2">{{ phoneObj.fordel2 }}</div></v-flex>
                  <v-flex xs1><div style="border-bottom:1px solid lightgrey" class="body-2 text-xs-right pr-2 my-2"><v-icon small class="success--text">check_circle</v-icon></div></v-flex>
                  <v-flex xs12 text-xs-center>
                    <v-btn @click="dialog = false" style="margin-bottom:-10px" small round>Stäng<v-icon>close</v-icon></v-btn>
                  </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
    <div v-show="over1140" class="filter hidden-sm-and-down">
        <div class="ml-3 mt-5">
        <h1 class="title" style="font-size:22px!important">Filter</h1>
        <v-flex xs9 mt-3>
          <h3 v-if="surfSlider > 0" style="margin-bottom:-20px">Visa priser med minst <span style="font-weight:bold" class="success--text">{{ surfSlider }}</span> GB Surf</h3>
          <h3 v-if="surfSlider === 0" style="margin-bottom:-20px">Visa priser med minst <span style="font-weight:bold" class="success--text">1</span> GB Surf</h3>
          <v-slider v-model="surfSlider" thumb-label step="10" ticks></v-slider>
        </v-flex>
        <v-flex style="margin-top:-25px!important" mt-2 xs9>
        <v-select
          label="Välj Tillverkare"
          :items="tillverkare"
          multiple
          chips
          persistent-hint
          v-model="valdaTillverkare"
        ></v-select>
        <div style="border:2px outset;padding:0 5px">
        <div @click="rabattInfo = true" style="cursor:pointer" class="body-2 py-2"><v-icon class="info--text" small>info</v-icon> Är du student/ungdom?</div>
        <div @click="rabattInfo = true" style="cursor:pointer" class="body-2 pb-2"><v-icon class="info--text" small>info</v-icon> Är du senior?</div>
        </div>
      </v-flex>
        <h2 class="mt-4 title" style="font-size:18px!important">Pris:</h2>
         <v-flex xs8>
        <v-select
          :items="lagstPris"
          label="Lägst Pris"
          autocomplete
          v-model="a1"
        ></v-select>
      </v-flex>
      <v-flex xs8>
        <v-select
          :items="MaxPris"
          label="Max Pris"
          autocomplete
          v-model="a2"
        ></v-select>
      </v-flex>
        </div>
    </div>
    <v-layout v-show="over1140" style="margin-bottom:-55px" mt-4 justify-end row class="phoneAreaBig">
      <v-flex text-xs-left justify-start xs7>
        <div style="font-weight:bold" class="display-1 success--text">Mobiltelefoner</div>
      </v-flex>
      <v-flex xs3>
        <div class="body-1" style="max-width:220px"><v-icon small>info</v-icon> Välj en mobil för att se alla priser &amp; abonnemang</div>
      </v-flex>
       <v-flex xs2>
        <v-icon style="margin-left:-35px">sort</v-icon>
       <v-select
          style="margin-top:-45px"
          :items="items"
          label="Sortera efter"
          v-model="sortPhones"
          single-line
        ></v-select>
        </v-flex>
    </v-layout>
          <v-layout v-show="over1140" mt-5 wrap row class="phoneAreaBig">
              <v-flex xs12>
                  <div class="myDivider"></div>
              </v-flex>
          </v-layout>

          <v-layout v-show="loading" my-5 style="height:100vh" justify-center>
          <v-progress-circular indeterminate :size="100" :width="7" color="primary"></v-progress-circular>
          </v-layout>

          <v-layout :key="row.name" v-for="row in phones" v-show="over1140" class="phoneAreaBig" row>
              <v-flex :key="phone.name" v-for="phone in row" mt-4 :mr-3="phone.mr" xs3>
                  <v-card class="bigCard" style="border-radius:15px">
                    <div v-if="false" style="margin-bottom:-10px!important;visibility:hidden">-</div>
                    <v-card-text>
                      <div :class="{'title secondary--text text-xs-center' : phone.name !== 'Samsung Galaxy Xcover 4', 'subheading boldText secondary--text text-xs-center' : phone.name === 'Samsung Galaxy Xcover 4', }">{{ phone.name }}</div>
                    </v-card-text>
                      <v-card-media
                      :src="phone.img[0]"
                      height="250px"
                      contain
                      @click="phoneInfo(phone)"
                      style="cursor:pointer"
                      ></v-card-media>
                  <v-card-text style="cursor:pointer" @click="phoneInfo(phone)">
                      <div class="subheading" style="font-weight:bold!important">Pris fr. <span class="success--text">{{ phone.pris }} kr/mån.</span> <span v-show="surfSlider > 0" class="body-1 blue--text"><span class="body-2">{{ surfSlider }} GB+</span> surf</span></div>
                      <div class="body-2">Tillgänlig hos <span class="purple--text">{{ phone.antalOperatorer }}</span> operatörer</div>
                  </v-card-text>
                  <v-card-actions style="margin-top:-15px">
                      <v-btn @click="phone.valj = !phone.valj, controlValda(phone)" block outline small round class="success success--text">Välj <v-icon v-show="phone.valj">check</v-icon></v-btn>
                      <v-btn small @click="phone.checked = !phone.checked, addToCompare(phone)" fab :outline="!phone.checked" round :class="{'jamforBtn secondary secondary--text' : !phone.checked, 'jamforBtn orange darken--3 white--text' : phone.checked}"><v-icon>search</v-icon></v-btn>
                  </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <div class="mb-4"></div>
        <v-container v-show="!over1140">
          <v-navigation-drawer
          v-model="phoneFilterSmall"
          right
          app
          >
          <div class="ml-3 mt-4">
        <h1 class="title" style="font-size:22px!important">Filter</h1>
        <v-flex xs10 mt-3>
          <h3 v-if="surfSlider > 0" style="margin-bottom:-20px">Visa priser med min. <span style="font-weight:bold" class="success--text">{{ surfSlider }}</span> GB Surf</h3>
          <h3 v-if="surfSlider === 0" style="margin-bottom:-20px">Visa priser med min. <span style="font-weight:bold" class="success--text">1</span> GB Surf</h3>
          <v-slider style="width:90%!important" class="ml-4 mt-2" v-model="surfSlider" thumb-label step="10" ticks></v-slider>
        </v-flex>
        <v-flex style="margin-top:-25px" xs10>
        <v-select
          label="Välj Tillverkare"
          :items="tillverkare"
          multiple
          chips
          persistent-hint
          v-model="valdaTillverkare"
        ></v-select>
        <div style="padding:0 5px;border:2px outset">
        <div @click="rabattInfo = true" style="cursor:pointer" class="body-2 py-2"><v-icon class="info--text" small>info</v-icon> Är du student/ungdom?</div>
        <div @click="rabattInfo = true" style="cursor:pointer" class="body-2 pb-2"><v-icon class="info--text" small>info</v-icon> Är du senior?</div>
        </div>
      </v-flex>
        <h2 class="mt-4 title" style="font-size:18px!important">Pris:</h2>
         <v-flex xs8>
        <v-select
          :items="lagstPris"
          label="Lägst Pris"
          autocomplete
          v-model="a1"
        ></v-select>
      </v-flex>
      <v-flex xs8>
        <v-select
          :items="MaxPris"
          label="Max Pris"
          autocomplete
          v-model="a2"
        ></v-select>
      </v-flex>
        </div>
          </v-navigation-drawer>
          <div style="margin-top:-25px" class="title mb-5 text-xs-center">Mobiltelefoner</div>
          <v-layout row wrap justify-center>
            <v-flex my-4 xs12>
              <v-btn @click="phoneFilterSmall = true" block small style="margin-top:-55px;font-weight:bold" round outline class="primary--text primary">Filtrera</v-btn>
            </v-flex>
            <v-flex style="margin-top:-30px" xs10 ml-4>
        <v-icon style="margin-left:-35px">sort</v-icon>
          <v-select
          style="margin-top:-45px"
          :items="items"
          label="Sortera efter"
          v-model="sortPhones"
          single-line
          ></v-select>
          </v-flex>
          </v-layout>
        <v-layout mb-2 :key="phone.name" v-for="phone in phonesSimple" class="smallPhoneList card" justify-center row wrap>
              <v-flex text-xs-center @click="phoneInfo(phone)" xs4 md2>
                <img :src="phone.img[0]" height="120px" alt="Mobiltelefon">
              </v-flex>
              <v-flex xs8 md10>
                <div @click="phoneInfo(phone)">
                <p style="margin-bottom:-3px" class="body-2 text-xs-left">Pris fr. <span class="success--text">{{ phone.pris }} kr/mån.</span> <span v-show="surfSlider > 0" class="caption">Min. <span class="red--text" style="text-decoration:underline">{{ surfSlider }} GB</span> surf</span></p>
                <p class="body-2 text-xs-left">{{ phone.name }}</p>
                <p class="body-1 secondary--text" style="margin-top:-15px;margin-bottom:0px">Tillgänlig hos <span class="purple--text">{{ phone.antalOperatorer }}</span> operatörer</p>
                <div v-if="false">
                <v-icon class="yellow--text text--darken-2" small>star</v-icon><v-icon class="yellow--text text--darken-2" small>star</v-icon><v-icon class="yellow--text text--darken-2" small>star</v-icon><v-icon class="yellow--text text--darken-2" small>star</v-icon><v-icon class="yellow--text text--darken-2" small>star</v-icon>
                </div>
                <div class="body-1 secondary--text"><span class="body-2">Minne: </span>{{ phone.lagring }}</div>
                </div>
                <v-layout mt-1 class="text-xs-left" row>
                  <v-flex xs8>
                <v-btn @click="phone.valj = !phone.valj, controlValda(phone)" class="success success--text" block outline small round>Välj <v-icon v-show="phone.valj">check</v-icon></v-btn>
                </v-flex>
                <v-flex>
                <v-btn @click="phone.checked = !phone.checked, addToCompare(phone)" :class="{'jamforBtn secondary secondary--text' : !phone.checked, 'jamforBtn orange white--text' : phone.checked}" :outline="!phone.checked" small fab round><v-icon>search</v-icon></v-btn>
                </v-flex>
                </v-layout>
              </v-flex>
        </v-layout>
        </v-container>

        <div class="text-xs-center hidden-md-and-up">
       <v-dialog v-model="abonnemang" fullscreen transition="dialog-bottom-transition" :overlay="false">
         <v-toolbar class="secondary">
            <v-toolbar-title>
              <div v-if="abonnemang" class="title white--text">{{ valdaProdukter[0].name }}</div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
              <v-btn @click="abonnemang = false" icon>
                <v-icon x-large class="white--text">keyboard_arrow_down</v-icon>
             </v-btn>
          </v-toolbar>
          <v-card class="grey lighten-2">
            <v-container>
          <v-layout row wrap justify-center>
            <v-flex v-if="abonnemang" class="jmfrSmall white" mt-2 xs12>
            <v-layout mb-2 row wrap>
              <v-flex pt-3 pl-2 text-xs-center xs3>
              <img :src="valdaProdukter[0].img[0]" height="100px" alt="Mobiltelefoner">
              </v-flex>
              <v-flex text-xs-left xs4>
                <div v-show="1" style="font-weight:bold;width:150%" class="subheading pl-2 pt-3 pb-2">{{ valdaProdukter[0].name }}</div>
                <v-select
                class="ml-2"
                label="Surf"
                :items="abbPriser"
                multi-line
                v-model="valdSurfModel"
              ></v-select>
              </v-flex>
              <v-flex style="padding-top:42px" pl-3 text-xs-center xs3>
                <img style="margin-top:10px" v-if="valdaProdukter[0].valdAbb.split(' ')[0].replace(':', '') !== 'Tre'" :src="valdOperator" width="100px" alt="Mobiloperatör">
                <img class="pl-2" style="margin-top:10px" v-if="valdaProdukter[0].valdAbb.split(' ')[0].replace(':', '') === 'Tre'" :src="valdOperator" height="50px" alt="Vald operatör">
              </v-flex>
              <v-flex pl-3 pr-3 text-xs-left xs12>
              <v-select
              class="input-group--focused"
              label="Alla Priser (Billigast först)"
              :items="valdaProdukter[0].abbPriser"
              multi-line
              v-model="valdaProdukter[0].valdAbb"
              ></v-select>
              <div style="border:4px outset;border-radius:20px;padding:5px;margin-top:-10px;background:#fff">
                <div class="body-2 text-xs-center secondary--text">Sammanfattning:</div>
                <div class="text-xs-center display-1 secondary--text"><span style="font-weight:bold" class="success--text">{{ valdPris }}</span><span class="body-1"> kr/mån.</span></div>
              <div class="body-2 secondary--text text-xs-center"><span class="success--text title" style="font-weight:bold">{{ valdSurf }} GB surf</span><span class="body-1">/mån.</span></div>
              <div class="body-2 py-1 text-xs-center">Bind. tid: <span class="body-1">24 mån.</span></div>
              <div class="body-1 text-xs-center"><v-icon small>info</v-icon> {{ valdAbbBeskrivning }}</div>
              </div>
              <a target="_blank" :href="valdAbbLink" rel="nofollow" style="text-decoration:none!important;color:white!important"><v-btn large block round class="teal white--text my-3" style="font-weight:bold">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-layout>
        </v-container>
          </v-card>
       </v-dialog>
    </div>

  <section class="grey lighten-3">
    <v-container class="mt-5">
      <v-layout py-5 row wrap justify-center>
        <v-flex class="" xs12 md9>
          <div class="headline text-xs-center mb-3" style="font-weight:bold">Varmt välkommen till Mobiljakt.nu!</div>
          <p>
            Den genomsnittliga svensken köper en ny mobiltelefon vartannat år i snitt. Då är det ofta samma visa, man går in och jämför på operatörernas respektive hemsidor, går till butiker, pratar med säljare osv…
          </p>
          <p>
            Mobiljakt.nu är en jämförelsetjänst för att jämföra priser och egenskaper från sveriges alla mobiloperatörer, detta ska underlätta köp-processen för kunden. Man kan jämföra alla mobiloperatörers priser direkt [från billigast till dyrast] utefter sitt surfbehov och användning.
          </p>
          <p>
            Ibland kan man väga mellan flera olika telefoner, då hjälper mobiljakt kunden att få alla specifikationer och övrig nödvändig mobil- information innan man väljer vilken operatör man ska gå vidare med.
          </p>
          <div class="title py-3">Mobiltillverkare</div>
          <p>
            Idag finns det en mängd olika telefontillverkare att välja mellan. Men man kan nog säga att vissa telefontillverkare är mer vanliga och populära än andra globalt sett, men framförallt i Sverige.
          </p>
          <p>
            Dessa är framförallt Apple, Samsung, Sony och Huawei. Sedan har vi de som blivit lite mindre vanliga [bland svenskar] men som ändå förekommer: Motorola, Doro, Nokia och Oneplus.
          </p>
          <div class="title py-3">Mobilabonnemang</div>
          <p>
            Att välja en ny mobiltelefon är bara halva jobbet. Sedan gäller det ju att kunna koppla upp den på något nät så att man kan ringa och surfa. Då kan man antingen välja att kombinera en ny mobiltelefon med ett <a target="_blank" href="https://mobiljakt.nu/abonnemang">"nytt abonnemang".</a>
          </p>
          <p>
            Etablerade mobiloperatörer erbjuder idag lösning för det, även fast deras kärnverksamhet går ut på att just erbjuda mobiltelefoninät. Att de dessutom erbjuder nya mobiler är inget de tjänar så mycket på förutom att just “göra kunden till lags”, samt att det blir en eventuell bindningstid då.
          </p>
          <p>
            Då brukar man dela upp betalningen på mellan 12 - 24 månader, då den senare varianten är mer vanlig när man beställer abonnemang med telefon.
          </p>
          <p>
            Man kan även köpa en telefon kontant eller separat och sedan bara beställa ett abonnemang.
          </p>
          <p>
            De mobiloperatörer som erbjuder köp med mobil och abonnemang är Tre, Telia, Telenor, Tele2, Hallon, Halebop och Comviq.
          </p>
          <img src="https://mobiljakt.nu/images/mobile-phone.jpg" alt="Jämför mobiler" style="max-width:450px" width="80%" class="my-3">
          <div class="title py-3">Mobiltäckning</div>
          <p>
            När man tittar på respektive operatörs mobiltäckning över hela landet så ser vi att det inte är jättestora skillnader. Telia har det mest utbyggda nätet och har därför naturligtvis lite bättre täckning ute på landet och småorterna än andra operatörer.
          </p>
          <p>
            Men de andra operatörerna ligger inte långt efter, och här sker ständiga förbättringar, så i princip så kan man välja vilken operatör som helst om man verkligen inte har särskilda krav och omständigheter.
          </p>
          <p>
            Dessutom är det vanligt att de mindre operatörerna som är relativt nya, hyr in sig på de mer större och etablerade operatörernas nät. På så sätt kan man få bra täckning även när det dyker upp en “ny” operatör på marknaden.
          </p>
          <div class="title py-3">Slutord</div>
          <p>
            Vi jobbar ständigt med att förbättra och förenkla tjänsten och hoppas att du som kund känner dig nöjd och har fått den informationen du behöver för att fatta ett klokt köpbeslut.
          </p>
          <p>
            Priserna kan ibland variera när operatörer väljer att gå ut med tillfälliga kampanjer och rabatter som vi inte alltid tar med här. Då får man se det som en positiv överraskning när man kommer till operatörens hemsida.
          </p>
          <p>
            // Mobiljakt.nu
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
      
    <v-footer style="height:50px" v-show="visaValda" class="align-center justify-center" fixed>
      <v-btn @click="openBuyDialog" class="primary px-2" flat round>Visa vald produkt <v-icon>keyboard_arrow_up</v-icon></v-btn>
      <v-btn @click="clearVald" class="primary px-2" icon><v-icon>close</v-icon></v-btn>
    </v-footer>

        <compare-bottom></compare-bottom>
  </div>
</template>

<script>
import Axios from 'axios'
import Markerade from '@/components/markerade'

export default {
  components: {
    'compare-bottom': Markerade
  },
  data () {
    return {
      radioLabel: [
        { name: 'Standard Priser', val: 1 },
        { name: 'Student/Ungdom', val: 2 },
        { name: 'Senior', val: 3 }
      ],
      rabattInfo: false,
      dialog: false,
      phoneObj: '',
      valdaProdukter: '',
      items: [ 'Popularitet', 'Senaste', 'Lägst pris', 'Högst pris' ],
      sortPhones: 'Popularitet',
      tillverkare: [ 'Apple', 'Samsung', 'Huawei', 'Sony', 'Doro' ],
      lagstPris: [ '199 kr/mån', '399 kr/mån', '499 kr/mån', '599 kr/mån', '699 kr/mån' ],
      MaxPris: [ '399 kr/mån', '499 kr/mån', '599 kr/mån', '699 kr/mån', '799 kr/mån', '899 kr/mån', '999 kr/mån' ],
      a1: '',
      a2: '',
      abonnemang: false,
      visaValda: false,
      count: 0,
      abbPriser: [ '1 GB+', '5 GB+', '10 GB+', '20 GB+', '30 GB+', '40 GB+', '50 GB+', '60 GB+', '70 GB+', '80 GB+' ],
      billigasteModel: '',
      abbs: [],
      abbsUngdom: [],
      abbsSenior: [],
      buyDialog: false,
      responseAbbs: '',
      checkbox: [ false, false ],
      phoneFilterSmall: false,
      smallScreenInfo: false,
      surfSlider: 0,
      valdSurfModel: '1 GB+',
      valdaTillverkare: []
    }
  },
  watch: {
    sortPhones: function () {
      this.filterFunction()
    },
    valdSurfModel: function () {
      if (this.valdaProdukter.length > 0) {
        this.visaPriser()
      }
    },
    valdaTillverkare: function () {
      this.filterFunction()
    },
    surfSlider: function () {
      this.fromPriser()
    },
    a1: function () {
      this.filterFunction()
    },
    a2: function () {
      this.filterFunction()
    }
  },
  methods: {
    test () {
      console.log('test')
    },
    fromPriser () {
      var arr = []
      // var global = this
      this.phonesSimple.forEach(val => {
        this.abbs.forEach(el => {
          if (val.name === el.name && (el.gb >= this.surfSlider || isNaN(el.gb))) {
            if (el.corp === 'Comviq') {
              if (el.gb === 10 || el.gb === 40) {
                arr.push(el.abbPris + el.lurPris)
              }
            } else {
              arr.push(el.abbPris + el.lurPris)
            }
          }
        })
        arr.sort((a, b) => {
          return a - b
        })
        val.pris = arr[0]
        arr = []
      })
      // Uppdatera valdSurfModel BELOW
      for (var ii = 0; ii < this.abbPriser.length; ii++) {
        if (Number(this.abbPriser[ii].split(' ')[0]) >= this.surfSlider) {
          this.valdSurfModel = this.abbPriser[ii]
          return
        }
      }
    },
    filterFunction () {
      var simpleArr = []
      var sortKey = ''
      // Sortera lurar funktionen
      if (this.sortPhones === 'Senaste') {
        sortKey = 'relDate'
      } else if (this.sortPhones === 'Popularitet') {
        sortKey = 'pop'
      } else {
        sortKey = 'pris'
      }
      this.phonesSimpleRes.forEach(val => {
        simpleArr.push(val)
        val.mr = true
      })
      simpleArr.sort((a, b) => {
        return this.sortPhones !== 'Lägst pris' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
      })
      this.filterNext(simpleArr)
    },
    filterNext (simpleArr) {
      var count = 0
      var b
      var x = 0
      var y = 0
      var arr = []
      var nSimpleArr = []
      for (var xx = 0; xx < 6; xx++) {
        arr.push({})
      }
      // Här Görs Övriga Filteringar På Alla Filters
      if (this.valdaTillverkare.length > 0) {
        simpleArr.forEach(el => {
          if ((el.pris >= this.a1.split(' ')[0] || this.a1 === '') && (el.pris <= this.a2.split(' ')[0] || this.a2 === '')) {
            if (x === 0 || x === 1 || x === 2 || x === 3) {
              b = 'x' + count++
              if (x === 3) {
                el.mr = false
              }
              this.valdaTillverkare.forEach(val => {
                if (val === el.corp) {
                  nSimpleArr.push(el)
                  arr[y][b] = el
                  x++
                }
              })
            } else {
              x = 1
              y++
              b = 'x' + count++
              this.valdaTillverkare.forEach(val => {
                if (val === el.corp) {
                  nSimpleArr.push(el)
                  arr[y][b] = el
                }
              })
            }
          }
        })
        this.phones = arr
        this.phonesSimple = nSimpleArr
      } else {
        simpleArr.forEach(el => {
          // Big Screen Only -- simpleArr Är Redan Fixad Via parametern
          if ((el.pris >= this.a1.split(' ')[0] || this.a1 === '') && (el.pris <= this.a2.split(' ')[0] || this.a2 === '')) {
            if (x === 0 || x === 1 || x === 2 || x === 3) {
              b = 'nn' + count++
              if (x === 3) {
                el.mr = false
              }
              arr[y][b] = el
              x++
            } else {
              x = 1
              y++
              b = 'nn' + count++
              arr[y][b] = el
            }
          }
        })
        this.phones = arr
        this.phonesSimple = simpleArr
      }
    },
    visaPriser () {
      // Använder Watch för att hålla koll på updates (*Blir samma surf value för alla tack vare det)
      var x = []
      var phoneGB = Number(this.valdSurfModel.split(' ')[0])
      var valdPhone = this.valdaProdukter[0]
      if (valdPhone.valj === true) {
        this.abbs.forEach(val => {
          if (val.gb >= phoneGB && val.name === valdPhone.name) {
            if (val.corp === 'Comviq' && (val.gb === 10 || val.gb === 40)) {
              x.push(val.corp + ': ' + '(' + val.gb + ' GB surf). ' + (val.abbPris + val.lurPris) + ' kr i ' + val.bindTid + ' mån. ' + val.minne + ' GB minne.')
            } else if (val.corp !== 'Comviq') {
              x.push(val.corp + ': ' + '(' + val.gb + ' GB surf). ' + (val.abbPris + val.lurPris) + ' kr i ' + val.bindTid + ' mån. ' + val.minne + ' GB minne.')
            }
          }
          if (isNaN(val.gb) && val.name === valdPhone.name) {
            x.push(val.corp + ': ' + '(' + val.gb + ' surf). ' + (val.abbPris + val.lurPris) + ' kr i ' + val.bindTid + ' mån. ' + val.minne + ' GB minne.')
          }
        })
        this.valdaProdukter[0].abbPriser = x
        this.valdaProdukter[0].valdAbb = x[0]
      }
    },
    controlValda (phone) {
      var arr = []
      if (phone.valj === true) {
        arr.push(phone)
        this.$vuetify.breakpoint.mdAndUp ? this.buyDialog = true : this.abonnemang = true
      } else {
        arr = []
      }
      this.phonesSimple.forEach(val => {
        if (val.id !== phone.id) {
          val.valj = false
        }
      })
      if (arr.length > 0) {
        this.valdaProdukter = arr
        this.visaValda = true
      } else {
        this.buyDialog = false
        this.abonnemang = false
        this.visaValda = false
      }
      this.visaPriser(phone)
    },
    phoneInfo (phone) {
      this.phoneObj = phone
      this.dialog = true
    },
    addToCompare (phone) {
      return this.$store.commit('addToCompare', phone)
    },
    openBuyDialog () {
      this.$vuetify.breakpoint.mdAndUp ? this.buyDialog = true : this.abonnemang = true
    },
    clearVald () {
      var arr = this.$store.state.phonesSimple
      arr.forEach(val => {
        if (val.valj === true) {
          val.valj = false
        }
      })
      this.visaValda = false
    }
  },
  computed: {
    valdOperator () {
      var x = this.valdaProdukter[0].valdAbb.split(' ')[0].replace(':', '')
      for (var i in this.responseAbbs) {
        if (this.responseAbbs[i].corp === x) {
          return this.responseAbbs[i].img
        }
      }
    },
    valdAbbLink () {
      var x = this.valdaProdukter[0].valdAbb.split(' ')[0].replace(':', '')
      var minne
      !isNaN(this.valdaProdukter[0].valdAbb.split(' ')[9]) ? minne = Number(this.valdaProdukter[0].valdAbb.split(' ')[9]) : minne = Number(this.valdaProdukter[0].valdAbb.split(' ')[8])
      for (var i in this.responseAbbs) {
        for (var k in this.responseAbbs[i].abb) {
          if (this.responseAbbs[i].corp === x) {
            for (var l in this.responseAbbs[i].abb[k].phones) {
              if (this.responseAbbs[i].abb[k].phones[l].name === this.valdaProdukter[0].name && this.responseAbbs[i].abb[k].phones[l].minne === minne) {
                return this.responseAbbs[i].abb[k].phones[l].link
              } else if (this.responseAbbs[i].abb[k].phones[l].name === this.valdaProdukter[0].name && this.responseAbbs[i].abb[k].phones[l].minneLarge.minne === minne) {
                return this.responseAbbs[i].abb[k].phones[l].minneLarge.link
              }
            }
          }
        }
      }
    },
    valdAbbBeskrivning () {
      var x = this.valdaProdukter[0].valdAbb.split(' ')[0].replace(':', '')
      var y = this.valdaProdukter[0].valdAbb.split(' ')[1].replace('(', '')
      if (this.valdaProdukter[0].valdAbb.split(' ')[1].replace('(', '').length <= 3) {
        y = Number(y)
      }
      for (var i in this.responseAbbs) {
        for (var k in this.responseAbbs[i].abb) {
          if (this.responseAbbs[i].corp === x && this.responseAbbs[i].abb[k].gb === y) {
            return this.responseAbbs[i].abb[k].beskrivning
          }
        }
      }
    },
    valdSurf () {
      return this.valdaProdukter[0].valdAbb.split(' ')[1].replace('(', '')
    },
    valdPris () {
      var x = Number(this.valdaProdukter[0].valdAbb.split(' ')[1].replace('(', ''))
      return isNaN(x) ? this.valdaProdukter[0].valdAbb.split(' ')[3] : this.valdaProdukter[0].valdAbb.split(' ')[4]
    },
    carouselPhone () {
      return this.$vuetify.breakpoint.mdAndUp ? 'width:90%;box-shadow:0 0' : 'box-shadow:0 0'
    },
    loading () {
      return this.phones === ''
    },
    over1140 () {
      return this.$vuetify.breakpoint.width >= 1140
    },
    phones: {
      get () { return this.$store.getters.phones },
      set (value) { this.$store.commit('phonesCommit', value) }
    },
    phonesReserv: {
      get () { return this.$store.getters.phonesReserv },
      set (value) { this.$store.commit('phonesExtra', value) }
    },
    phonesSimple: {
      get () { return this.$store.getters.phonesSimpleArr },
      set (value) { this.$store.commit('phonesCommitSimple', value) }
    },
    phonesSimpleRes: {
      get () { return this.$store.getters.phonesSimpleRes },
      set (value) { this.$store.commit('phonesExtraSimple', value) }
    }
  },
  mounted () {
    this.valdaProdukter = []
    for (var i = 0; i < this.phonesSimple.length; i++) {
      if (this.phonesSimple[i].valj === true) {
        this.phonesSimple[i].valj = false
      }
    }
    // Återställ Alla Lurar Vid Mounted (Pageload)
    this.phones = this.phonesReserv
    this.phonesSimple = this.phonesSimpleRes
  },
  created () {
    var global = this
    var count = 0
    var simpleArr = []
    var arr = []
    var priser = []
    var idCount = 0
    var antal = []
    if (this.phones === '') {
      Axios.get('https://mobiljakt.firebaseio.com//.json')
        .then(function (response) {
          for (var c in response.data.phones) {
            response.data.phones[c].mr = true
            if (count === 0 || c === 0) {
              arr.push({})
              count++
            } else if (count === 3) {
              count = 0
            } else {
              count++
            }
            response.data.phones[c].surf = '1 GB+'
            idCount++
            response.data.phones[c].id = 'x' + idCount
            response.data.phones[c].popId = ''
            response.data.phones[c].abbPriser = []
            response.data.phones[c].valdAbb = ''
            response.data.phones[c].pris = 2000
            response.data.phones[c].antalOperatorer = 0
            simpleArr.push(response.data.phones[c])
          }
          // Sortera simpleArr Efter "pop" value (b - a)
          simpleArr.sort((a, b) => {
            return b.pop - a.pop
          })
          global.phonesSimple = simpleArr
          global.phonesSimpleRes = simpleArr
          count = 0
          var x = 0
          var y = 0
          var b = ''
          simpleArr.forEach(val => {
            if (x === 0 || x === 1 || x === 2 || x === 3) {
              b = 'x' + count++
              if (x === 3) {
                val.mr = false
              }
              arr[y][b] = val
              x++
            } else {
              x = 1
              y++
              b = 'x' + count++
              arr[y][b] = val
            }
          })
          global.phones = arr
          global.phonesReserv = arr
          for (var l in response.data.operatorer) {
            if (response.data.operatorer[l].hasOwnProperty('phones')) {
              antal.push(response.data.operatorer[l].phones)
            } else {
              antal.push(response.data.operatorer[l].abb.a.phones)
            }
            for (var r in response.data.operatorer[l].abb) {
              if (response.data.operatorer[l].hasOwnProperty('phones')) {
                response.data.operatorer[l].abb[r].phones = JSON.parse(JSON.stringify(response.data.operatorer[l].phones))
              }
              for (var cc in response.data.operatorer[l].abb[r].phones) {
                if (response.data.operatorer[l].abb[r].hasOwnProperty('bind12') && response.data.operatorer[l].abb[r].bind12.pris > 0) {
                  response.data.operatorer[l].abb[r].phones[cc].abbPris = response.data.operatorer[l].abb[r].bind12.pris
                } else {
                  response.data.operatorer[l].abb[r].phones[cc].abbPris = response.data.operatorer[l].abb[r].pris
                }
              }
              if (response.data.operatorer[l].corp === 'Comviq' && (response.data.operatorer[l].abb[r].gb === 10 || response.data.operatorer[l].abb[r].gb === 40)) {
                priser.push(response.data.operatorer[l].abb[r].phones)
              } else if (response.data.operatorer[l].corp !== 'Comviq') {
                priser.push(response.data.operatorer[l].abb[r].phones)
              }
            }
          }
          // Visa Lägst Pris På Telefonen Uträkning
          priser.forEach(val => {
            for (var g in val) {
              global.phonesSimple.forEach(el => {
                if (val[g].name === el.name) {
                  if (el.pris > (val[g].abbPris + val[g].lurPris)) {
                    el.pris = (val[g].abbPris + val[g].lurPris)
                  }
                }
              })
            }
          })
          // Räkna ut hur många operatörer per telefon..
          global.phonesSimple.forEach(val => {
            for (var ii = 0; ii < antal.length; ii++) {
              for (var v in antal[ii]) {
                if (val.name === antal[ii][v].name) {
                  val.antalOperatorer++
                }
              }
            }
          })
        })
        .catch(function (error) {
          console.log(error.message)
        })
      // Info för Small Screens (Bara Visa En Gång When Created)
      if (this.$vuetify.breakpoint.smAndDown) {
        setTimeout(function () {
          global.smallScreenInfo = true
        }, 5000)
      }
    }
    Axios.get('https://mobiljakt.firebaseio.com/operatorer.json')
        .then(function (response) {
          var sortedAbb = []
          global.responseAbbs = response.data
          // Fixa Ihop Rabatt Priser För Varje Telefon Below
          for (var w in response.data) {
            // Fixa Över Telefonerna När Det bara finns en "phones" property
            for (var n in response.data[w].abb) {
              if (response.data[w].hasOwnProperty('phones')) {
                var clone = JSON.parse(JSON.stringify(response.data[w].phones))
                response.data[w].abb[n].phones = clone
              }
              // Styr upp all övrig nödvändig Data
              for (var b in response.data[w].abb[n].phones) {
                if (response.data[w].abb[n].phones[b].hasOwnProperty('minneLarge') && response.data[w].abb[n].phones[b].minneLarge.lurPris > 0 && response.data[w].abb[n].phones[b].minneLarge.minne > 0) {
                  response.data[w].abb[n].phones[b].minneLarge.name = response.data[w].abb[n].phones[b].name
                  response.data[w].abb[n].phones[b].minneLarge.bindTid = response.data[w].abb[n].phones[b].bindTid
                  response.data[w].abb[n].phones[b].minneLarge.gb = response.data[w].abb[n].gb
                  if (response.data[w].abb[n].hasOwnProperty('bind12') && response.data[w].abb[n].bind12.pris > 0) {
                    response.data[w].abb[n].phones[b].minneLarge.abbPris = response.data[w].abb[n].bind12.pris
                  } else {
                    response.data[w].abb[n].phones[b].minneLarge.abbPris = response.data[w].abb[n].pris
                  }
                  if (!response.data[w].abb[n].phones[b].minneLarge.hasOwnProperty('link')) {
                    response.data[w].abb[n].phones[b].minneLarge.link = response.data[w].abb[n].phones[b].link
                  }
                  response.data[w].abb[n].phones[b].minneLarge.corp = response.data[w].corp
                  response.data[w].abb[n].phones[b].minneLarge.x = ''
                  sortedAbb.push(response.data[w].abb[n].phones[b].minneLarge)
                }
                response.data[w].abb[n].phones[b].gb = response.data[w].abb[n].gb
                if (response.data[w].abb[n].hasOwnProperty('bind12') && response.data[w].abb[n].bind12.pris > 0) {
                  response.data[w].abb[n].phones[b].abbPris = response.data[w].abb[n].bind12.pris
                } else {
                  response.data[w].abb[n].phones[b].abbPris = response.data[w].abb[n].pris
                }
                response.data[w].abb[n].phones[b].corp = response.data[w].corp
                response.data[w].abb[n].phones[b].x = ''
                sortedAbb.push(response.data[w].abb[n].phones[b])
              }
            }
          }
          // Sortera Standard Abbs
          sortedAbb.sort((a, b) => {
            return (a.lurPris + a.abbPris) - (b.lurPris + b.abbPris)
          })
          global.abbs = sortedAbb
        })
        .catch(function (error) {
          console.log(error.message)
        })
  }
}
</script>


<style scoped>
.boldText {
  font-weight: bold !important;
}
.jamforBtn {
  height: 28px !important;
  width: 45px !important;
}
.jmfrSmall {
  box-shadow: 2px 2px 10px grey;
  border-radius: 10px;
  margin-bottom: 20%;
}
.tillvalCard {
  padding: 10px 30px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px grey;
}
.smallPhoneList {
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 2px 4px 15px grey;
}
.bigCard {
  box-shadow: 2px 4px 15px grey;
}
.bigCard:hover {
  box-shadow: 2px 4px 25px grey;
}
.filter {
    width: 270px;
    position: absolute;
    left: 0;
}
.phoneAreaBig {
    margin-left: 270px;
    max-width: 1200px;
    margin-right: 50px;
}
.myDivider {
    height: 1px;
    background: lightgrey;
}
</style>
