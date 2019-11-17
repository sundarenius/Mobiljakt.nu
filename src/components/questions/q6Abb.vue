<template>
  <div>
    <v-layout class="hidden-xs-only" style="margin-top:-30px" mb-4 justify-center row>
      <v-flex mr-3 text-xs-center class="qPast" xs2>
        <div class="body-2">1 <v-icon class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qPast" xs2>
        <div class="body-2">2 <v-icon class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qPast" xs2>
        <div class="body-2">3 <v-icon class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qPast" xs2>
        <div class="body-2">4 <v-icon class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qPast" xs2>
        <div class="body-2">5 <v-icon class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex text-xs-center class="qAktuell" xs2>
        <div class="body-2">6</div>
      </v-flex>
    </v-layout>

    <v-layout justify-center style="margin-top:-40px" mb-4 class="hidden-sm-and-up" row wrap>
      <v-flex text-xs-center mr-2 class="qPast" xs3>
        <div class="body-2">1 <v-icon small class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex text-xs-center mr-2 class="qPast" xs3>
        <div class="body-2">2 <v-icon small class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex text-xs-center class="qPast" xs3>
        <div class="body-2">3 <v-icon small class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mt-2 text-xs-center mr-2 class="qPast" xs3>
        <div class="body-2">4 <v-icon small class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mt-2 text-xs-center mr-2 class="qPast" xs3>
        <div class="body-2">5 <v-icon small class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mt-2 text-xs-center class="qAktuellSmall" xs3>
        <div class="body-2">6</div>
      </v-flex>
    </v-layout>

      <section style="max-width:600px">
        <div class="text-xs-center headline py-2">Vad tycker du om abonnemang med bindningstid?</div>
        <ul>
  <li>
    <input @click="disableNextBtn(), guideBind(1)" type="radio" id="f-option" name="selector">
    <label for="f-option">Nej tack!</label>
    
    <div class="check"></div>
  </li>
  
  <li>
    <input @click="disableNextBtn(), guideBind(0)" type="radio" id="s-option" name="selector">
    <label for="s-option">Okej, om det blir billigare</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
</ul>
      </section>

  </div>
</template>

<script>
export default {
  methods: {
    disableNextBtn () {
      return this.$store.getters.changeNextBtnGetter
    },
    guideBind (par) {
      this.$store.state.guideBind = par
    }
  },
  mounted () {
    this.$store.state.disableNextBtn = true
  }
}
</script>

<style scoped>
.qAktuellSmall {
  background: lightgreen;
  color: black;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  width: 0px;
}
.qPast {
  background: green;
  color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
}
.qAktuell {
  background: lightgreen;
  color: black;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  width: 0px;
}
.qComing {
  background: grey;
  color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  height: 22px;
}
</style>
