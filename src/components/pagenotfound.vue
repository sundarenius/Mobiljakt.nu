<template>
    <div>
        <v-container>
            <v-layout :py-5="this.$vuetify.breakpoint.mdAndUp" :py-3="this.$vuetify.breakpoint.smAndDown">
                <v-flex text-xs-center xs12>
                    <div :class="{'display-2' : this.$vuetify.breakpoint.mdAndUp, 'headline' : this.$vuetify.breakpoint.smAndDown }">Opps, verkar som att du hamnat på lite avvägar nu!</div>
                    <div :class="{'display-1 mt-2' : this.$vuetify.breakpoint.mdAndUp, 'body-2 mt-2' : this.$vuetify.breakpoint.smAndDown }">Vi skickar dig nu till startsidan...</div>
                    <v-progress-circular
                    :size="120"
                    :width="7"
                    color="purple"
                    indeterminate
                    class="my-5"
                    ></v-progress-circular>
                    <div class="body-2 pt-4">Fortarande kvar? <a class="primary--text" href="https://mobiljakt.nu/">Klicka här för att komma vidare...</a></div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(function () {
      window.location.replace('https://mobiljakt.nu/')
    }, 2500)
  }
}
</script>
