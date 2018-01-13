<template>
  <v-parallax class="s1-parallax" src="https://www.sinium.com/media/2013/08/sinium-bg.png" style="height:100vh;width:100vw">
    <v-container >
      <v-layout row v-if="step==1" style="margin-top: 180px">
        <v-flex xs12 sm6 offset-sm3>
          <v-toolbar color="light-blue" dark>
            <v-toolbar-title>Inscription</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/connection" flat>
              déjà inscrit?
            </v-btn>
          </v-toolbar>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="comparePasswords">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="email"
                        label="Email"
                        v-model="user.email"
                        type="email"
                        required>

                      </v-text-field>
                      <v-text-field
                        name="password"
                        label="Mot-de-passe"
                        v-model="user.password"
                        type="password"
                        required>

                      </v-text-field>
                      <v-text-field
                        name="confirmPassword"
                        label="Confirmez votre mot-de-passe"
                        v-model="confirmPassword"
                        type="password"
                        required>

                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    {{notice}}
                    <v-flex  xs6 offset-xs3 class="text-xs-center">
                      <v-btn type="submit" >Continuer</v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>



      <v-layout row v-if="step==2" style="margin-top: 180px">
        <v-flex class="mt-5" xs12 sm6 offset-sm3>
          <v-toolbar color="light-blue" dark>
            <v-toolbar-title>Inscription</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/connection" flat>
              déjà inscrit?
            </v-btn>
          </v-toolbar>
          <v-card>
              <v-btn flat @click="step--; user.roles = null; teacherSelected =  'teacher-selected-false'; studentSelected = 'student-selected-false'; freeSelected = 'free-selected-false'"><v-icon >arrow_back</v-icon>Retour</v-btn>
            <v-card-text>
              <div class="text-xs-center" style="font-size: 20px">Choisissez votre type de compte</div>
                <form class='mt-4' @submit.prevent="step=3; notice = ''">
                  <v-layout row class="text-xs-center">
                    <v-flex xs4 >
                      <v-btn @click="user.roles='USER'
                             teacherSelected='teacher-selected-false',
                             studentSelected='student-selected-false',
                             freeSelected='free-selected-true'"
                             :class="freeSelected" raised>Libre</v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-btn @click="user.roles='STUDENT'
                             teacherSelected='teacher-selected-false',
                             studentSelected='student-selected-true',
                             freeSelected='free-selected-false'"
                             :class="studentSelected" raised>Elève</v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-btn @click="user.roles='PROFESSOR',
                       teacherSelected='teacher-selected-true',
                       studentSelected='student-selected-false',
                       freeSelected='free-selected-false'"
                             :class="teacherSelected"
                             raised>
                        Professeur</v-btn>
                    </v-flex>
                  </v-layout>
                  <v-layout row class="mt-3">
                    {{notice}}
                    <v-flex  xs6 offset-xs3 class="text-xs-center">
                      <v-btn justify-center :disabled="user.roles==null" type="submit" >Continuer</v-btn>
                    </v-flex>
                  </v-layout>
                </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>



      <v-layout row v-if="step==3 && user.roles==='USER'" style="margin-top: 180px">
        <v-flex class="mt-5" xs12 sm6 offset-sm3>
          <v-toolbar color="light-blue" dark>
            <v-toolbar-title>Inscription</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/connection" flat>
              déjà inscrit?
            </v-btn>
          </v-toolbar>
          <v-card>
            <v-btn flat @click="step--"><v-icon >arrow_back</v-icon>Retour</v-btn>
            <v-card-text>
              <div class="text-xs-center" style="font-size: 20px">Compte Libre</div>
              <v-container>
                <form @submit.prevent="onSignup">
                  <v-layout row>
                    <v-text-field
                      class="mr-2"
                      name="name"
                      label="Prénom"
                      v-model="user.firstname"
                      type="text"
                      required>
                    </v-text-field>
                    <v-text-field
                      class="ml-2"
                      name="surname"
                      label="Nom"
                      v-model="user.surname"
                      type="text"
                      required>
                    </v-text-field>
                  </v-layout>
                  <v-layout row>
                    {{notice}}
                    <v-flex  xs6 offset-xs3 class="text-xs-center">
                      <v-btn justify-center type="submit" >Continuer</v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>


      <v-layout row v-if="step==3 && user.roles==='STUDENT'" style="margin-top: 180px">
        <v-flex style="margin-top: -50px" xs12 sm6 offset-sm3>
          <v-toolbar color="light-blue" dark>
            <v-toolbar-title>Inscription</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/connection" flat>
              déjà inscrit?
            </v-btn>
          </v-toolbar>
          <v-card>
            <v-btn flat @click="step--"><v-icon >arrow_back</v-icon>Retour</v-btn>
            <v-card-text>
              <div class="text-xs-center" style="font-size: 20px">Compte Élève</div>
              <v-container>
                <form >
                  <v-layout row>
                    <v-text-field
                      class="mr-2"
                      name="name"
                      label="Prénom"
                      v-model="user.firstname"
                      type="text"
                      required>
                    </v-text-field>
                    <v-text-field
                      class="ml-2"
                      name="surname"
                      label="Nom"
                      v-model="user.surname"
                      type="text"
                      required>
                    </v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-layout row>
                      <v-select
                        :items="allSchools"
                        v-model="user.classes[0].school"
                        label="Établissement"
                        required
                        autocomplete
                      ></v-select>
                    </v-layout>
                  </v-layout>
                  <v-layout row>
                    <v-layout row>
                      <v-select
                        :items="theClasses"
                        v-model="classSearch"
                        label="Enter une class"
                        required
                      ></v-select>
                    </v-layout>
                  </v-layout>
                  <v-layout row>
                    {{notice}}
                    <v-flex  xs6 offset-xs3 class="text-xs-center">
                      <v-btn justify-center @click="StudentSignUp" :disabled="classSearch === '' || user.classes[0].school === null" >Continuer</v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>



      <v-layout row v-if="step==3 && user.roles==='PROFESSOR'" style="margin-top: 180px">
        <v-flex class="mt-5" xs12 sm6 offset-sm3>
          <v-toolbar color="light-blue" dark>
            <v-toolbar-title>Inscription</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/connection" flat>
              déjà inscrit?
            </v-btn>
          </v-toolbar>
          <v-card>
            <v-btn flat @click="step--"><v-icon >arrow_back</v-icon>Retour</v-btn>
            <v-card-text>
                <div class="text-xs-center" style="font-size: 20px">Compte Professeur</div>
              <v-container>
                <form @submit.prevent="onSignup">
                  <v-layout row>
                    <v-text-field
                      class="mr-2"
                      name="name"
                      label="Prénom"
                      v-model="user.firstname"
                      type="text"
                      required>
                    </v-text-field>
                    <v-text-field
                      class="ml-2"
                      name="surname"
                      label="Nom"
                      v-model="user.surname"
                      type="text"
                      required>
                    </v-text-field>
                  </v-layout>
                  <v-layout row>
                    <v-select
                      :items="allSchools"
                      v-model="user.classes[0].school"
                      label="Établissement"
                      required
                      autocomplete
                    ></v-select>
                  </v-layout>
                  <v-layout row>
                    {{notice}}
                    <v-flex xs6 offset-xs3 class="text-xs-center">
                      <v-btn justify-center type="submit" >Continuer</v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="theInscriptionErrorMessageIsOn">
          <v-card>
            <v-card-title class="headline">{{inscriptionErrorMessage}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="resetSignInAndUpErrorMessages">Modifier</v-btn>
              <v-btn flat @click.native="jeMeConnecte">Je me connecte</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-parallax>
</template>

<script>
  export default {
    data () {
      return {
        step: 1,
        notice: '',
        confirmPassword: '',
        teacherSelected: 'teacher-selected-false',
        studentSelected: 'student-selected-false',
        freeSelected: 'free-selected-false',
        theClasses: [],
        classSearch: '',
        user: {
          roles: null,
          firstname: null,
          surname: null,
          email: null,
          password: null,
          classes: [
            {
              school: null
            }
          ]
        },
        users: [],
        allSchools: []
      }
    },
    computed: {
      allClasses () {
        return this.$store.getters.allClasses
      },
      inscriptionErrorMessage () {
        return this.$store.getters.inscriptionErrorMessage
      },
      theInscriptionErrorMessageIsOn () {
        return this.$store.getters.inscriptionErrorMessage !== ''
      },
      schools () {
        return this.$store.getters.schools
      }

    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', this.user)
      },
      comparePasswords () {
        if (this.user.password === this.confirmPassword) {
          this.step = 2
          this.notice = ''
        } else {
          this.notice = 'Les mots de passe ne correspondent pas'
        }
      },
      jeMeConnecte () {
        this.$store.dispatch('resetSignInAndUpErrorMessages')
        this.$router.push('/connection')
      },
      resetSignInAndUpErrorMessages () {
        this.$store.dispatch('resetSignInAndUpErrorMessages')
      },
      StudentSignUp () {
        this.user.roles = 'USER'
        var id = null
        for (var i = 0; i < this.allClasses.length; i++) {
          if (this.allClasses[i].name === this.classSearch) {
            id = this.allClasses[i].id
          }
        }
        var theClassToSendOff = {
          classe: {
            id: id,
            name: this.classSearch
          },
          user: this.user
        }
        this.$store.dispatch('signStudentUp', theClassToSendOff)
      },
    },
    created () {
      this.$store.dispatch('setIsPlayingGame', false)
      for (var i = 0; i < this.allClasses.length; i++) {
        this.theClasses[i] = this.allClasses[i].name
      }
      for (var i = 0; i < this.schools.length; i++) {
        this.allSchools[i] = this.schools[i].nom
      }
    }
  }
</script>

<style>
  .teacher-selected-false {
    transition: background-color 0.5s;
  }
  .teacher-selected-true {
    background-color: #00cfff !important;
    color: white !important;
    transition: background-color 0.5s;
  }
  .student-selected-false {
    transition: background-color 0.5s;
  }
  .student-selected-true {
    background-color: #00cfff !important;
    color: white !important;
    transition: background-color 0.5s;
  }
  .free-selected-false {
    transition: background-color 0.5s
  }
  .free-selected-true {
    background-color: #00cfff !important;
    color: white !important;
    transition: background-color 0.5s;
  }
</style>
