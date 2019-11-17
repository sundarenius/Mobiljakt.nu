import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    phones: '',
    phonesRes: '',
    phonesSimple: '',
    phonesSimpleRes: '',
    addedToCompare: [],
    bottomCompare: false,
    bottomCompareText: '',
    abonnemangLista: '',
    abbListSimple: '',
    abbListSimpleCopy: '',
    disableNextBtn: true,
    studentAbbs: '',
    studentBigArr: '',
    seniorAbbs: '',
    seniorBigArr: '',
    q1Stats: 0,
    showResult: false,
    guidePoints: 0,
    guideSurf: 0,
    guideMinne: 0,
    guideRabatt: false,
    guideBind: 0
  },
  mutations: {
    addToCompare (state, phone) {
      console.log(state.addedToCompare.length)
      if (phone.checked === true) {
        if (state.addedToCompare.length <= 3) {
          state.addedToCompare.push(phone)
        } else {
          phone.checked = false
          alert('Du kan jämföra max 4 produkter samtidigt')
        }
      } else {
        state.addedToCompare.forEach((val, index) => {
          if (val.name === phone.name) {
            state.addedToCompare.splice(index, 1)
          }
        })
      }
      if (state.addedToCompare.length > 0) {
        state.bottomCompare = true
      } else {
        state.bottomCompare = false
      }
      state.bottomCompareText = 'Markerade produkter: ' + state.addedToCompare.length
    },
    Avmarkera (state) {
      state.addedToCompare.forEach(val => {
        val.checked = false
      })
      state.addedToCompare = []
      state.bottomCompare = false
    },
    phonesCommit (state, payload) {
      state.phones = payload
    },
    phonesExtra (state, payload) {
      state.phonesRes = payload
    },
    phonesCommitSimple (state, payload) {
      state.phonesSimple = payload
    },
    phonesExtraSimple (state, payload) {
      state.phonesSimpleRes = payload
    },
    abonnemangListaCommit (state, payload) {
      state.abonnemangLista = payload
    },
    abbListSimpleCommit (state, payload) {
      state.abbListSimple = payload
    },
    abbListSimpleCopyCommit (state, payload) {
      state.abbListSimpleCopy = payload
    },
    disableNextBtnCommit (state, payload) {
      state.disableNextBtnCommit = payload
    },
    studentAbbsCommit (state, payload) {
      state.studentAbbs = payload
    },
    studentBigArrCommit (state, payload) {
      state.studentBigArr = payload
    },
    seniorAbbsCommit (state, payload) {
      state.seniorAbbs = payload
    },
    seniorBigArrCommit (state, payload) {
      state.seniorBigArr = payload
    },
    q1StatsMut (state, payload) {
      state.q1Stats = payload
    },
    showResultStat (state, payload) {
      state.showResult = payload
    }
  },
  actions: {

  },
  getters: {
    phones (state) {
      return state.phones
    },
    phonesReserv (state) {
      return state.phonesRes
    },
    phonesSimpleArr (state) {
      return state.phonesSimple
    },
    phonesSimpleRes (state) {
      return state.phonesSimpleRes
    },
    abonnemangLista (state) {
      return state.abonnemangLista
    },
    abbListSimple (state) {
      return state.abbListSimple
    },
    abbListSimpleCopy (state) {
      return state.abbListSimpleCopy
    },
    disableNextBtnGetter (state) {
      return state.disableNextBtn
    },
    changeNextBtnGetter (state) {
      state.disableNextBtn = !state.disableNextBtn
    },
    studentAbbs (state) {
      return state.studentAbbs
    },
    studentBigArr (state) {
      return state.studentBigArr
    },
    seniorAbbs (state) {
      return state.seniorAbbs
    },
    seniorBigArr (state) {
      return state.seniorBigArr
    }
  }
})
