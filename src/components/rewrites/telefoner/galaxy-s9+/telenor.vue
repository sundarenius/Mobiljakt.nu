<template>
    <div>
        <v-container>
            <v-layout :py-5="this.$vuetify.breakpoint.mdAndUp" :py-3="this.$vuetify.breakpoint.smAndDown">
                <v-flex text-xs-center xs12>
                    <div :class="{'display-2' : this.$vuetify.breakpoint.mdAndUp, 'headline' : this.$vuetify.breakpoint.smAndDown }">Tack för att du använder Mobiljakt.nu!</div>
                    <div :class="{'display-1 mt-2' : this.$vuetify.breakpoint.mdAndUp, 'body-2 mt-2' : this.$vuetify.breakpoint.smAndDown }">Du blir nu vidareskickad till <span class="success--text">Telenor</span>...</div>
                    <v-progress-circular
                    :size="120"
                    :width="7"
                    color="purple"
                    indeterminate
                    class="my-5"
                    ></v-progress-circular>
                    <div class="body-2 pt-4">Fortarande kvar? <a class="primary--text" href="https://track.adtraction.com/t/t?a=1086470696&as=1250933920&t=2&tk=1&url=https://www.telenor.se/handla/mobiler/samsung/galaxy-s9-plus/">Klicka här för att komma vidare...</a></div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  mounted () {
    window.location.replace('https://track.adtraction.com/t/t?a=1086470696&as=1250933920&t=2&tk=1&url=https://www.telenor.se/handla/mobiler/samsung/galaxy-s9-plus/')
  }
}
</script>
