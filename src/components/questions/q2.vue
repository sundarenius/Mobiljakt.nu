<template>
  <div>
    <v-layout class="hidden-xs-only" style="margin-top:-30px" mb-4 justify-center row>
      <v-flex mr-3 text-xs-center class="qPast" xs1>
        <div class="body-2">1 <v-icon class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qAktuell" xs1>
        <div class="body-2">2</div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qComing" xs1>
        <div class="body-2">3</div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qComing" xs1>
        <div class="body-2">4</div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qComing" xs1>
        <div class="body-2">5</div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qComing" xs1>
        <div class="body-2">6</div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qComing" xs1>
        <div class="body-2">7</div>
      </v-flex>
      <v-flex mr-2 text-xs-center class="qComing" xs1>
        <div class="body-2">8</div>
      </v-flex>
    </v-layout>

    <v-layout justify-center style="margin-top:-40px" mb-4 class="hidden-sm-and-up" row wrap>
      <v-flex text-xs-center mr-3 class="qPast" xs2>
        <div class="body-2">1 <v-icon small class="white--text">check</v-icon></div>
      </v-flex>
      <v-flex text-xs-center mr-3 class="qAktuellSmall" xs2>
        <div class="body-2">2</div>
      </v-flex>
      <v-flex text-xs-center mr-3 class="qComing" xs2>
        <div class="body-2">3</div>
      </v-flex>
      <v-flex text-xs-center class="qComing" xs2>
        <div class="body-2">4</div>
      </v-flex>
      <v-flex mt-2 text-xs-center mr-3 class="qComing" xs2>
        <div class="body-2">5</div>
      </v-flex>
      <v-flex mt-2 text-xs-center mr-3 class="qComing" xs2>
        <div class="body-2">6</div>
      </v-flex>
      <v-flex mt-2 text-xs-center mr-3 class="qComing" xs2>
        <div class="body-2">7</div>
      </v-flex>
      <v-flex mt-2 text-xs-center class="qComing" xs2>
        <div class="body-2">8</div>
      </v-flex>
    </v-layout>

      <section>
        <div class="text-xs-center headline py-2">Vilket av följande varumärken föredrar du?</div>
        <ul style="max-width:600px">
  <li>
    <input @click="disableNextBtn(), guidePoints(10)" type="radio" id="f-option" name="selector">
    <label for="f-option">Apple</label>
    
    <div class="check"></div>
  </li>
  
  <li>
    <input @click="disableNextBtn(), guidePoints(100)" type="radio" id="s-option" name="selector">
    <label for="s-option">Samsung</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
  
  <li>
    <input @click="disableNextBtn" type="radio" id="t-option" name="selector">
    <label for="t-option">Spelar ingen roll / Ingen av ovanstående</label>
    
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
    guidePoints (par) {
      this.$store.state.guidePoints = par
      console.log(this.$store.state.guidePoints)
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
  width: 90px;
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
  width: 350px;
}
.qComing {
  background: grey;
  color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
}
</style>
