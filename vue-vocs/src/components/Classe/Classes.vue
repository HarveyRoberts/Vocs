<template>
  <v-container fluid style="padding-top: 90px; background-color: #8BC3DC; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
    <v-layout row wrap >
      <v-flex xs6 offset-xs3 class="mb-4">
        <v-card color="white" style="border-radius: 500px; height: 220px; width:220px; padding-top: 30px; margin:auto" class="white--text">
          <div class="text-xs-center mt-3">
            <v-icon class="gray--text" style="font-size: 120px; margin-right: 1%; margin-top: 3%">school</v-icon>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex class="text-xs-center">
        <h2 v-if="selectedClass === ''" class="white--text">Mes classes</h2>
        <h2 v-else class="white--text">Mes élèves de {{selectedClass.name}}</h2>
      </v-flex>
    </v-layout>
    <v-layout style="background-color: #ebebeb" row wrap >
      <v-card style="width:100%; height: 100px" class="gray--text text-xs-center">
        <div style="padding-top: 20px" class="headline text-xs-center">IUT Caen IFS</div>
        <div>{{classes.length}} classes</div>
        <div class="text-xs-center mt-2">
        </div>
      </v-card>
      <v-card style="width:100%; margin-top: 30px; margin-bottom: 30px" class="gray--text text-xs-center ml-3 mr-3" v-if="selectedClass === ''">
        <v-toolbar color="light-blue" dark height="100">
          <div style="margin-top: 15px"><h4>Mes Classes</h4></div>
          <v-spacer></v-spacer>
          <v-btn icon style="margin-right: 20px" @click="createClass=true">
            <v-icon large>add</v-icon>
          </v-btn>
        </v-toolbar>
        <div v-if="classes.length <= 0" class="text-xs-center mt-4"><h5>Pas de classes</h5></div>
        <v-list>
          <template v-for="(aClass,index) in classes">
            <v-list-tile two-line  v-bind:key="aClass.name" class="mt-3 mb-3">
              <v-btn icon @click.native.stop="confirmClassRemoval = true; classRemovalId=aClass.id">
                <v-icon class="white&#45;&#45;text" >delete</v-icon>
              </v-btn>
              <v-list-tile-avatar>
                <img src="https://i.pinimg.com/736x/72/75/5a/72755a0272c5f87266c80e3a28b85c76--people-icon-flat-icons.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content style="cursor: pointer" class="ml-3" @click="clickedClass(aClass)">
                <v-list-tile-title style="font-size: 20px">{{aClass.name}} </v-list-tile-title>
                <v-list-tile-title style="font-size: 20px">{{aClass.users.length - 1}} Élève(s)</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon style="cursor: pointer" color="grey lighten-1" @click="clickedClass(aClass)">arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="width:90%" inset v-if="index + 1 < classes.length"></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card style="width:100%; margin-top: 30px; margin-bottom: 30px" class="gray--text text-xs-center ml-3 mr-3" v-if="selectedClass != ''">
        <v-toolbar color="light-blue" dark height="100">
          <v-btn flat @click="clickedClass ('')"><v-icon >arrow_back</v-icon>Retour</v-btn>
          <div style="margin-top: 15px"><h4>Mes Elèves</h4></div>
          <v-spacer></v-spacer>
          <v-btn icon style="margin-right: 20px" @click="addStudents2 = true">
            <v-icon large>add</v-icon>
          </v-btn>
        </v-toolbar>
        <div v-if="selectedClass.users.length <= 0" class="text-xs-center mt-4"><h5>Classe vide</h5></div>
        <v-list>
          <template v-for="(student,index) in selectedClass.users">
            <v-list-tile two-line  v-bind:key="student.firstname" v-if="student.roles !== 'PROFESSOR' " class="mt-3 mb-3">
              <v-btn icon @click.native.stop="confirmStudentRemoval = true; studentRemovalId = student.id">
                <v-icon class="white&#45;&#45;text" >delete</v-icon>
              </v-btn>
              <v-list-tile-avatar>
                <img src="https://www.practicepanther.com/wp-content/uploads/2017/02/user.png">
              </v-list-tile-avatar>
              <v-list-tile-content style="cursor: pointer" class="ml-3" >
                <v-list-tile-title style="font-size: 20px">{{student.firstname}} {{student.surname}} </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon style="cursor: pointer" color="grey lighten-1">arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="width:90%" inset v-if="index + 1 < selectedClass.users.length"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-layout>


    <v-dialog v-model="createClass" fullscreen transition="dialog-bottom-transition" style="z-index: 999;position: absolute" :overlay=true
              scrollable>
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" class="info">
          <v-btn icon @click.native="createClass = false" dark>
            <v-icon dark>close</v-icon>
          </v-btn>
          <v-toolbar-title style="color: white">Créer une classe</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title>
          <v-flex xs12 sm6 offset-sm3>
            <v-form>
              <v-text-field
                label="Nom de la Classe"
                v-model="createClassName"
                :counter="10"
                required
              ></v-text-field>
              <v-btn @click="addStudents=true">Ajouter des élèves</v-btn>
              <v-form v-if="addStudents">
                <v-select
                  :items="theUsers"
                  v-model="addStudentName"
                  label="Nom de l'élève"
                  required
                  autocomplete
                ></v-select>
                <v-btn :disabled="addStudentName === ''" @click="addStudent(addStudentName)">Envoyer invitation</v-btn>
              </v-form>
              <div v-for="student in invitedStudents" :key="student.id">{{student.firstname}} {{student.surname}}</div>
            </v-form>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-flex xs12 sm6 offset-sm3>
            <v-btn
              @click="createAClass(createClassName)"
              @click.stop="createClass = false"
              :disabled="!createClassFormIsValid"
            >
              OK
            </v-btn>
          </v-flex>
        </v-card-actions>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>

    <v-layout row justify-center>
      <v-dialog v-model="confirmClassRemoval">
        <v-card>
          <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer votre classe?</v-card-title>
          <v-card-text>Vous ne pouvez pas récupérer votre classe une fois supprimer</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="confirmClassRemoval = false">Non</v-btn>
            <v-btn color="green darken-1" flat="flat" @click.native="removeClass(classRemovalId); confirmClassRemoval = false">Oui</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-dialog v-model="addStudents2" fullscreen transition="dialog-bottom-transition" style="z-index: 999;position: absolute" :overlay=true
              scrollable>
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" class="info">
          <v-btn icon @click.native="addStudents2 = false" dark>
            <v-icon dark>close</v-icon>
          </v-btn>
          <v-toolbar-title style="color: white">Ajouter des élèves</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title>
          <v-flex xs12 sm6 offset-sm3>
            <v-form>
              <v-select
                :items="theUsers"
                v-model="addStudentName"
                label="Nom de l'élève"
                required
                autocomplete
              ></v-select>
              <v-btn :disabled="addStudentName === ''" @click="addStudent(addStudentName)">Envoyer invitation</v-btn>
            </v-form>
            <div v-for="student in invitedStudents">{{student.firstname}} {{student.surname}}</div>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-flex xs12 sm6 offset-sm3>
            <v-btn
              @click="addStudent2(invitedStudents)"
              @click.stop="addStudents2 = false"
            >
              Fini
            </v-btn>
          </v-flex>
        </v-card-actions>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>

    <v-layout row justify-center>
      <v-dialog v-model="confirmStudentRemoval">
        <v-card>
          <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer retirer l'élève?</v-card-title>
          <v-card-text>Vous pouvez toujours renvoyer une invitation après</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" flat="flat" @click.native="confirmStudentRemoval = false">Non</v-btn>
            <v-btn color="blue" flat="flat" @click.native="removeStudent(studentRemovalId); confirmStudentRemoval = false">Oui</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </v-container>
</template>

<script>
  import homeClassroom from '@/assets/homeClassroom.png'
  export default {
    data () {
      return {
        classroomBG: homeClassroom,
        createClass: false,
        createClassName: '',
        addStudents: false,
        addStudentName: '',
        invitedStudents: [],
        confirmClassRemoval: false,
        classRemovalId: '',
        addStudents2: false,
        confirmStudentRemoval: false,
        studentRemovalId: '',
        theUsers: []
      }
    },
    computed: {
      createClassFormIsValid () {
        if (this.createClassName !== '') {
          return true
        } else {
          return false
        }
      },
      classes () {
        return this.$store.getters.classes
      },
      selectedClass () {
        if (this.$store.getters.selectedClass === '') {
          return this.$store.getters.selectedClass
        } else {
          var objectToReturn = this.$store.getters.selectedClass
          for (var i = 0; i < this.$store.getters.selectedClass.users.length; i++) {
            if (JSON.stringify(this.$store.getters.selectedClass.users[i].roles) === '["ROLE_USER"]') {
              objectToReturn.users[i].roles = 'USER'
            } else if (JSON.stringify(this.$store.getters.selectedClass.users[i].roles) === '["ROLE_STUDENT"]') {
              objectToReturn.users[i].roles = 'STUDENT'
            } else if (JSON.stringify(this.$store.getters.selectedClass.users[i].roles) === '["ROLE_PROFESSOR"]') {
              objectToReturn.users[i].roles = 'PROFESSOR'
            }
          }
          return objectToReturn
        }
      },
      users () {
        return this.$store.getters.users
      }
    },
    methods: {
      clickedClass (aClass) {
        this.$store.dispatch('selectClass', aClass)
      },
      createAClass (name) {
        var toSendOff = {
          name: name,
          users: this.invitedStudents
        }
        this.$store.dispatch('createClass', toSendOff)
        this.createClassName = ''
        this.addStudents = false
        this.invitedStudents = []
      },
      addStudent (name) {
        for (var i = 0; i < this.users.length; i++) {
          if (name === this.users[i].firstname + ' ' + this.users[i].surname.toUpperCase()) {
            var userToAdd = {
              id: this.users[i].id,
              firstname: this.users[i].firstname,
              surname: this.users[i].surname,
              roles: this.users[i].roles,
              avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'
            }
            for (var y = 0; y < this.theUsers.length; y++) {
              if (this.theUsers[y] === name) {
                this.theUsers.splice(y, 1)
              }
            }
          }
        }
        this.invitedStudents.push(userToAdd)
        this.addStudentName = ''
      },
      addStudent2 (invitedStudents) {
        var toSendOff = {
          selectedClass: this.selectedClass,
          invitedStudents: invitedStudents
        }
        this.$store.dispatch('addStudents', toSendOff)
      },
      removeClass (classId) {
        this.$store.dispatch('removeClass', classId)
      },
      removeStudent (studentId) {
        this.$store.dispatch('removeStudent', studentId)
      }
    },
    created () {
      for (var i = 0; i < this.users.length; i++) {
        if (JSON.stringify(this.users[i].roles) === '["ROLE_STUDENT"]' || JSON.stringify(this.users[i].roles) === '["ROLE_USER"]') {
          var firstname = this.users[i].firstname
          var surname = this.users[i].surname
          this.theUsers[i] = firstname + ' ' + surname.toUpperCase()
        }
      }
    }
  }
</script>
