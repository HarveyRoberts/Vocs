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
        <h2 class="white--text">Ma classe</h2>
      </v-flex>
    </v-layout>
    <v-layout style="background-color: #ebebeb" row wrap>
      <v-card style="width:100%; height: 100px" class="gray--text text-xs-center">
        <div style="padding-top: 20px" class="headline text-xs-center">{{classes[0].name}}</div>
        <div>{{classes[0].users.length}} Élèves</div>
        <div class="text-xs-center mt-2">
        </div>
      </v-card>
      <v-card style="width:100%; margin-top: 30px; margin-bottom: 30px" class="gray--text text-xs-center ml-3 mr-3">
        <br>
        <div style="padding-top: 10px" class="headline text-xs-center"><h4>Professeur: {{theTeacherInTheClass.firstname}} {{theTeacherInTheClass.surname}}</h4></div>
        <div class="text-xs-center mt-2">
        </div>
        <v-list>
          <template v-for="(student,index) in classes[0].users">
            <v-list-tile v-if="isNotTeacher(index)" two-line  v-bind:key="student.name" class="mt-3 mb-3">
              <v-list-tile-avatar>
                <img src="https://www.practicepanther.com/wp-content/uploads/2017/02/user.png">
              </v-list-tile-avatar>
              <v-list-tile-content style="cursor: pointer" class="ml-3" @click="clickedList(student.id); selectList(student)">
                <v-list-tile-title style="font-size: 20px">{{student.firstname}} {{student.surname}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon style="cursor: pointer" color="grey lighten-1" @click="clickedList(student.id); selectList(student)">arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="width:90%" inset v-if="index + 1 < classes[0].users.length"></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-flex class="text-xs-center">
        <v-card style="margin-top: 30px; height: 130px; margin-bottom: 30px" class="gray--text text-xs-center ml-3 mr-3">
          <v-btn large color="error" style="margin-top: 40px " @click="removeStudent">Quitter ma classe</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="firstTimeStudent" persistent>
      <v-card>
        <v-card-title class="headline">Vous êtes élève!</v-card-title>
        <v-card-text>Vous pouvez maintenant voir votre classe, ainsi que ses listes et jouer dessus!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="setFirstTimeStudentFalse">OK!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import homeClassroom from '@/assets/homeClassroom.png'
  export default {
    data () {
      return {
        classroomBG: homeClassroom
      }
    },
    computed: {
      firstTimeStudent () {
        return this.$store.getters.firstTimeStudent
      },
      classes () {
        return this.$store.getters.classes
      },
      theTeacherInTheClass () {
        return this.$store.getters.theTeacherInTheClass
      },
      theUser () {
        return this.$store.getters.user
      }
    },
    methods: {
      setFirstTimeStudentFalse () {
        this.$store.dispatch('setFirstTimeStudent', false)
      },
      isNotTeacher (index) {
        if (JSON.stringify(this.classes[0].users[index].roles) !== '["ROLE_PROFESSOR"]') {
          return true
        } else {
          return false
        }
      },
      removeStudent () {
        this.$store.dispatch('removeStudent', this.theUser.id)
      }
    }
  }
</script>
