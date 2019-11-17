<template>
  <div>
    <v-layout class="hidden-xs-only" style="margin-top:-30px" mb-4 justify-center row>
      <v-flex mr-3 text-xs-center class="qAktuell" xs1>
        <div class="body-2">1</div>
      </v-flex>
      <v-flex mr-3 text-xs-center class="qComing" xs1>
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
      <v-flex style="background:#000!important" mr-3 text-xs-center class="qComing" xs1>
        <div class="body-2">7</div>
      </v-flex>
      <v-flex style="background:#000!important" mr-2 text-xs-center class="qComing" xs1>
        <div class="body-2">8</div>
      </v-flex>
    </v-layout>

    <v-layout justify-center style="margin-top:-40px" mb-4 class="hidden-sm-and-up" row wrap>
      <v-flex text-xs-center mr-3 class="qAktuellSmall" xs2>
        <div class="body-2">1</div>
      </v-flex>
      <v-flex text-xs-center mr-3 class="qComing" xs2>
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
      <v-flex style="background:#000!important" mt-2 text-xs-center mr-3 class="qComing" xs2>
        <div class="body-2">7</div>
      </v-flex>
      <v-flex style="background:#000!important" mt-2 text-xs-center class="qComing" xs2>
        <div class="body-2">8</div>
      </v-flex>
    </v-layout>

      <section>
        <div class="text-xs-center headline py-2">Vad av följande är du ute efter?</div>
        <ul style="max-width:600px">
  <li>
    <input @click="disableNextBtn(), q1Stats(0)" type="radio" id="f-option" name="selector">
    <label for="f-option">Ny mobil med abonnemang</label>
    
    <div class="check"></div>
  </li>
  
  <li>
    <input @click="disableNextBtn(), q1Stats(1)" type="radio" id="s-option" name="selector">
    <label for="s-option">Bara abonnemang</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
</ul>
      </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      q1Msg: 'hejsan'
    }
  },
  methods: {
    disableNextBtn () {
      return this.$store.getters.changeNextBtnGetter
    },
    q1Stats (nr) {
      return this.$store.commit('q1StatsMut', nr)
    }
  },
  computed: {
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
