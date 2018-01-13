<template>
  <v-container fluid style="padding-top: 90px; background-color: #8BC3DC; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
    <v-layout row wrap>
      <v-flex xs6 sm6 md4 offset-xs4>
        <h2 class="white--text text-xs-center">Paramètres</h2>
      </v-flex>
    </v-layout>
    <v-layout style="background-color: #ebebeb;" row wrap>

      <v-card  style="width:100%; height: 70vh; margin-top: 30px;margin-bottom:15px" class="gray--text text-xs-center ml-3 mr-3">
        <h4 style="margin-top: 30px">Modifier Les Paramètres</h4>
        <form>
          <br>
          <div style="padding-top: 10px;display: flex;width: 40%;margin: auto" class="headline text-xs-center">
            <div style="margin-top: 30px;margin-right: 20px">Voix :  </div>
            <v-select
              style="width: 30%; margin: auto; margin-top: 13px"
              :items="voiceList"
              v-model="voiceSelected"
              label="Selectionnez une voix"
              required
            ></v-select>
          </div>
          <v-btn @click="setSettings">Sauvegarder</v-btn>
        </form>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import homeClassroom from '@/assets/homeClassroom.png'
  export default {
    data () {
      return {
        classroomBG: homeClassroom,
        info: {
          email: '',
          password: ''
        },
        voiceSelected: null,
      }
    },
    computed: {
      voiceList() {
        console.log(JSON.stringify(responsiveVoice.getVoices()))
        var voices = [];
        var voicess = responsiveVoice.getVoices();
        for(let i = 0; i<voicess.length;i++) {
          voices.push(voicess[i].name);
        }
        return voices;
      },
      voice () {
        return localStorage.getItem('userVoicePreference')
      },
      user () {
        return this.$store.getters.user
      },
      accountType () {
        if (this.user.roles === 'STUDENT' || JSON.stringify(this.user.roles) === '["ROLE_STUDENT"]') {
          return 'Élève'
        } else if (this.user.roles === 'PROFESSOR' || JSON.stringify(this.user.roles) === '["ROLE_PROFESSOR"]') {
          return 'Professeur'
        } else {
          return 'Libre'
        }
      }
    },
    methods: {
      setSettings () {
        localStorage.setItem('userVoicePreference',this.voiceSelected)
        responsiveVoice.setDefaultVoice(this.voiceSelected);
      }
    },
    created () {
      this.$store.dispatch('setIsPlayingGame', false)
    }
  }
</script>
