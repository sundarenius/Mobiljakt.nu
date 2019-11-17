<template>
  <div class="white">
      <v-btn v-if="0" @click="test">TEST function</v-btn>
    <div v-show="over1140" class="filter hidden-sm-and-down">
        <div class="ml-3 mt-5">
        <h1 class="title" style="font-size:22px!important">Filter</h1>
        <v-flex xs8 mt-3>
          <h3 class="black--text title" style="margin-bottom:-20px;font-weight:bold;line-height:24px!important">Hur mycket surf behöver du (GB)?</h3>
          <v-slider v-model="surfSlider" thumb-label step="10" ticks></v-slider>
          <div class="body-2 pb-4" style="margin-top:-30px" v-show="filterHits && abbVy">Antal träffar: {{ filterHits }}</div>
          <div class="subheading pb-4 success--text" style="margin-top:-30px;font-weight:bold" v-show="filterHits">Minst {{ surfSlider }} GB+</div>
        </v-flex>
        <v-flex style="margin-top:-30px" xs8>
        <v-select
          label="Välj Operatörer"
          v-model="valdaOperatorer"
          :items="operatorer"
          multiple
          chips
          persistent-hint
        ></v-select>
      </v-flex>
      <v-flex xs8 text-xs-left>
        <v-checkbox @change="sortFilter" v-model="checkbox" style="margin-bottom:-20px" label="Utan Bindningstid"></v-checkbox>
        <v-radio-group v-model="radioCheck">
          <v-radio @change="sortFilter(r)" :value="r.val" :key="r.val" v-for="r in radioLabel" :label="`${r.name}`"/>
        </v-radio-group>
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
    <v-layout v-if="over1140" style="margin-bottom:-55px" mt-4 justify-end row class="phoneAreaBig">
      <v-flex v-if="radioCheck === 1" text-xs-left justify-start xs10>
        <div style="font-weight:bold" class="display-1 success--text">Abonnemang</div>
      </v-flex>
      <v-flex v-if="radioCheck === 2" text-xs-left justify-start xs10>
        <div style="font-weight:bold" class="display-1 success--text">Student/Ungdoms Priser</div>
      </v-flex>
      <v-flex v-if="radioCheck === 3" text-xs-left justify-start xs8>
        <div style="font-weight:bold" class="display-1 success--text">Senior Priser</div>
      </v-flex>
      <v-flex xs2>
        <v-icon @click="abbVy = 0" style="cursor:pointer" :class="{'primary--text' : !abbVy, 'pr-2' : 1}" large>view_headline</v-icon>
        <v-icon @click="abbVy = 1" style="cursor:pointer" large :class="{'pl-2' : true, 'primary--text' : abbVy}">view_module</v-icon>
        </v-flex>
       <v-flex xs2>
        <v-icon style="margin-left:-35px">sort</v-icon>
       <v-select
          style="margin-top:-45px"
          :items="items"
          label="Sortera efter"
          single-line
          v-model="itemsSel"
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

          <v-layout v-if="over1140 && !abbVy" :key="abb.id" v-for="abb in abbListSimple" mt-2 mb-4 py-4 class="bigAbbStyle phoneAreaBig" justify-center text-xs-center row wrap>
                  <v-flex xs2>
                    <div class="body-2">
                        <img v-if="abb.corp !== 'Fello' && abb.corp !== 'Tre'" class="ml-5" :src="abb.img" style="max-height:62px!important;max-width:140px!important" alt="Mobilabonnemang">
                        <img v-if="abb.corp === 'Fello'" class="ml-5" :src="abb.imgExtra" width="110px" alt="Jämför mobilabonnemang">
                        <img v-if="abb.corp === 'Tre'" class="ml-5" :src="abb.img" width="55px" alt="Jämför abonnemang">
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
                      <a v-if="!abb.hasOwnProperty('seniorLink') || radioCheck !== 3" :href="abb.link" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn large round class="teal white--text myBtnHover">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
                      <a v-if="abb.hasOwnProperty('seniorLink') && radioCheck === 3" :href="abb.seniorLink" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn large round class="teal white--text myBtnHover">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
                  </v-flex>
                  <v-flex style="border-top:1px solid lightgrey" mt-3 pt-3 xs5>
                      <div class="body-2">{{ abb.fordel1 }} <v-icon small class="success--text">check_circle</v-icon></div>
                  </v-flex>
                  <v-flex style="border-top:1px solid lightgrey" mt-3 pt-3 xs5>
                      <div class="body-2">{{ abb.beskrivning }} <v-icon small class="success--text">check_circle</v-icon></div>
                  </v-flex>
              </v-layout>

        <v-layout v-if="over1140 && abbVy" class="phoneAreaBig" row wrap>
          <v-flex :class="{ 'green lighten-2' : surfSlider >= 60, 'grey lighten-2' : surfSlider < 60 }" style="background:#efebeb" md3>
            <div class="text-xs-center title mt-2" style="margin-bottom:-20px">X-Large Surf</div><br>
            <div class="subheading text-xs-center mt-2" style="font-weight:bold;margin-bottom:-30px">(60 GB+)</div>
          <v-layout style="padding:15px" mt-4 wrap>
            <v-flex :key="abb.id" v-for="abb in abonnemangLista[0]" md12>
            <v-card :class="abb.bigCards" style="border-radius:10px">
              <v-card-text :class="abb.color">
                <img :src="abb.img" style="max-width:180px;max-height:50px" alt="Logga">
                <div v-if="abb.corp === 'Vimla' || abb.corp === 'Telenor' || abb.corp === 'Comviq' || abb.corp === 'Telia' || abb.corp === 'My Beat'">
                  <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline secondary--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
                <div v-if="abb.corp === 'Hallon' || abb.corp === 'Tele2' || abb.corp === 'Tre' || abb.corp === 'Fello' || abb.corp === 'Halebop'">
                  <div style="font-weight:bold" class="display-1 white--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline white--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
              </v-card-text>
              <v-card-actions :class="abb.color1">
                <v-btn v-if="abb.corp === 'Hallon' || abb.corp === 'Comviq' || abb.corp === 'Fello' || abb.corp === 'Halebop' || abb.corp === 'Tele2' || abb.corp === 'Tre'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round :outline="abb.corp !== 'Comviq'" large :class="{'white white--text' : abb.corp !== 'Comviq', 'white secondary--text' : abb.corp === 'Comviq'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>
                <v-btn v-if="abb.corp === 'Telia' || abb.corp === 'Telenor' || abb.corp === 'Vimla' || abb.corp === 'My Beat'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round large :class="{'purple darken-2 white--text' : abb.corp === 'Telia', 'secondary white--text' : abb.corp === 'My Beat', 'primary lighten-2 white--text' : abb.corp === 'Telenor', 'green lighten-1 white--text' : abb.corp === 'Vimla'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>              </v-card-actions>
              <v-card-text class="text-xs-left">
                <div class="black--text subheading">Bindningstid: <span style="font-weight:bold" class="subheading">{{ abb.bindTid }} mån.</span></div>
                <div class="body-2 black--text subheading mt-2">{{ abb.fordel1 }} <v-icon small class="success--text">check_circle</v-icon></div>
              </v-card-text>
            </v-card>
            </v-flex>
          </v-layout>
          </v-flex>
          <v-flex :class="{ 'green lighten-2' : surfSlider >= 40 && surfSlider < 60, 'white' : surfSlider < 40 || surfSlider >= 60 }" md3>
            <div class="text-xs-center title mt-2" style="margin-bottom:-20px">Large Surf</div><br>
            <div class="subheading text-xs-center mt-2" style="font-weight:bold;margin-bottom:-30px">(40 GB+)</div>
          <v-layout style="padding:15px" mt-4 wrap>
            <v-flex :key="abb.id" v-for="abb in abonnemangLista[1]" md12>
            <v-card :class="abb.bigCards" style="border-radius:10px">
              <v-card-text :class="abb.color">
                <img :src="abb.img" style="max-width:180px;max-height:50px" alt="Logga">
                <div v-if="abb.corp === 'Vimla' || abb.corp === 'Telenor' || abb.corp === 'Comviq' || abb.corp === 'Telia' || abb.corp === 'My Beat'">
                  <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline secondary--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
                <div v-if="abb.corp === 'Hallon' || abb.corp === 'Tele2' || abb.corp === 'Tre' || abb.corp === 'Fello' || abb.corp === 'Halebop'">
                  <div style="font-weight:bold" class="display-1 white--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline white--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
              </v-card-text>
              <v-card-actions :class="abb.color1">
                <v-btn v-if="abb.corp === 'Hallon' || abb.corp === 'Comviq' || abb.corp === 'Fello' || abb.corp === 'Halebop' || abb.corp === 'Tele2' || abb.corp === 'Tre'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round :outline="abb.corp !== 'Comviq'" large :class="{'white white--text' : abb.corp !== 'Comviq', 'white secondary--text' : abb.corp === 'Comviq'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>
                <v-btn v-if="abb.corp === 'Telia' || abb.corp === 'Telenor' || abb.corp === 'Vimla' || abb.corp === 'My Beat'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round large :class="{'purple darken-2 white--text' : abb.corp === 'Telia', 'secondary white--text' : abb.corp === 'My Beat', 'primary lighten-2 white--text' : abb.corp === 'Telenor', 'green lighten-1 white--text' : abb.corp === 'Vimla'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>              </v-card-actions>
              <v-card-text class="text-xs-left">
                <div class="black--text subheading">Bindningstid: <span style="font-weight:bold" class="subheading">{{ abb.bindTid }} mån.</span></div>
                <div class="body-2 black--text subheading mt-2">{{ abb.fordel1 }} <v-icon small class="success--text">check_circle</v-icon></div>
              </v-card-text>
            </v-card>
            </v-flex>
          </v-layout>
          </v-flex>
          <v-flex :class="{ 'green lighten-2' : surfSlider >= 15 && surfSlider < 40, 'grey lighten-2' : surfSlider < 15 || surfSlider >= 40 }" md3>
            <div class="text-xs-center title mt-2" style="margin-bottom:-20px">Medium Surf</div><br>
            <div class="subheading text-xs-center mt-2" style="font-weight:bold;margin-bottom:-30px">(15 GB+)</div>
          <v-layout style="padding:15px" mt-4 wrap>
            <v-flex :key="abb.id" v-for="abb in abonnemangLista[2]" md12>
            <v-card :class="abb.bigCards" style="border-radius:10px">
              <v-card-text :class="abb.color">
                <img :src="abb.img" style="max-width:180px;max-height:50px" alt="Logga">
                <div v-if="abb.corp === 'Vimla' || abb.corp === 'Telenor' || abb.corp === 'Comviq' || abb.corp === 'Telia' || abb.corp === 'My Beat'">
                  <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline secondary--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
                <div v-if="abb.corp === 'Hallon' || abb.corp === 'Tele2' || abb.corp === 'Tre' || abb.corp === 'Fello' || abb.corp === 'Halebop'">
                  <div style="font-weight:bold" class="display-1 white--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline white--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
              </v-card-text>
              <v-card-actions :class="abb.color1">
                <v-btn v-if="abb.corp === 'Hallon' || abb.corp === 'Comviq' || abb.corp === 'Fello' || abb.corp === 'Halebop' || abb.corp === 'Tele2' || abb.corp === 'Tre'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round :outline="abb.corp !== 'Comviq'" large :class="{'white white--text' : abb.corp !== 'Comviq', 'white secondary--text' : abb.corp === 'Comviq'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>
                <v-btn v-if="abb.corp === 'Telia' || abb.corp === 'Telenor' || abb.corp === 'Vimla' || abb.corp === 'My Beat'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round large :class="{'purple darken-2 white--text' : abb.corp === 'Telia', 'secondary white--text' : abb.corp === 'My Beat', 'primary lighten-2 white--text' : abb.corp === 'Telenor', 'green lighten-1 white--text' : abb.corp === 'Vimla'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>              </v-card-actions>
              <v-card-text class="text-xs-left">
                <div class="black--text subheading">Bindningstid: <span style="font-weight:bold" class="subheading">{{ abb.bindTid }} mån.</span></div>
                <div class="body-2 black--text subheading mt-2">{{ abb.fordel1 }} <v-icon small class="success--text">check_circle</v-icon></div>
              </v-card-text>
            </v-card>
            </v-flex>
          </v-layout>
          </v-flex>
          <v-flex :class="{ 'green lighten-2' : surfSlider >= 1 && surfSlider < 15, 'white' : surfSlider < 1 || surfSlider >= 15 }" md3>
            <div class="text-xs-center title mt-2" style="margin-bottom:-20px">Small Surf</div><br>
            <div class="subheading text-xs-center mt-2" style="font-weight:bold;margin-bottom:-30px">(15 GB-)</div>
          <v-layout style="padding:15px" mt-4 wrap>
            <v-flex :key="abb.id" v-for="abb in abonnemangLista[3]" md12>
            <v-card :class="abb.bigCards" style="border-radius:10px">
              <v-card-text :class="abb.color">
                <img :src="abb.img" style="max-width:180px;max-height:50px" alt="Logga">
                <div v-if="abb.corp === 'Vimla' || abb.corp === 'Telenor' || abb.corp === 'Comviq' || abb.corp === 'Telia' || abb.corp === 'My Beat'">
                  <div style="font-weight:bold" class="display-1 secondary--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline secondary--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
                <div v-if="abb.corp === 'Hallon' || abb.corp === 'Tele2' || abb.corp === 'Tre' || abb.corp === 'Fello' || abb.corp === 'Halebop'">
                  <div style="font-weight:bold" class="display-1 white--text">{{ abb.gb }} <span v-show="!isNaN(abb.gb)">GB</span></div>
                  <div class="headline white--text mt-1"><span style="font-weight:bold">{{ abb.pris }}</span> kr/mån</div>
                </div>
              </v-card-text>
              <v-card-actions :class="abb.color1">
                <v-btn v-if="abb.corp === 'Hallon' || abb.corp === 'Comviq' || abb.corp === 'Fello' || abb.corp === 'Halebop' || abb.corp === 'Tele2' || abb.corp === 'Tre'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round :outline="abb.corp !== 'Comviq'" large :class="{'white white--text' : abb.corp !== 'Comviq', 'white secondary--text' : abb.corp === 'Comviq'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>
                <v-btn v-if="abb.corp === 'Telia' || abb.corp === 'Telenor' || abb.corp === 'Vimla' || abb.corp === 'My Beat'" @click="abb.vald = !abb.vald, openBottomSheet(abb)" block round large :class="{'purple darken-2 white--text' : abb.corp === 'Telia', 'secondary white--text' : abb.corp === 'My Beat', 'primary lighten-2 white--text' : abb.corp === 'Telenor', 'green lighten-1 white--text' : abb.corp === 'Vimla'}">Välj <v-icon v-show="abb.vald">check</v-icon></v-btn>
              </v-card-actions>
              <v-card-text class="text-xs-left">
                <div class="black--text subheading">Bindningstid: <span style="font-weight:bold" class="subheading">{{ abb.bindTid }} mån.</span></div>
                <div class="body-2 black--text subheading mt-2">{{ abb.fordel1 }} <v-icon small class="success--text">check_circle</v-icon></div>
              </v-card-text>
            </v-card>
            </v-flex>
          </v-layout>
          </v-flex>
          </v-layout>

        <v-container v-if="!over1140">
          <v-navigation-drawer
          v-model="abbFilterSmall"
          right
          app
          >
          <div class="ml-3 mt-4">
        <h1 class="title" style="font-size:22px!important">Filter</h1>
        <v-flex xs10 mt-3>
          <h3 style="margin-bottom:-20px">Hur mycket surf behöver du? [GB] <span class="success--text" v-show="surfSlider > 0">Min. {{ surfSlider }} GB+</span></h3>
          <v-slider style="width:90%!important" class="ml-4" v-model="surfSlider" thumb-label step="10" ticks></v-slider>
          <div class="body-2 pb-4" style="margin-top:-30px" v-show="filterHits">Antal träffar: {{ filterHits }}</div>
        </v-flex>
        <v-flex style="margin-top:-30px" xs10>
        <v-select
          label="Välj Operatörer"
          v-model="valdaOperatorer"
          :items="operatorer"
          multiple
          chips
          persistent-hint
        ></v-select>
      </v-flex>
      <v-flex xs8 text-xs-left>
        <v-checkbox @change="sortFilter" v-model="checkbox" style="margin-bottom:-20px" label="Utan Bindningstid"></v-checkbox>
        <v-radio-group v-model="radioCheck">
          <v-radio @change="sortFilter(r)" :value="r.val" :key="r.val" v-for="r in radioLabel" :label="`${r.name}`"/>
        </v-radio-group>
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
          <div style="font-weight:bold" class="headline mb-4 text-xs-center">Mobilabonnemang</div>
          <div v-if="radioCheck === 2" style="margin-top:-13px" class="title text-xs-center mb-4 primary--text">Student/Ungdoms Priser</div>
          <div v-if="radioCheck === 3" style="margin-top:-13px" class="title text-xs-center mb-4 primary--text">Senior Priser</div>
          <v-btn @click="abbFilterSmall = true" style="font-weight:bold;margin-top:-5px" block small round outline class="primary primary--text mb-4">Filtrera</v-btn>
          <v-layout justify-center row>
            <v-flex style="margin-top:-5px" ml-3 xs9>
            <v-icon style="margin-left:-30px">sort</v-icon>
          <v-select
          style="margin-top:-45px"
          :items="items"
          label="Sortera efter"
          single-line
          v-model="itemsSel"
          ></v-select>
          </v-flex>
          </v-layout>
          <v-layout :key="abb.id" v-for="abb in abbListSimple" py-2 mb-4 style="box-shadow:2px 2px 8px grey;border-radius:5px" row wrap>
              <v-flex style="border-bottom:1px solid lightgrey;margin-top:-10px" mx-3 py-2 xs12 text-xs-center>
                <img v-if="abb.corp !== 'Fello' && abb.corp !== 'Tre'" :src="abb.img" style="max-height:72px!important;max-width:150px!important" alt="Logga">
                <img v-if="abb.corp === 'Fello'" :src="abb.imgExtra" width="100px" alt="Logga">
                <img v-if="abb.corp === 'Tre'" :src="abb.img" width="55px" alt="Logga">
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" mx-3 py-2 xs12>
                <div>
                  <span class="title left success--text">{{ abb.pris }} kr</span>
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
                <a v-if="!abb.hasOwnProperty('seniorLink') || radioCheck !== 3" :href="abb.link" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn style="width:90%" medium round class="teal white--text">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
                <a v-if="abb.hasOwnProperty('seniorLink') && radioCheck === 3" :href="abb.seniorLink" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn style="width:90%" medium round class="teal white--text">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
              </v-flex>
            </v-layout>
        </v-container>

        <section class="grey lighten-3">
    <v-container class="mt-5">
      <v-layout py-5 row wrap justify-center>
        <v-flex class="" xs12 md9>
          <div class="headline text-xs-center mb-3" style="font-weight:bold">Jämför mobilabonnemang på Mobiljakt.nu!</div>
          <p>
            Ett mobilabonnemang är en månatlig prenumeration, med eller utan bindningstid, hos en mobiloperatör för att kunna använda deras mobilnät, så att man kan surfa, ringa, sms:a/mms:a.
          </p>
          <p>
            Men det finns även kontantkort man kan köpa för att bara köpa in sig på ett mobilnät för en viss summa som förbrukas när man ringer, surfar och smsar. Då är det oftast en fast summa för att ringa, smsa och surfa. När den är förbrukad måste man alltså fylla på kontantkortet.
          </p>
          <p>
            Vanligast av dessa former är en månatlig prenumeration. Den passar dessutom för de som använder sin mobil oftare än de som bara använder den “ibland”, eftersom den oftast har fria samtal, sms och mms, och en varierande surfmängd via ett satellitnät.
          </p>
          <div class="title py-3">Teckna mobilabonnemang online</div>
          <p>
            Alla operatörer har idag smidiga system och e-butiker via deras egna hemsidor för att beställa abonnemang, men även med telefoner. 
          </p>
          <p>
            Det är faktiskt smidigare, snabbare och fördelaktigare att beställa via nätet idag i lugn och ro då man får all information direkt i skriftligt format och har mer tid att fatta ett bra köpbeslut.
          </p>
          <p>
            Du kan enkelt via mobiljakt.nu jämföra alla operatörers priser och egenskaper (ex. nät) innan du går vidare. Använder du filtret så kan du välja att visa abonnemang med en viss minimigräns av surf och pris exempelvis, eller bara välja att visa några få operatörer.
          </p>
          <p>
            Många operatörer har student/ungdoms priser, och vissa har dessutom senior priser för dig över 55-65 år. Även det kan du filtrera på här via mobiljakt.nu.
          </p>
          <div class="title py-3">Bindningstid på abonnemang</div>
          <p>
            Många operatörer har idag till fördel för kunden valt att helt slopa bindningstider. Dock har vissa fortfarande kvar detta, eller som ett alternativ. Väljer man att ha bindningstid istället för obundet så kan man ibland dra nytta av vissa rabatter som man får.
          </p>
          <p>
            Tänk på att du alltid har rätt att ångra ditt köp av abonnemang och/eller telefon när du ingår avtal via internet i upp till 14 dagar. Ibland får du en generösare “betänketid/testperiod” av operatören. 
          </p>
          <p>
            Är det ett ett obundet avtal så blir ångerrätten av mindre värde. Då kan du avsluta ditt abonnemang när som helst. Med eventuella uppsägningstider. Den brukar dock ligga på 1 - 3 månader.
          </p>
          <img src="https://mobiljakt.nu/images/abonnemang.png" style="max-width:250px" width="60%" alt="Jämför mobilabonnemang">
          <div class="title py-3">Mobiltäckning</div>
          <p>
            Vi redovisar för de mindre operatörerna (de som hyr in sig på andra nät) vilket nät de använder. När det gäller dom större operatörerna såsom Telia, Tre, Telenor och Tele2 så kan du förutsätta att de har sina egna utbyggda nät, eller åtminstone delar på.
          </p>
          <p>
            De mindre operatörerna som helt hyr in sig på någon av de större operatörernas nät är Halebop, Comviq, Hallon, My Beat, Alltele, Fello och Vimla.
          </p>
          <p>
            Vi hoppas att du som kund blir tillfreds med mobiljakt.nu och att du fått den vägledning och hjälp som du känner att du har behövt för att fatta ett välgrundat köpbeslut. Väl mött!
          </p>
          <p>
            //Mobiljakt.nu
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>

        <v-bottom-sheet :persistent="true" :hide-overlay="true" fixed v-model="bottomSheet">
          <div v-show="abbVy" class="hidden-sm-and-down" style="background:linear-gradient(225deg,#00ffd4 -20%,#498ce7 35%,#4e84e8 50%,#5c6feb 60%,#852ef6)">
            <v-container>
              <v-layout justify-center row>
                <v-flex xs12 md8>
                  <v-layout align-center class="valdAbb maxWidthContent" row wrap>
              <v-flex text-xs-center xs3>
                <img v-if="valdAbb.corp !== 'Fello' && valdAbb.corp !== 'Tre'" :src="valdAbb.img" style="max-width:140px;max-height:50px" alt="Logga">
                <img v-if="valdAbb.corp === 'Fello'" :src="valdAbb.imgExtra" width="100px" alt="Logga">
                <img v-if="valdAbb.corp === 'Tre'" :src="valdAbb.img" width="55px" alt="Logga">
              </v-flex>
              <v-flex pl-4 py-3 text-xs-left xs2>
                <div class="body-1">Bind. tid</div>
                <div class="title mb-2">{{ valdAbb.bindTid }} mån.</div>
              </v-flex>
              <v-flex py-2 text-xs-left xs1>
                <div class="body-1">Pris/mån.</div>
                <div class="title mb-2 success--text" style="font-weight:bold">{{ valdAbb.pris }} kr</div>
              </v-flex>
              <v-flex py-2 pl-4 text-xs-left xs2>
                <div class="body-1">Surf/mån.</div>
                <div class="title mb-2">{{ valdAbb.gb }} GB</div>
              </v-flex>
              <v-flex text-xs-right xs3>
                <a v-if="!valdAbb.hasOwnProperty('seniorLink') || radioCheck !== 3" :href="valdAbb.link" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn large round class="teal white--text myBtnHover">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
                <a v-if="valdAbb.hasOwnProperty('seniorLink') && radioCheck === 3" :href="valdAbb.seniorLink" target="_blank" style="text-decoration:none!important" rel="nofollow"><v-btn large round class="teal white--text myBtnHover">Till Butik <v-icon>arrow_right</v-icon></v-btn></a>
              </v-flex>
              <v-flex xs12>
                <div style="margin-top:-15px" class="body-2 ml-2"><v-icon class="info--text" small >info</v-icon> {{ valdAbb.beskrivning }}</div>
              </v-flex>
              </v-layout>
              </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-bottom-sheet>

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
      dialog: false,
      items: [ 'Lägst pris', 'Högst pris' ],
      operatorer: [ 'Tre', 'Tele2', 'Telia', 'Telenor', 'Hallon', 'Comviq', 'Halebop', 'Fello', 'Vimla', 'My Beat' ],
      valdaOperatorer: [],
      lagstPris: [ '99 kr/mån.', '199 kr/mån.', '299 kr/mån.', '399 kr/mån.', '499 kr/mån.', '599 kr/mån.' ],
      MaxPris: [ '199 kr/mån.', '299 kr/mån.', '399 kr/mån.', '499 kr/mån.', '599 kr/mån', '699 kr/mån.' ],
      a1: '',
      a2: '',
      checkbox: false,
      bottomSheet: false,
      valdAbb: '',
      itemsSel: 'Lägst pris',
      surfSlider: 0,
      filterHits: '',
      abbFilterSmall: false,
      idCounter: 0,
      radioCheck: 1,
      abbVy: 0
    }
  },
  watch: {
    itemsSel: function () {
      this.sortFilter('empty')
    },
    valdaOperatorer: function () {
      this.sortFilter('empty')
    },
    surfSlider: function () {
      this.surfFilter('empty')
    },
    a1: function () {
      this.sortFilter('empty')
    },
    a2: function () {
      this.sortFilter('empty')
    }
  },
  methods: {
    test () {
      console.log('test')
    },
    surfFilter () {
      var theArr = ''
      if (this.radioCheck === 1) {
        theArr = 'abbListSimpleCopy'
      } else if (this.radioCheck === 2) {
        theArr = 'studentAbbs'
      } else if (this.radioCheck === 3) {
        theArr = 'seniorAbbs'
      }
      var global = this
      var filterHits = []
      if (this.surfSlider < 15) {
        this.abonnemangLista.forEach(val => {
          for (var i in val) {
            if (val[i].gb < 15) {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 filterHit'
              filterHits.push(val[i])
            } else {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
            }
          }
        })
        this.filterHits = filterHits.length.toString()
      }
      if (this.surfSlider >= 20 && this.surfSlider <= 30) {
        this.abonnemangLista.forEach(val => {
          for (var i in val) {
            if (val[i].gb >= 20 && val[i].gb <= 30) {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 filterHit'
              filterHits.push(val[i])
            } else {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
            }
          }
        })
        this.filterHits = filterHits.length.toString()
      }
      if (this.surfSlider >= 40 && this.surfSlider <= 50) {
        this.abonnemangLista.forEach(val => {
          for (var i in val) {
            if (val[i].gb >= 40 && val[i].gb <= 50) {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 filterHit'
              filterHits.push(val[i])
            } else {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
            }
          }
        })
        this.filterHits = filterHits.length.toString()
      }
      if (this.surfSlider >= 60 && this.surfSlider <= 70) {
        this.abonnemangLista.forEach(val => {
          for (var i in val) {
            if (val[i].gb >= 60 || isNaN(val[i].gb)) {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 filterHit'
              filterHits.push(val[i])
            } else {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
            }
          }
        })
        this.filterHits = filterHits.length.toString()
      }
      if (this.surfSlider >= 80 && this.surfSlider <= 90) {
        this.abonnemangLista.forEach(val => {
          for (var i in val) {
            if (val[i].gb >= 80 || isNaN(val[i].gb)) {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 filterHit'
              filterHits.push(val[i])
            } else {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
            }
          }
        })
        this.filterHits = filterHits.length.toString()
      }
      if (this.surfSlider === 100) {
        this.abonnemangLista.forEach(val => {
          for (var i in val) {
            if (val[i].gb >= 100 || isNaN(val[i].gb)) {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 filterHit'
              filterHits.push(val[i])
            } else {
              val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
            }
          }
        })
        this.filterHits = filterHits.length.toString()
      }
      // Filter för Small screens
      var smallScreenArr = []
      this[theArr].forEach(val => {
        if (this.valdaOperatorer.length > 0) {
          if ((val.gb >= global.surfSlider || isNaN(val.gb)) && this.valdaOperatorer.indexOf(val.corp) !== -1 && this.zeroBindTidCheck.indexOf(val.bindTid) !== -1) {
            smallScreenArr.push(val)
          }
        } else {
          if ((val.gb >= global.surfSlider || isNaN(val.gb)) && this.zeroBindTidCheck.indexOf(val.bindTid) !== -1) {
            smallScreenArr.push(val)
          }
        }
      })
      this.abbListSimple = smallScreenArr
    },
    filter (newArr, r) {
      var count = 0
      var newArrSmall = []
      var arr = []
      var sortedArr = []
      var b
      // var global = this
      var a1Split = Number(this.a1.split(' ')[0])
      var a2Split = Number(this.a2.split(' ')[0])
      for (var h = 0; h < 4; h++) {
        arr.push({})
        sortedArr.push({})
      }
      if (this.valdaOperatorer.length > 0) {
        this.valdaOperatorer.forEach(val => {
          for (var x = 0; x < newArr.length; x++) {
            if (newArr[x].corp === val && (newArr[x].gb >= this.surfSlider || isNaN(newArr[x].gb)) && (newArr[x].pris >= a1Split || this.a1 === '') && (newArr[x].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[x].bindTid) !== -1) {
              newArrSmall.push(newArr[x])
            }
            if (newArr[x].gb >= 60 && newArr[x].corp === val && (newArr[x].pris >= a1Split || this.a1 === '') && (newArr[x].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[x].bindTid) !== -1) {
              b = 'x' + count++
              arr[0][b] = newArr[x]
              newArr[x].newId = ''
            } else if (isNaN(newArr[x].gb) && newArr[x].corp === val && (newArr[x].pris >= a1Split || this.a1 === '') && (newArr[x].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[x].bindTid) !== -1) {
              b = 'x' + count++
              arr[0][b] = newArr[x]
              newArr[x].newId = ''
            } else if (newArr[x].gb >= 40 && newArr[x].corp === val && (newArr[x].pris >= a1Split || this.a1 === '') && (newArr[x].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[x].bindTid) !== -1) {
              b = 'x' + count++
              arr[1][b] = newArr[x]
              newArr[x].newId = ''
            } else if (newArr[x].gb >= 15 && newArr[x].corp === val && (newArr[x].pris >= a1Split || this.a1 === '') && (newArr[x].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[x].bindTid) !== -1) {
              b = 'x' + count++
              arr[2][b] = newArr[x]
              newArr[x].newId = ''
            } else if (newArr[x].gb < 15 && newArr[x].corp === val && (newArr[x].pris >= a1Split || this.a1 === '') && (newArr[x].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[x].bindTid) !== -1) {
              b = 'x' + count++
              arr[3][b] = newArr[x]
              newArr[x].newId = ''
            }
          }
        })
        if (this.valdaOperatorer.length > 1) {
          newArrSmall = []
          newArr.forEach(val => {
            arr.forEach((el, index) => {
              for (var cc in el) {
                if (val.pris === el[cc].pris && el[cc].newId === '') {
                  if (el[cc].gb >= this.surfSlider) {
                    newArrSmall.push(el[cc])
                  }
                  b = 'k' + count++
                  sortedArr[index][b] = el[cc]
                  el[cc].newId = 'ka' + this.idCounter++
                }
              }
            })
          })
        }
      } else {
        for (var a = 0; a < newArr.length; a++) {
          if ((newArr[a].gb >= this.surfSlider || isNaN(newArr[a].gb)) && (newArr[a].pris >= a1Split || this.a1 === '') && (newArr[a].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[a].bindTid) !== -1) {
            newArrSmall.push(newArr[a])
          }
          if ((newArr[a].gb >= 60 || isNaN(newArr[a].gb)) && (newArr[a].pris >= a1Split || this.a1 === '') && (newArr[a].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[a].bindTid) !== -1) {
            b = 'a' + count++
            arr[0][b] = newArr[a]
          } else if (newArr[a].gb >= 40 && (newArr[a].pris >= a1Split || this.a1 === '') && (newArr[a].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[a].bindTid) !== -1) {
            b = 'a' + count++
            arr[1][b] = newArr[a]
          } else if (newArr[a].gb >= 15 && (newArr[a].pris >= a1Split || this.a1 === '') && (newArr[a].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[a].bindTid) !== -1) {
            b = 'a' + count++
            arr[2][b] = newArr[a]
          } else if (newArr[a].gb < 15 && (newArr[a].pris >= a1Split || this.a1 === '') && (newArr[a].pris <= a2Split || this.a2 === '') && this.zeroBindTidCheck.indexOf(newArr[a].bindTid) !== -1) {
            b = 'a' + count++
            arr[3][b] = newArr[a]
          }
        }
      }
      this.abbListSimple = newArrSmall
      if (this.valdaOperatorer.length > 1) {
        this.abonnemangLista = sortedArr
      } else {
        this.abonnemangLista = arr
      }
    },
    sortFilter (r) {
      var theArr = ''
      var global = this
      if (!isNaN(r.val)) {
        if (r.val === 1) {
          theArr = 'abbListSimpleCopy'
        } else if (r.val === 2) {
          theArr = 'studentAbbs'
        } else if (r.val === 3) {
          theArr = 'seniorAbbs'
        }
      } else {
        if (this.radioCheck === 1) {
          theArr = 'abbListSimpleCopy'
        } else if (this.radioCheck === 2) {
          theArr = 'studentAbbs'
        } else if (this.radioCheck === 3) {
          theArr = 'seniorAbbs'
        }
      }
      var prisArr = []
      for (var i = 0; i < this[theArr].length; i++) {
        prisArr.push(this[theArr][i])
      }
      prisArr.sort(function (a, b) {
        return (global.itemsSel === 'Lägst pris' ? a.pris - b.pris : b.pris - a.pris)
      })
      this.filter(prisArr, r)
    },
    openBottomSheet (abb) {
      this.abbListSimpleCopy.forEach(el => {
        if (el.id !== abb.id) {
          el.vald = false
        }
      })
      this.studentAbbs.forEach(val => {
        if (val.id !== abb.id) {
          val.vald = false
        }
      })
      this.seniorAbbs.forEach(val => {
        if (val.id !== abb.id) {
          val.vald = false
        }
      })
      if (abb.vald === true) {
        this.valdAbb = abb
        this.bottomSheet = true
      } else {
        this.bottomSheet = false
      }
    }
  },
  computed: {
    zeroBindTidCheck () {
      return this.checkbox ? [0] : [0, 12, 24]
    },
    loading () {
      return this.studentAbbs === ''
    },
    over1140 () {
      return this.$vuetify.breakpoint.width >= 1140
    },
    abonnemangLista: {
      get () { return this.$store.getters.abonnemangLista },
      set (value) { this.$store.commit('abonnemangListaCommit', value) }
    },
    abbListSimple: {
      get () { return this.$store.getters.abbListSimple },
      set (value) { this.$store.commit('abbListSimpleCommit', value) }
    },
    abbListSimpleCopy: {
      get () { return this.$store.getters.abbListSimpleCopy },
      set (value) { this.$store.commit('abbListSimpleCopyCommit', value) }
    },
    studentAbbs: {
      get () { return this.$store.getters.studentAbbs },
      set (value) { this.$store.commit('studentAbbsCommit', value) }
    },
    studentBigArr: {
      get () { return this.$store.getters.studentBigArr },
      set (value) { this.$store.commit('studentBigArrCommit', value) }
    },
    seniorAbbs: {
      get () { return this.$store.getters.seniorAbbs },
      set (value) { this.$store.commit('seniorAbbsCommit', value) }
    },
    seniorBigArr: {
      get () { return this.$store.getters.seniorBigArr },
      set (value) { this.$store.commit('seniorBigArrCommit', value) }
    }
  },
  mounted () {
    if (this.abbListSimple !== '') {
      this.abbListSimple.forEach(val => {
        if (val.vald === true) {
          this.valdAbb = val
          this.bottomSheet = true
        }
      })
    }
    if (this.abonnemangLista !== '') {
      this.abonnemangLista.forEach(val => {
        for (var i in val) {
          val[i].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
        }
      })
    }
    this.sortFilter('empty')
  },
  created () {
    var global = this
    var fixedArr = []
    var arr = []
    var prisArr = []
    var newArr = []
    var studentArr = []
    var studentBigArr = []
    var seniorArr = []
    var seniorBigArr = []
    var count = 0
    var counter = 0
    var b
    var ungId
    var ungBindId
    var seniorId
    var seniorBindId
    if (this.abonnemangLista === '') {
      Axios.get('https://mobiljakt.firebaseio.com/operatorer.json')
      .then(response => {
        for (var p in response.data) {
          for (var k in response.data[p].abb) {
            fixedArr.push(response.data[p].abb[k])
            response.data[p].abb[k].corp = response.data[p].corp
            response.data[p].abb[k].img = response.data[p].img
            if (response.data[p].hasOwnProperty('imgExtra')) {
              response.data[p].abb[k].imgExtra = response.data[p].imgExtra
            }
            response.data[p].abb[k].name = response.data[p].name
            response.data[p].abb[k].vald = false
            response.data[p].abb[k].id = ''
            if (response.data[p].abb[k].hasOwnProperty('bind12') && response.data[p].abb[k].bind12.pris > 0) {
              fixedArr.push(response.data[p].abb[k].bind12)
              response.data[p].abb[k].bind12.fordel1 = response.data[p].abb[k].fordel1
              response.data[p].abb[k].bind12.corp = response.data[p].corp
              response.data[p].abb[k].bind12.img = response.data[p].img
              response.data[p].abb[k].bind12.name = response.data[p].name
              response.data[p].abb[k].bind12.vald = false
              response.data[p].abb[k].bind12.id = ''
              response.data[p].abb[k].bind12.beskrivning = response.data[p].abb[k].beskrivning
              if (!response.data[p].abb[k].bind12.hasOwnProperty('link')) {
                response.data[p].abb[k].bind12.link = response.data[p].abb[k].link
              }
              if (!response.data[p].abb[k].bind12.hasOwnProperty('gb')) {
                response.data[p].abb[k].bind12.gb = response.data[p].abb[k].gb
              }
            }
            if (response.data[p].corp === 'Telenor' || response.data[p].corp === 'Telia' || response.data[p].corp === 'Tre' || response.data[p].corp === 'Tele2') {
              if (!response.data[p].hasOwnProperty('rabatt')) {
                response.data[p].rabatt = {}
                response.data[p].rabatt.ungdom = {}
              }
              ungId = 'rabatt' + count++
              response.data[p].rabatt.ungdom[ungId] = JSON.parse(JSON.stringify(response.data[p].abb[k]))
              if (response.data[p].abb[k].hasOwnProperty('bind12') && response.data[p].abb[k].bind12.pris > 0) {
                ungBindId = 'rabattBindTid' + count++
                response.data[p].rabatt.ungdom[ungBindId] = JSON.parse(JSON.stringify(response.data[p].abb[k].bind12))
              }
              for (var oo in response.data[p].rabatt.ungdom) {
                switch (response.data[p].corp) {
                  case 'Telenor':
                    response.data[p].rabatt.ungdom[oo].fordel1 = '-50 kr Under 27 år'
                    response.data[p].rabatt.ungdom[oo].name = 'Telenor Ungdom'
                    if (response.data[p].abb[k].pris === response.data[p].rabatt.ungdom[oo].pris) {
                      response.data[p].rabatt.ungdom[oo].pris = (response.data[p].abb[k].pris - 50)
                    }
                    if (response.data[p].abb[k].hasOwnProperty('bind12') && response.data[p].abb[k].bind12.pris > 0 && response.data[p].abb[k].bind12.pris === response.data[p].rabatt.ungdom[oo].pris && response.data[p].rabatt.ungdom[oo].bindTid > 0) {
                      response.data[p].rabatt.ungdom[oo].pris = (response.data[p].abb[k].bind12.pris - 50)
                    }
                    break
                  case 'Telia':
                    response.data[p].rabatt.ungdom[oo].fordel1 = '-50 kr Under 28 år'
                    response.data[p].rabatt.ungdom[oo].name = 'Telia Ungdom'
                    if (response.data[p].abb[k].pris === response.data[p].rabatt.ungdom[oo].pris) {
                      response.data[p].rabatt.ungdom[oo].pris = (response.data[p].abb[k].pris - 50)
                    }
                    if (response.data[p].abb[k].hasOwnProperty('bind12') && response.data[p].abb[k].bind12.pris > 0 && response.data[p].abb[k].bind12.pris === response.data[p].rabatt.ungdom[oo].pris && response.data[p].rabatt.ungdom[oo].bindTid > 0) {
                      response.data[p].rabatt.ungdom[oo].pris = (response.data[p].abb[k].bind12.pris - 50)
                    }
                    break
                  case 'Tre':
                    response.data[p].rabatt.ungdom[oo].fordel1 = '-50 kr Under 27 år'
                    response.data[p].rabatt.ungdom[oo].name = 'Tre Ungdom'
                    if (response.data[p].abb[k].pris === response.data[p].rabatt.ungdom[oo].pris) {
                      response.data[p].rabatt.ungdom[oo].pris = (response.data[p].abb[k].pris - 50)
                    }
                    if (response.data[p].abb[k].hasOwnProperty('bind12') && response.data[p].abb[k].bind12.pris > 0 && response.data[p].abb[k].bind12.pris === response.data[p].rabatt.ungdom[oo].pris && response.data[p].rabatt.ungdom[oo].bindTid > 0) {
                      response.data[p].rabatt.ungdom[oo].pris = (response.data[p].abb[k].bind12.pris - 50)
                    }
                    break
                  case 'Tele2':
                    response.data[p].rabatt.ungdom[oo].fordel1 = '(-20%) StudentPris'
                    response.data[p].rabatt.ungdom[oo].name = 'Tele2 Student'
                    response.data[p].rabatt.ungdom[oo].pris *= 0.8
                    response.data[p].rabatt.ungdom[oo].pris = Number(response.data[p].rabatt.ungdom[oo].pris.toFixed(2))
                    break
                }
              }
            }
            // SLUT PÅ UNGDOMS LOOPEN
            if (response.data[p].corp === 'Telenor' || response.data[p].corp === 'Fello' || response.data[p].corp === 'Vimla' || response.data[p].corp === 'Hallon' || response.data[p].corp === 'Comviq') {
              if (!response.data[p].rabatt.hasOwnProperty('senior')) {
                response.data[p].rabatt.senior = JSON.parse(JSON.stringify(response.data[p].rabatt.ungdom))
              }
              if (response.data[p].corp === 'Telenor') {
                seniorId = 'seniorId' + count++
                response.data[p].rabatt.senior[seniorId] = JSON.parse(JSON.stringify(response.data[p].abb[k]))
                if (response.data[p].abb[k].hasOwnProperty('bind12') && response.data[p].abb[k].bind12.pris > 0) {
                  seniorBindId = 'seniorBindTid' + count++
                  response.data[p].rabatt.senior[seniorBindId] = JSON.parse(JSON.stringify(response.data[p].abb[k].bind12))
                }
              }
              for (var tt in response.data[p].rabatt.senior) {
                switch (response.data[p].corp) {
                  case 'Telenor':
                    response.data[p].rabatt.senior[tt].fordel1 = '30 kr Rabatt (65+)'
                    response.data[p].rabatt.senior[tt].name = 'Telenor Senior'
                    if (response.data[p].abb[k].gb === response.data[p].rabatt.senior[tt].gb && response.data[p].rabatt.senior[tt].bindTid === 0 && response.data[p].abb[k].bindTid === 0) {
                      response.data[p].rabatt.senior[tt].pris = (response.data[p].abb[k].pris - 30)
                    }
                    if (response.data[p].abb[k].hasOwnProperty('bind12') && response.data[p].abb[k].bind12.pris > 0 && response.data[p].abb[k].bind12.gb === response.data[p].rabatt.senior[tt].gb && response.data[p].rabatt.senior[tt].bindTid > 0) {
                      response.data[p].rabatt.senior[tt].pris = (response.data[p].abb[k].bind12.pris - 30)
                    }
                    break
                  case 'Fello':
                    response.data[p].rabatt.senior[tt].fordel1 = 'Senior (55+) Rabatt'
                    response.data[p].rabatt.senior[tt].name = 'Fello Senior'
                    break
                  case 'Vimla':
                    response.data[p].rabatt.senior[tt].fordel1 = 'Senior (55+) Rabatt'
                    response.data[p].rabatt.senior[tt].name = 'FastPris Senior'
                    break
                  case 'Hallon':
                    response.data[p].rabatt.senior[tt].fordel1 = 'Senior (55+) Rabatt'
                    response.data[p].rabatt.senior[tt].name = 'Hallon Senior'
                    break
                  case 'Comviq':
                    response.data[p].rabatt.senior[tt].fordel1 = 'Senior (55+) Rabatt'
                    response.data[p].rabatt.senior[tt].name = 'Comviq Senior'
                    break
                }
              }
            }
            // SLUT PÅ SENIOR LOOPEN
          }
          // TILLBAKA TILL FÖRSTA LOOPEN OCH STYR RABATTERNA
          if (response.data[p].hasOwnProperty('rabatt')) {
            if (response.data[p].rabatt.hasOwnProperty('ungdom')) {
              for (var ff in response.data[p].rabatt.ungdom) {
                response.data[p].rabatt.ungdom[ff].corp = response.data[p].corp
                response.data[p].rabatt.ungdom[ff].img = response.data[p].img
                response.data[p].rabatt.ungdom[ff].vald = false
                response.data[p].rabatt.ungdom[ff].id = ''
                studentArr.push(response.data[p].rabatt.ungdom[ff])
                if (response.data[p].hasOwnProperty('imgExtra')) {
                  response.data[p].rabatt.ungdom[ff].imgExtra = response.data[p].imgExtra
                }
              }
            }
            if (response.data[p].rabatt.hasOwnProperty('senior')) {
              for (var nn in response.data[p].rabatt.senior) {
                response.data[p].rabatt.senior[nn].corp = response.data[p].corp
                response.data[p].rabatt.senior[nn].img = response.data[p].img
                response.data[p].rabatt.senior[nn].vald = false
                response.data[p].rabatt.senior[nn].id = ''
                seniorArr.push(response.data[p].rabatt.senior[nn])
                if (response.data[p].hasOwnProperty('imgExtra')) {
                  response.data[p].rabatt.senior[nn].imgExtra = response.data[p].imgExtra
                }
              }
            }
          }
        }
        // Slut PÅ LOOPARNA
        // SORTERA FRÅN LÄGSTA TILL HÖGSTA PRIS (STUDENT)...
        studentArr.sort((a, b) => {
          return a.pris - b.pris
        })
        studentArr.forEach(el => {
          el.id = 'student' + global.idCounter++
        })
        // SORTERA FRÅN LÄGSTA TILL HÖGSTA PRIS (SENIOR)...
        seniorArr.sort((a, b) => {
          return a.pris - b.pris
        })
        seniorArr.forEach(el => {
          el.id = 'senior' + global.idCounter++
        })
        // FIXA FÄRGERNA FÖR BIG SCREEN...
        fixedArr.forEach(val => {
          prisArr.push(val.pris)
          if (val.corp === 'Telia') {
            val.color = 'white'
            val.color1 = 'justify-center white'
            val.color2 = 'purple--text'
          }
          if (val.corp === 'Tele2') {
            val.color = 'indigo lighten-1'
            val.color1 = 'justify-center indigo lighten-1'
            val.color2 = 'indigo--text'
          }
          if (val.corp === 'Telenor') {
            val.color = 'white'
            val.color1 = 'justify-center white'
            val.color2 = 'white--text'
          }
          if (val.corp === 'Tre') {
            val.color = 'secondary'
            val.color1 = 'justify-center secondary'
            val.color2 = 'secondary--text'
          }
          if (val.corp === 'Comviq') {
            val.color = 'myBeige'
            val.color1 = 'justify-center myBeige'
            val.color2 = 'secondary--text'
          }
          if (val.corp === 'Hallon') {
            val.color = 'red lighten-2'
            val.color1 = 'justify-center red lighten-2'
            val.color2 = 'red--text'
          }
          if (val.corp === 'Halebop') {
            val.color = 'teal lighten-2'
            val.color1 = 'justify-center teal lighten-2'
            val.color2 = 'teal--text'
          }
          if (val.corp === 'Fello') {
            val.color = 'red darken-1'
            val.color1 = 'justify-center red darken-1'
            val.color2 = 'red--text'
          }
        })
        // SORTERA PRIS (LÄGSTA - HÖGSTA)
        prisArr.sort(function (a, b) {
          return a - b
        })
        for (var e = 0; e < prisArr.length; e++) {
          fixedArr.forEach(val => {
            if (val.pris === prisArr[e] && val.id === '') {
              newArr.push(val)
              counter++
              val.id = counter++
            }
          })
        }
        // Assign Abb's for Small Screens
        global.abbListSimple = newArr
        global.abbListSimpleCopy = newArr
        // Fixa Big Screens Abb's BELOW
        for (var i = 0; i < 4; i++) {
          arr.push({})
          studentBigArr.push({})
          seniorBigArr.push({})
        }
        for (var x = 0; x < newArr.length; x++) {
          if (newArr[x].gb >= 60 || isNaN(newArr[x].gb)) {
            b = 'x' + count++
            arr[0][b] = newArr[x]
            arr[0][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (newArr[x].gb >= 40) {
            b = 'x' + count++
            arr[1][b] = newArr[x]
            arr[1][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (newArr[x].gb >= 15) {
            b = 'x' + count++
            arr[2][b] = newArr[x]
            arr[2][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (newArr[x].gb < 15) {
            b = 'x' + count++
            arr[3][b] = newArr[x]
            arr[3][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          }
        }
        // Assign The Abb Arrays..
        global.abonnemangLista = arr
        // Fixa ihop student och senior abben BELOW FÖR BIG SCREENS
        studentArr.forEach(val => {
          if (val.corp === 'Telia') {
            val.color = 'white'
            val.color1 = 'justify-center white'
            val.color2 = 'purple--text'
          }
          if (val.corp === 'Tele2') {
            val.color = 'indigo lighten-1'
            val.color1 = 'justify-center indigo lighten-1'
            val.color2 = 'indigo--text'
          }
          if (val.corp === 'Telenor') {
            val.color = 'white'
            val.color1 = 'justify-center white'
            val.color2 = 'white--text'
          }
          if (val.corp === 'Tre') {
            val.color = 'secondary'
            val.color1 = 'justify-center secondary'
            val.color2 = 'secondary--text'
          }
          if (val.corp === 'Comviq') {
            val.color = 'myBeige'
            val.color1 = 'justify-center myBeige'
            val.color2 = 'secondary--text'
          }
          if (val.corp === 'Hallon') {
            val.color = 'red lighten-2'
            val.color1 = 'justify-center red lighten-2'
            val.color2 = 'red--text'
          }
          if (val.corp === 'Halebop') {
            val.color = 'teal lighten-2'
            val.color1 = 'justify-center teal lighten-2'
            val.color2 = 'teal--text'
          }
          if (val.corp === 'Fello') {
            val.color = 'red darken-1'
            val.color1 = 'justify-center red darken-1'
            val.color2 = 'red--text'
          }
        })
        seniorArr.forEach(val => {
          if (val.corp === 'Telenor') {
            val.color = 'white'
            val.color1 = 'justify-center white'
            val.color2 = 'white--text'
          }
          if (val.corp === 'Comviq') {
            val.color = 'myBeige'
            val.color1 = 'justify-center myBeige'
            val.color2 = 'secondary--text'
          }
          if (val.corp === 'Hallon') {
            val.color = 'red lighten-2'
            val.color1 = 'justify-center red lighten-2'
            val.color2 = 'red--text'
          }
          if (val.corp === 'Fello') {
            val.color = 'red darken-1'
            val.color1 = 'justify-center red darken-1'
            val.color2 = 'red--text'
          }
        })
        studentArr.forEach(val => {
          if (val.gb >= 60 || isNaN(val.gb)) {
            b = 'BS' + count++
            studentBigArr[0][b] = val
            studentBigArr[0][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (val.gb >= 40) {
            b = 'BS' + count++
            studentBigArr[1][b] = val
            studentBigArr[1][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (val.gb >= 15) {
            b = 'BS' + count++
            studentBigArr[2][b] = val
            studentBigArr[2][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (val.gb < 15) {
            b = 'BS' + count++
            studentBigArr[3][b] = val
            studentBigArr[3][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          }
        })
        seniorArr.forEach(val => {
          if (val.gb >= 60 || isNaN(val.gb)) {
            b = 'BS' + count++
            seniorBigArr[0][b] = val
            seniorBigArr[0][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (val.gb >= 40) {
            b = 'BS' + count++
            seniorBigArr[1][b] = val
            seniorBigArr[1][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (val.gb >= 15) {
            b = 'BS' + count++
            seniorBigArr[2][b] = val
            seniorBigArr[2][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          } else if (val.gb < 15) {
            b = 'BS' + count++
            seniorBigArr[3][b] = val
            seniorBigArr[3][b].bigCards = 'text-xs-center mr-2 ml-2 mb-3 bigCards'
          }
        })
        global.studentAbbs = studentArr
        global.studentBigArr = studentBigArr
        global.seniorAbbs = seniorArr
        global.seniorBigArr = seniorBigArr
      })
      .catch(e => {
        console.log(e.message)
      })
    }
  }
}
</script>


<style scoped>
.bigAbbStyle {
  box-shadow: 2px 2px 10px grey;
  border-radius: 10px;
  border-bottom: 2px solid grey;
  background: #fff;
}
.bigAbbStyle:hover {
  box-shadow: 4px 4px 20px grey;
  border-radius: 10px;
  border-bottom: 2px solid orange;
}
.myBeige {
  background: #d9cab6;
}
.valdAbb {
  border:1px solid lightgrey;
  border-radius:10px;
  box-shadow:2px 2px 10px grey;
  background: white;
}
@media only screen and (min-width:1904px){.valdAbb{margin-left:120px;margin-right:120px}}
.bigCards {
  box-shadow: 2px 4px 15px grey;
}
.filterHit {
  box-shadow: 10px 10px 20px grey;
  border: 5px solid greenyellow;
}
.bigCards:hover {
  box-shadow: 2px 4px 25px grey;
}
.abbCardSmall {
  border: 1px solid lightgrey;
  border-radius: 8px;
  background: #fff;
  box-shadow: 2px 4px 15px grey;
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
