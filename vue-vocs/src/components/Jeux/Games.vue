<template>
  <v-container fluid style="padding-top: 100px; background-color: #8bc3dc; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
    <v-layout row wrap>
      <v-flex xs6 sm6 md4 wrap class="mb-5" style="background: none; margin: auto; padding-left: 7.5%">
        <div style="border-radius: 500px; background: none; height: 220px; width:220px; padding-top: 30px" class="text-xs-center white--text">
          <div class="text-xs-center mt-3">
            <v-icon class="white--text" style="font-size: 120px; margin-right: 1%; margin-top: 3%">gamepad</v-icon>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout style="background-color: #ebebeb" row wrap>
      <v-card style="width:100%; height: 100px" class="gray--text text-xs-center">
        <div style="padding-top: 20px" class="headline text-xs-center">Jeux</div>
        <div>Entraînez-vous grâce à 5 modes d'exercises</div>
        <div class="text-xs-center mt-2">
        </div>
      </v-card>
      <v-card style="width:100%; margin-top: 30px" class="gray--text text-xs-center ml-3 mr-3">
        <br>
        <div style="padding-top: 10px" class="headline text-xs-center"><h4>Selectionnez Votre Mode D'Exercises</h4></div>
        <div><h5>Cliquez sur l'icône d'aide pour plus d'informations sur chaque mode D'Exercises</h5></div>
        <div class="text-xs-center mt-2">
        </div>
        <v-container fluid style="margin-top: 50px; margin-left: 10%">
          <v-layout row wrap>
            <v-flex xs3 class="mb-3 mr-2 ml-2" v-for="gameMode in gameModes">
              <div  class="white--text game-box elevation-6" :style="{ backgroundColor: gameMode.color }">
                <v-layout row>
                  <v-flex xs12>
                    <div class="text-xs-center mt-4">
                      <v-icon color="white" style="font-size: 50px">
                        {{gameMode.icon}}
                      </v-icon>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 class="mt-2">
                    <div class="headline text-xs-center">{{gameMode.name}}</div>
                  </v-flex>
                </v-layout>
                <v-layout row v-if="gameMode.showInfo">
                  <v-flex xs12>
                    <div class="text-xs-center mt-2">{{gameMode.description}}</div>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <div class="text-xs-center">
                      <v-btn icon @click="gameMode.showInfo=!gameMode.showInfo">
                        <v-icon large>help</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <div class="text-xs-center">
                      <v-btn flat dark @click="testIfUserHasSelectedAList (gameMode.link, gameMode.name)" >S'entrainer</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
              <v-layout row justify-center>
                <v-dialog v-model="dialogConfirmation">
                  <v-card>
                    <v-card-title class="headline">Vous n'avez pas sélectionné une de vos listes. Une liste de base sera utilisée.</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat  to="/lists" @click.native="dialogConfirmation = false">Aller à mes listes</v-btn>
                      <v-btn flat  @click.native="setGameList(aBasicList)" >S'entrainer</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
              <v-layout row justify-center>
                <v-dialog v-model="dialogConfirmation2" v-if="SelectedListForGameIsLessThanFour && selectedGameMode === 'QCM'">
                  <v-card>
                    <v-card-title class="headline">Votre liste {{selectedListForGame.name}} a moins de 4 mots, une liste de base sera utilisée.</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat to="/lists" @click.native="dialogConfirmation2 = false">Choisir une autre liste</v-btn>
                      <v-btn flat @click.native="setGameList(aBasicList)">S'entrainer</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogConfirmation2" v-else>
                  <v-card>
                    <v-card-title class="headline">S'entrainer avec la liste {{selectedListForGame.name}}?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat @click.native="dialogConfirmation2 = false">Annuler</v-btn>
                      <v-btn flat @click.native="setGameList(selectedListForGame)" >S'entrainer</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        gameModes: [
          {name: 'Traduction', icon: 'gamepad', description: 'Traduire une série de mot qui s\'affiche en l\'écrivant dans la boîte indiquée', link: '/games/classic', color: '#3fb554', showInfo: false},
          {name: 'QCM', icon: 'gamepad', description: 'Choisir parmit plusieurs mots la traduction correcte ', link: '/games/QCM', color: '#35a6ff', showInfo: false},
          {name: 'Matching', icon: 'gamepad', description: 'Jeu Matching (arrive prochainement)', link: '/games/matching', color: '#ff4864', showInfo: false}
/*          {name: 'Time Attack', icon: 'gamepad', description: 'Time Attack (arrive prochainement)', link: '/games/classic', color: '#ffc05f', showInfo: false},
          {name: 'Hard List', icon: 'gamepad', description: 'Hard List (arrive prochainement)', link: '', color: '#8b51ff', showInfo: false} */
        ],
        dialogConfirmation: false,
        dialogConfirmation2: false,
        tempLink: '',
        selectedGameMode: ''
      }
    },
    computed: {
      selectedListForGame () {
        return this.$store.getters.getSelectedListForGame
      },
      SelectedListForGameIsLessThanFour () {
        if (this.$store.getters.getSelectedListForGame === '') {
          return false
        } else {
          return this.$store.getters.getSelectedListForGame.wordTrads.length < 4
        }
      },
      aBasicList () {
        return this.$store.getters.basicList
      },
      gameList () {
        return this.$store.getters.gameList
      }
    },
    methods: {
      testIfUserHasSelectedAList (link, gameMode) {
        this.selectedGameMode = gameMode
        this.tempLink = link
        if (this.selectedListForGame === '') {
          this.dialogConfirmation = true
        } else {
          this.dialogConfirmation2 = true
        }
      },
      setGameList (list) {
        this.$store.dispatch('setGameList', list)
        this.$router.push(this.tempLink)
      }
    }
  }
</script>


<style>
  .game-box {
    height: 250px;
    border-radius: 10px;
  }
</style>
