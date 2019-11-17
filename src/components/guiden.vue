<template>
  <div>
    <section v-if="!showResult" class="guideSection py-5">
      <v-container class="maxWidthContent">
        <v-btn v-if="false" @click="test">TEST</v-btn>
        <v-layout align-center my-5 justify-center row wrap>
          <div v-if="q.zero">
          <v-flex text-xs-center xs12>
          <h1 :class="{ 'display-3' : this.$vuetify.breakpoint.mdAndUp, 'display-1' : this.$vuetify.breakpoint.smAndDown }" style="font-weight:bold">Välkommen till Mobilguiden!</h1>
          </v-flex>
          <v-flex text-xs-center xs12>
          <v-divider class="my-3 white"></v-divider>
          </v-flex>
          <v-flex text-xs-center xs12>
          <p class="subheading" style="font-weight:bold">Mobilguiden består av ett antal frågor med 2 - 3 alternativ var, efter guiden så får du ett resultat med matchande produkter!</p>
          </v-flex>
          <v-flex mt-4 text-xs-center xs12>
            <v-btn @click="nextQ" large class="success title">Starta! <v-icon right>keyboard_arrow_right</v-icon></v-btn>
          </v-flex>
          </div>
          <transition name="qfade" mode="out-in">
          <div v-if="q.one">
            <q1></q1>
          <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
          </v-flex>
          </div>
          </transition>
          <transition name="qfade" mode="out-in">
          <div v-if="q.two">
            <q2 v-if="!q1Stats"></q2>
            <q2Abb v-if="q1Stats"></q2Abb>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
          </div>
          </transition>
          <transition name="qfade" mode="out-in">
          <div v-if="q.three">
            <q3 v-if="!q1Stats"></q3>
            <q3Abb v-if="q1Stats"></q3Abb>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
          </div>
          </transition>
          <transition name="qfade" mode="out-in">
          <div v-if="q.four">
            <q4 v-if="!q1Stats"></q4>
            <q4Abb v-if="q1Stats"></q4Abb>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
          </div>
          </transition>
          <transition name="qfade" mode="out-in">
          <div v-if="q.five">
            <q5 v-if="!q1Stats"></q5>
            <q5Abb v-if="q1Stats"></q5Abb>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
          </div>
          </transition>
          <transition name="qfade" mode="out-in">
          <div v-if="q.six">
            <div v-if="!q1Stats">
            <q6></q6>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
            </div>
            <div v-if="q1Stats">
            <q6Abb></q6Abb>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
            </div>
          </div>
          </transition>
          <transition name="qfade" mode="out-in">
          <div v-if="q.seven && !q1Stats">
            <q7></q7>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
          </div>
          </transition>
          <transition name="qfade" mode="out-in">
          <div v-if="q.eight && !q1Stats">
            <q8></q8>
            <v-flex mt-4 text-xs-center xs12>
              <v-btn @click="restart" :disabled="!disableNextBtn" small round class="success title">Starta om <v-icon right>restore</v-icon></v-btn>
            </v-flex>
          </div>
          </transition>
        </v-layout>
      </v-container>
    </section>
    <section>
      <transition name="qfade" mode="out-in">
          <results v-if="(q.seven && q1Stats) || (showResult && q1Stats)"></results>
      </transition>
    </section>
    <section>
      <transition name="qfade" mode="out-in">
        <results v-if="(q.nine && !q1Stats) || (showResult && !q1Stats)"></results>
      </transition>
    </section>
    <!-- Info Sektionen börjar här -->
    <section class="white">
      <v-container>
        <v-layout justify-center py-5 row wrap>
          <v-flex pb-5 text-xs-center xs12>
            <div class="display-1">Operatörer vi jämför...</div>
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img src="https://mobiljakt.nu/images/tele2.png" width="90px" alt="Logga Tele2">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img src="https://mobiljakt.nu/images/Telenor-logga.png" width="90px" alt="Logga Telenor">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img src="https://mobiljakt.nu/images/telia.png" width="90px" alt="Logga Telia">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img style="margin-top:8px" src="https://mobiljakt.nu/images/comviq.png" width="90px" alt="Logga Comviq">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img style="margin-top:8px" src="https://mobiljakt.nu/images/halebop.png" width="90px" alt="Logga Halebop">
          </v-flex>
          <v-flex class="hidden-sm-and-down" style="visibility:hidden" xs12>--</v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img style="margin-top:-12px!important" src="https://mobiljakt.nu/images/mybeat.jpg" width="44px" alt="Logga My Beat">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img style="margin-top:3px" src="https://mobiljakt.nu/images/hallon.png" width="90px" alt="Logga Hallon">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img style="margin-top:-5px" src="https://mobiljakt.nu/images/tre-logga.png" width="35px" alt="Logga Tre">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img style="margin-top:-8px" src="https://mobiljakt.nu/images/fello.png" width="80px" alt="Logga Fello">
          </v-flex>
          <v-flex pb-2 text-xs-center xs4 md2>
            <img src="https://mobiljakt.nu/images/vimla.png" width="90px" alt="Logga Vimla">
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-layout py-5 justify-center row wrap>
          <v-flex text-xs-center xs12>
            <div class="display-1 pb-5">Hur det fungerar...</div>
          </v-flex>
          <v-flex :class="{ 'py-4' : this.$vuetify.breakpoint.smAndDown }" px-3 text-xs-center xs12 md4>
            <img class="pb-3" src="https://mobiljakt.nu/images/listicon.png" width="100px" alt="Jämför mobiler">
            <div class="title">1. Gå igenom frågorna</div>
            <div class="body-1 pt-3">
              Guiden består av 5 - 8 frågor med tre alternativ var. Frågorna täcker de viktigaste och vanligaste behoven.
            </div>
          </v-flex>
          <v-flex :class="{ 'py-4' : this.$vuetify.breakpoint.smAndDown }" px-3 text-xs-center xs12 md4>
            <img class="pb-3" src="https://mobiljakt.nu/images/resulticon.png" width="100px" alt="Resultat">
            <div class="title">2. Gör ditt val</div>
            <div class="body-1 pt-3">
              Välj det alternativet som matchar dina personliga preferenser bäst, och jämför sedan dina matchningar.
            </div>
          </v-flex>
          <v-flex :class="{ 'py-4' : this.$vuetify.breakpoint.smAndDown }" px-3 text-xs-center xs12 md4>
            <img class="pb-3" src="https://mobiljakt.nu/images/success-icon.png" width="100px" alt="Beställ">
            <div class="title">3. Gör beställningen</div>
            <div class="body-1 pt-3">
              Gör ditt val och klicka på “Beställ” för att komma till operatörens hemsida och slutför din beställning.
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section class="primary">
      <v-container>
        <v-layout py-5 class="white--text" row wrap>
          <v-flex pb-5 xs12 text-xs-center>
            <div class="display-1"><v-icon class="white--text mr-3" x-large>question_answer</v-icon> Frågor &amp; Svar</div>
          </v-flex>
          <v-flex :pr-5="this.$vuetify.breakpoint.mdAndUp" xs12 md6>
            <div class="title py-3">Kan jag ångra en beställning?</div>
            <div class="body-1">
              Svar: Ja, du har enligt distansavtalslagen alltid rätt till minst 14 dagars ångerrätt när du handlar över internet. Ibland erbjuds även en längre ångerrätt eller “testperiod” av operatörerna.
            </div>
            <div class="title py-3">Hur kan ni matcha mig med rätt produkt??</div>
            <div class="body-1">
              Svar: Vi har alla marknadens priser och erbjudanden registrerat i vår databas, och baserat på dina svar och behov kan vi ta fram de bäst matchande produkterna för dig.
            </div>
            <div class="title py-3">Hur lång tid tar det innan jag får svar?</div>
            <div class="body-1">
              Svar: Du får svaret direkt, eller inom åtminstone inom några sekunder på din skärm.
            </div>
          </v-flex>
          <v-flex xs12 :pl-5="this.$vuetify.breakpoint.mdAndUp" md6>
            <div class="title py-3">Gör jag beställning hos mobiljakt.nu?</div>
            <div class="body-1">
              Svar: Nej, <em>mobiljakt.nu</em> påverkar varken ditt pris till det bättre (för tillfället) eller sämre. Vi är en oberoende mellanhand som jämför alla operatörers priser åt dig.
            </div>
            <div class="title py-3">Hur många samarbeten har ni?</div>
            <div class="body-1">
              Svar: Vi samarbetar me de mest etablerade operatörerna i Sverige, i dagsläget har vi samarbete med Telia, Tre, Telenor, Tele2, Comviq, Halebop, Vimla, Hallon, Fello och My Beat.
            </div>
            <div class="title py-3">Kan man göra flera beställningar?</div>
            <div class="body-1">
              Svar: Ja självklart, du kan dock bara göra en beställning åt gången över nätet. Beställ en telefon och gör sedan om proceduren med samma telefon eller en ny telefon/abonnemang.
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>
import q1 from '@/components/questions/q1'
import q2 from '@/components/questions/q2'
import q3 from '@/components/questions/q3'
import q4 from '@/components/questions/q4'
import q5 from '@/components/questions/q5'
import q6 from '@/components/questions/q6'
import q7 from '@/components/questions/q7'
import q8 from '@/components/questions/q8'
import q2Abb from '@/components/questions/q2Abb'
import q3Abb from '@/components/questions/q3Abb'
import q4Abb from '@/components/questions/q4Abb'
import q5Abb from '@/components/questions/q5Abb'
import q6Abb from '@/components/questions/q6Abb'
import Results from '@/components/questions/results'

export default {
  components: {
    'q1': q1,
    'q2': q2,
    'q3': q3,
    'q4': q4,
    'q5': q5,
    'q6': q6,
    'q7': q7,
    'q8': q8,
    'q2Abb': q2Abb,
    'q3Abb': q3Abb,
    'q4Abb': q4Abb,
    'q5Abb': q5Abb,
    'q6Abb': q6Abb,
    'results': Results
  },
  data () {
    return {
      q: { zero: true, one: false, two: false, three: false, four: false, five: false, six: false, seven: false, eight: false, nine: false },
      count: 0,
      nextCount: 0
    }
  },
  watch: {
    disableNextBtn: function () {
      this.nextCount++
      if (this.nextCount === 1) {
        this.nextQ()
      } else {
        this.nextCount = 0
      }
    }
  },
  computed: {
    disableNextBtn: {
      get () { return this.$store.getters.disableNextBtnGetter },
      set (value) { this.$store.commit('disableNextBtnCommit', value) }
    },
    q1Stats () {
      return this.$store.state.q1Stats
    },
    showResult () {
      return this.$store.state.showResult
    }
  },
  methods: {
    restart () {
      for (var i in this.q) {
        this.q[i] = false
      }
      this.count = 0
      this.q.zero = true
    },
    nextQ () {
      var a
      var b
      this.count++
      if (this.count === 1) {
        a = 'zero'
        b = 'one'
      } else if (this.count === 2) {
        a = 'one'
        b = 'two'
      } else if (this.count === 3) {
        a = 'two'
        b = 'three'
      } else if (this.count === 4) {
        a = 'three'
        b = 'four'
      } else if (this.count === 5) {
        a = 'four'
        b = 'five'
      } else if (this.count === 6) {
        a = 'five'
        b = 'six'
      } else if (this.count === 7) {
        a = 'six'
        b = 'seven'
      } else if (this.count === 8) {
        a = 'seven'
        b = 'eight'
      } else if (this.count === 9) {
        a = 'eight'
        b = 'nine'
      }
      this.q[a] = false
      this.q[b] = true
    }
  }
}
</script>


<style>
.container ul{
  list-style: none;
  margin: 0;
  padding: 0;
	overflow: auto;
}

ul li{
  color: #fff;
  display: block;
  position: relative;
  float: left;
  width: 100%;
  height: 100px;
	border-bottom: 1px solid #333;
}

ul li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

ul li label{
  display: block;
  position: relative;
  font-weight: 300;
  font-size: 1.35em;
  padding: 25px 25px 25px 80px;
  margin: 10px auto;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
  transition: 0ms;
}

ul li:hover label{
	color: #FFFFFF;
}

ul li .check{
  display: block;
  position: absolute;
  border: 5px solid #AAAAAA;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  top: 30px;
  left: 20px;
	z-index: 5;
	transition: border .25s linear;
	-webkit-transition: border .25s linear;
}

ul li:hover .check {
  border: 5px solid #FFFFFF;
}

ul li .check::before {
  display: block;
  position: absolute;
	content: '';
  border-radius: 100%;
  height: 13px;
  width: 13px;
  top: 1px;
	left: 1px;
  margin: auto;
	transition: background 0.25s linear;
	-webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check {
  border: 5px solid #0DFF92;
}

input[type=radio]:checked ~ .check::before{
  background: #0DFF92;
}

input[type=radio]:checked ~ label{
  color: #0DFF92;
}

.signature {
	margin: 10px auto;
	padding: 10px 0;
	width: 100%;
}

.signature{
	text-align: center;
	font-family: Helvetica, Arial, Sans-Serif;
	font-size: 0.85em;
	color: #AAAAAA;
}

.signature .much-heart{
	display: inline-block;
	position: relative;
	margin: 0 4px;
	height: 10px;
	width: 10px;
	background: #AC1D3F;
	border-radius: 4px;
	-ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.signature .much-heart::before, 
.signature .much-heart::after {
	  display: block;
  content: '';
  position: absolute;
  margin: auto;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: #AC1D3F;
  top: -4px;
}

.signature .much-heart::after {
	bottom: 0;
	top: auto;
	left: -4px;
}

.signature a {
	color: #AAAAAA;
	text-decoration: none;
	font-weight: bold;
}

.guideSection {
  background: linear-gradient(0deg,#c59dde, #692294,#3b0f58,#2d0944) !important;
  color: white;
}
.qfade-enter-active, .component-qfade-leave-active {
  transition: opacity 2.0s ease;
}
.qfade-enter, .component-qfade-leave-to {
  opacity: 0;
}
</style>
