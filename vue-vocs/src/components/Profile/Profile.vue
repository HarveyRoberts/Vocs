<template>
  <v-container fluid style="padding-top: 90px;height:140vh; background-color: #8BC3DC; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
    <v-layout row wrap>
      <v-flex xs6 sm6 md4 offset-xs5 wrap class="mb-4 text-xs-center">
        <div class="text-xs-center">
          <v-card style="background:none; box-shadow:none; border-radius: 500px; height: 220px; width:220px" class="white--text">
            <img style="height:105%; width:105%; margin: 0; margin-left: -2px; margin-top: -1px; padding: 0" src="http://flaticons.net/icons/Application/User-Profile.png" alt="">
          </v-card>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 sm6 md4 offset-xs4>
        <h2 class="white--text text-xs-center">Mon Profil</h2>
      </v-flex>
    </v-layout>
    <v-layout style="background-color: #ebebeb;" row wrap>
      <v-card style="width:100%; height: 115px" class="gray--text text-xs-center">
        <div style="padding-top: 20px" class="headline text-xs-center">{{user.firstname}} {{user.surname}}</div>
        <span v-if="accountType === 'Élève' && user.classes.length !== 0" class="white&#45;&#45;text" style="font-size: 25px">{{user.classes[0].name}}</span>
        <div class="text-xs-center mt-2">
        </div>
      </v-card>


      <v-card v-if="!editProfil" style="width:100%; height: 40vh; margin-top: 30px" class="gray--text text-xs-center ml-3 mr-3">
        <v-btn style="margin-left: 95%;margin-top: 15px" class="editButton" icon @mouseover="modifyProfilMessage = true" @mouseleave="modifyProfilMessage = false" @click="enterPassword = true">
          <v-icon large>mode_edit</v-icon>
          <div class="modifyProfilMessage" v-if="modifyProfilMessage">Modifier</div>
        </v-btn>
        <br>
        <div style="padding-top: 10px" class="headline text-xs-center"><h5>Prenom:     {{user.firstname}}</h5></div>
        <div><h5>Nom:     {{user.surname}}</h5></div>
        <div><h5 v-if="accountType === 'Élève' && user.classes.length !== 0" class="white&#45;&#45;text" style="font-size: 25px">Classe:     {{user.classes[0].name}}</h5></div>
        <div><h5>Type de compte:     {{accountType}}</h5></div>
        <div class="text-xs-center mt-2">
        </div>
      </v-card>


      <v-dialog v-model="enterPassword">
        <v-card>
          <v-card-title class="headline">Entrez votre mot de passe</v-card-title>
          <v-form>
            <v-text-field
              style="width: 75%;margin: auto"
              name="passwordConfirm"
              label="Mot de passe"
              v-model="info.password"
              type="password"
              required>
            </v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="enterPassword = false">Annuler</v-btn>
            <v-btn primary flat @click.native="testPasswordConfirm" >Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-card v-if="editProfil" style="width:100%; height: 70vh; margin-top: 30px;margin-bottom:15px" class="gray--text text-xs-center ml-3 mr-3">
        <h4 style="margin-top: 30px">Modifier Mon Profil</h4>
        <form>
          <br>
          <div style="display: flex;width: 40%;margin: auto" class="headline text-xs-center">
            <div style="margin-top: 18px;margin-right: 20px">Prénom:</div>
              <v-text-field
                name="Firstname"
                :placeholder="user.firstname"
                v-model="theModifiedUser.firstname"
              ></v-text-field></div>
          <div style="padding-top: 10px;display: flex;width: 40%;margin: auto" class="headline text-xs-center">
            <div style="margin-top: 18px;margin-right: 20px">Nom:  </div>
            <v-text-field style="width: 75%"
            name="surname"
            v-model="theModifiedUser.surname"
            :placeholder="user.surname"
            type="text">
          </v-text-field></div>
          <div style="padding-top: 10px;display: flex;width: 40%;margin: auto" class="headline text-xs-center">
            <div style="margin-top: 18px;margin-right: 20px">Email:  </div>
            <v-text-field style="width: 75%"
              name="email"
              v-model="theModifiedUser.email"
              :placeholder="user.email"
              type="email">
            </v-text-field>
          </div>
          <div style="padding-top: 10px;display: flex;width: 40%;margin: auto" class="headline text-xs-center">
            <div style="margin-top: 18px;margin-right: 20px">Mot de passe:  </div>
            <v-text-field style="width: 75%"
              name="password"
              v-model="theModifiedUser.password"
              type="password">
            </v-text-field>
          </div>
          <v-btn primary style="margin-top: 20px" @click.native="submitEditProfil">Continuer</v-btn>
        </form>
      </v-card>


      <v-card color="white" style="width:100%; margin-top: 30px;margin-bottom: 30px;" class="gray--text text-xs-center ml-3 mr-3">
        <div style="padding-top: 10px" class="headline text-xs-center"><h4>Mes Listes</h4></div>
        <div style="padding-bottom: 5px"><h5>{{user.personalLists.length}} liste(s)</h5></div>
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
        enterPassword: false,
        modifyProfilMessage: false,
        theModifiedUser: {
          firstname: null,
          surname: null,
          email: null,
          password: null,
        },
        info: {
          email: '',
          password: ''
        }
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
      },
      editProfil () {
        return this.$store.getters.editProfil
      }
    },
    methods: {
      submitEditProfil(){
        this.editProfil = false
        if (this.theModifiedUser.firstname === null) {
          this.theModifiedUser.firstname = this.user.firstname
        }
        if (this.theModifiedUser.surname === null) {
          this.theModifiedUser.surname = this.user.surname
        }
        if (this.theModifiedUser.email === null) {
          this.theModifiedUser.email = this.user.email
        }
        this.$store.dispatch('modifyProfil',this.theModifiedUser)
      },
      testPasswordConfirm () {
        this.enterPassword = false;
        this.$store.dispatch('testPasswordConfirm',this.info);
      }
    },
    created () {
      this.$store.dispatch('setIsPlayingGame', false)
      this.info.email = this.user.email;
      this.theModifiedUser.firstname = this.user.firstname;
      this.theModifiedUser.surname = this.user.surname;
      this.theModifiedUser.email = this.user.email;
    }
  }
</script>

<style scoped>
  .modifyProfilMessage {
    position: absolute;
    background-color: #4e93bf;
    color: white;
    width:75px;
    height:25px;
    padding-top:4px;
    border-radius: 20px;
    font-size: 12px;
    margin-top: 40px;
    margin-left: -20px;
  }
</style>
