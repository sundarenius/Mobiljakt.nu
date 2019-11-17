<template>
<div>
  <div v-if="this.$vuetify.breakpoint.mdAndUp">
    <v-bottom-sheet v-model="bigDialog" :hide-overlay="false">
        <v-layout style="background:#f1f1f1;margin-top:-25px;margin-bottom:-20px" justify-center row>
          <v-btn @click="bigDialog = false" icon style="position:absolute;left:0">
            <v-icon x-large>keyboard_arrow_down</v-icon>
          </v-btn>
          <v-flex class="compareBigCard white" :key="phone.name" v-for="phone in addedToCompare" my-5 mx-3 xs3>
            <v-layout wrap row>
              <v-flex text-xs-center xs12>
                <img :src="phone.img[0]" height="140px" alt="Mobil">
              </v-flex>
              <v-flex px-2 mt-4 xs12>
                <div class="title">{{ phone.name }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs6>
                <div class="body-2">Skärmstorlek:</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs6>
                <div class="body-2">{{ phone.screen }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs6>
                <div class="body-2">Batteri:</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs6>
                <div class="body-2">{{ phone.batteri }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs6>
                <div class="body-2">Kamera</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs6>
                <div class="body-2">{{ phone.kamera }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs6>
                <div class="body-2">Skärmupplösning</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs6>
                <div class="body-2">{{ phone.skarmupplosning }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs6>
                <div class="body-2">Operativsystem</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs6>
                <div class="body-2">{{ phone.operativsystem }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs6>
                <div class="body-2">Lagring</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs6>
                <div class="body-2">{{ phone.lagring }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs10>
                <div class="body-2">{{ phone.fordel1 }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs2>
                <div class="body-2"><v-icon class="success--text">check</v-icon></div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" px-2 mt-3 xs10>
                <div class="body-2">{{ phone.fordel2 }}</div>
              </v-flex>
              <v-flex style="border-bottom:1px solid lightgrey" text-xs-right px-2 mt-3 xs2>
                <div class="body-2"><v-icon class="success--text">check</v-icon></div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
    </v-bottom-sheet>
    </div>
        <!-- ******************** MOBIL VERSION BÖRJAR HÄR ************************** -->
        <div v-if="this.$vuetify.breakpoint.smAndDown">
        <v-dialog v-model="bigDialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
          <v-toolbar class="secondary">
            <v-toolbar-title>
              <div class="title white--text">Markerade Telefoner</div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="bigDialog = false" icon>
            <v-icon x-large class="white--text">keyboard_arrow_down</v-icon>
          </v-btn>
          </v-toolbar>
        <v-card>
        <v-container>
        <v-layout justify-center class="hidden-md-and-up" row wrap>
          <v-flex :key="phone.name" v-for="phone in addedToCompare" class="jmfrSmall" my-2 xs12>
            <v-layout align-center row wrap>
              <v-flex text-xs-center style="border-right:1px solid lightgrey" xs3>
              <img :src="phone.img[0]" height="120px" alt="Mobil">
              </v-flex>
              <v-flex my-2 ml-2 xs8>
                <div style="border-bottom:1px solid lightgrey" class="body-2 mb-2">
                  <div style="margin-bottom:-22px" class="pl-2 text-xs-left">Skärm (Tum):</div>
                  <div class="pr-2 body-1 text-xs-right">{{ phone.screen }}</div>
                </div>
                <div style="border-bottom:1px solid lightgrey" class="body-2 mb-2">
                  <div style="margin-bottom:-22px" class="pl-2 text-xs-left">Batteri:</div>
                  <div class="pr-2 body-1 text-xs-right">{{ phone.batteri }}</div>
                </div>
                <div style="border-bottom:1px solid lightgrey" class="body-2 mb-2">
                  <div style="margin-bottom:-22px" class="pl-2 text-xs-left">Vikt:</div>
                  <div class="pr-2 body-1 text-xs-right">{{ phone.vikt }}</div>
                </div>
                <div style="border-bottom:1px solid lightgrey" class="body-2 mb-2">
                  <div style="margin-bottom:-22px" class="pl-2 text-xs-left">Kamera:</div>
                  <div class="pr-2 body-1 text-xs-right">{{ phone.kamera }}</div>
                </div>
                <div style="border-bottom:1px solid lightgrey" class="body-2 mb-2">
                  <div style="margin-bottom:-22px" class="pl-2 text-xs-left">Skärmupplösning:</div>
                  <div class="pr-2 body-1 text-xs-right">{{ phone.skarmupplosning }}</div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    </div>

  <v-footer v-show="bottomCompare" class="compareBottom secondary white--text" fixed>
      <p class="body-2 ml-4 title" style="margin-top:15px">{{ bottomCompareText }}</p>
      <v-btn @click="bigDialog = true" style="height:34px!important" small round class="primary ml-4">Jämför nu <v-icon>keyboard_arrow_up</v-icon></v-btn>
      <v-btn @click="Avmarkera" small flat outline round class="accent ml-4 hidden-xs-only">Avmarkera alla</v-btn>
      <v-btn @click="Avmarkera" class="primary hidden-sm-and-up" outline small fab><v-icon>close</v-icon></v-btn>
  </v-footer>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      bigDialog: false
    }
  },
  methods: {
    Avmarkera () {
      return this.$store.commit('Avmarkera')
    }
  },
  computed: {
    bottomCompare () {
      return this.$store.state.bottomCompare
    },
    bottomCompareText () {
      return this.$store.state.bottomCompareText
    },
    dialog () {
      return this.$store.state.dialog
    },
    addedToCompare () {
      return this.$store.state.addedToCompare
    }
  }
}
</script>


<style scoped>
.jmfrSmall {
  box-shadow: 2px 2px 10px grey;
  border-radius: 5px;
}
.compareBigCard {
  padding: 5px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 2px 2px 10px grey;
}
.compareBottom {
    height: 50px!important;
}
.btn--floating.btn--small {
  height: 35px !important;
  width: 35px !important;
}
</style>

