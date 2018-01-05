<template>
  <v-container fluid style="margin-top: 100px">
    <v-layout row wrap>
      <v-flex xs4 sm6 md4 wrap class="mb-4">
        <v-card color="red lighten-2" class="white--text text-xs-center ml-3 mr-3">
          <div v-if="accountType !== 'Professeur' " style="padding-top: 10px" class="headline text-xs-center">Ma Classe</div>
          <div v-else style="padding-top: 10px" class="headline text-xs-center">Mes Classes</div>
          <div v-if="user.roles !== 'USER' && user.classes.length === 0">Pas de classe</div>
          <div v-else-if="user.roles === 'USER' && user.classes.length === 0">Pas de classe</div>
          <div v-else>{{user.classes[0].name}}</div>
          <div class="text-xs-center mt-2">
            <v-icon class="white--text" style="font-size: 90px">school</v-icon>
          </div>
          <v-btn v-if="accountType !== 'Professeur' " style="margin-top: 10px; margin-bottom: 10px;" flat dark to="/class">Voir Ma Classe</v-btn>
          <v-btn v-else style="margin-top: 10px; margin-bottom: 10px;" flat dark to="/class">Voir Mes Classes</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs4 sm6 md4 wrap>
        <v-card color="cyan lighten-2"  class="white--text text-xs-center ml-3 mr-3">
            <div style="padding-top: 10px"  class="headline text-xs-center">Mes listes</div>
            <div>{{user.personalLists.length}} liste(s)</div>
          <div class="text-xs-center mt-2">
            <v-icon class="white--text" style="font-size: 90px">description</v-icon>
          </div>
            <v-btn style="margin-top: 10px; margin-bottom: 10px;" flat dark to="/lists">Voir les listes</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs4 sm6 md4 wrap>
        <v-card color="orange lighten-2" class="white--text text-xs-center ml-3 mr-3">
          <div style="padding-top: 10px"  class="headline text-xs-center">Mes Statistiques</div>
          <div>Tu es juste trop fort</div>
          <div class="text-xs-center mt-2">
            <v-icon class="white--text" style="font-size: 90px">show_chart</v-icon>
          </div>
          <v-btn style="margin-top: 10px; margin-bottom: 10px;" flat dark to="/statistics">Voir mes statistiques</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      <v-flex xs4 sm6 md4>
        <v-card class="ml-3 mt-5 mr-3">
          <v-card-media
            :src="classroomBG" height="180px"
          >
            <div class="ma-3 mt-5">
              <div class="white--text" style="font-size: 35px">{{user.firstname}} {{user.surname}}</div>
              <span v-if="accountType === 'Élève' && user.classes.length !== 0" class="white--text" style="font-size: 25px">{{user.classes[0].name}}</span>
            </div>
          </v-card-media>
<!--          <v-card-title primary-title>
          </v-card-title>-->
          <v-card-actions>
            <v-btn flat color="blue" to="/profil" >Voir Profil</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs8 style="margin-top: -8px">
        <h4 class="ml-3">Activités Récentes</h4>
        <v-layout row wrap>
          <v-flex xs12 class="ml-3 mr-3 mb-4">
            <v-card class="darkgrey--text">
              <v-card-media
                :src="listBG" height="80px"
              >
              </v-card-media>
              <v-card-title primary-title style="margin: 0">
                <div style="margin: 0" class="headline">Liste 1 - Classique</div>
              </v-card-title>
              <v-card-actions style="margin: 0">
                <v-btn class="mt-2">Voir</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 class="ml-3 mr-3 mb-4">
            <v-card class="darkgrey--text">
              <v-card-media
                :src="listBG" height="80px"
              >
              </v-card-media>
              <v-card-title primary-title style="margin: 0">
                <div style="margin: 0" class="headline">Liste 3 - Time Attack</div>
              </v-card-title>
              <v-card-actions style="margin: 0">
                <v-btn class="mt-2">Voir</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 class="ml-3 mr-3 mb-4">
            <v-card class="darkgrey--text">
              <v-card-media
                :src="listBG" height="80px"
              >
              </v-card-media>
              <v-card-title primary-title style="margin: 0">
                <div style="margin: 0" class="headline">Liste 1 - QCM</div>
              </v-card-title>
              <v-card-actions style="margin: 0">
                <v-btn class="mt-2">Voir</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 class="ml-3 mr-3 mb-4">
            <v-card class="darkgrey--text">
              <v-card-media
                :src="listBG" height="80px"
              >
              </v-card-media>
              <v-card-title primary-title style="margin: 0">
                <div style="margin: 0" class="headline">Liste 5 - Matching</div>
              </v-card-title>
              <v-card-actions style="margin: 0">
                <v-btn class="mt-2">Voir</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import homeClassroom from '@/assets/homeClassroom.png'
  import ListBG from '@/assets/HomepageBG4.png'
  export default {
    data () {
      return {
        classroomBG: homeClassroom,
        listBG: ListBG
      }
    },
    computed: {
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
    }
  }
</script>
