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
        <h2 class="white--text">Rejoindre une classe</h2>
      </v-flex>
    </v-layout>
    <v-layout style="background-color: #ebebeb" row wrap>
      <v-card style="width:100%; height: 309px" class="gray--text text-xs-center">
        <v-select
          style="width: 30%; margin: auto; margin-top: 13px"
          :items="allSchools"
          v-model="schoolSearch"
          label="Enter un établissement"
          autocomplete
          required
        ></v-select>
        <v-select
          style="width: 30%; margin: auto; margin-top: 13px"
          :items="theClasses"
          v-model="classSearch"
          label="Enter une class"
          required
        ></v-select>
        <br>
        <v-btn :disabled="classSearch === ''" @click="showJoinClassDialog = true">Envoyer une demande</v-btn>
        <!--<div v-if="notifications.demandSend.length > 0" >Vous avez déjà envoyé une demande</div>-->
      </v-card>
    </v-layout>
    <v-dialog v-model="showJoinClassDialog" persistent>
      <v-card>
        <v-card-title class="headline">Êtes-vous sûr de vouloir envoyer une demande à cette class?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="showJoinClassDialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" flat @click.native="acceptClassJoin">Envoyer</v-btn>
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
        classroomBG: homeClassroom,
        theClasses: [],
        allSchools: [],
        students: [
          {name: 'Harvey', surname: 'Roberts', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Simon', surname: 'Aranud', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Mathis', surname: 'Delaunay', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Etienne', surname: 'Lebarillier', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Antoine', surname: 'Lebrun', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Maxime', surname: 'Gouet', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Christophe', surname: 'Genard', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Loic', surname: 'Bitter', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'},
          {name: 'Thomas', surname: 'Herbelin', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'}
        ],
        schoolSearch: '',
        classSearch: '',
        showJoinClassDialog: false
      }
    },
    computed: {
      allClasses () {
        return this.$store.getters.allClasses
      },
      schools () {
        return this.$store.getters.schools
      },
      notifications () {
        return this.$store.getters.myDemands
      }
    },
    methods: {
      acceptClassJoin () {
/*
        this.$store.dispatch('setFirstTimeStudent', true)
        this.$store.dispatch('setRoles', 'STUDENT') */
        this.showJoinClassDialog = false
        var id = null
        for (var i = 0; i < this.allClasses.length; i++) {
          if (this.allClasses[i].name === this.classSearch) {
            id = this.allClasses[i].id
          }
        }
        var theClassToSendOff = {
          id: id,
          name: this.classSearch
        }
        this.$store.dispatch('setUserClass', theClassToSendOff)
      }
    },
    created () {
      for (var i = 0; i < this.allClasses.length; i++) {
        this.theClasses[i] = this.allClasses[i].name
      }
      for (var y = 0; y < this.schools.length; y++) {
        this.allSchools[y] = this.schools[y].nom
      }
    }
  }
</script>
