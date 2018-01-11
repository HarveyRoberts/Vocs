<template>
  <v-app class="v-app">
    <v-btn
      color="white"
      fixed
      bottom
      right
      fab
      :class="autoScrollUpBtnClass"
      @click="autoScrollUp"
    >
      <v-icon>arrow_upward</v-icon>
    </v-btn>

    <v-dialog v-model="loading" persistent :content-class="loadingClass">
      <v-card style="background: white">
        <v-card-title>
          <img style="height:30%; width:30%; margin: auto;" :src="vocsLoadingLogo" alt="Vocs">
        </v-card-title>
        <v-card-text>
          <div class="text-xs-center">
            <v-progress-circular indeterminate v-bind:size="50" color="primary"></v-progress-circular>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      top
      multi-line
      v-model="snackbarEnabled"
      style="position: fixed; z-index: 999"
      :timeout="timeout"
    >
      {{ snackbarMessage }}
      <v-btn flat color="blue" @click.native="setSnackbarEnabled">Close</v-btn>
    </v-snackbar>


    <!--Mobile menu drawer-->
    <v-navigation-drawer
      temporary
      right
      v-model="mobileMenuIsOpen"
      style="z-index:999">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          v-if="item.shown"
        >
          <v-list-tile-action >
            <v-icon v-model="item.shown" left color="ligh-blue darken-1">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title > {{item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <!--Dashboard menu drawer-->
    <v-navigation-drawer
      v-if="isLoggedIn"
      clipped
      style="z-index:997;background-color: #2B333E; transition: all 0.4s cubic-bezier(0.6, 0, 0.07, 1); overflow-y: hidden"
      :style="{width: dashboardWidth + 'px'}">
      <div class="white--text text-xs-center ml-3 mr-3" :class="{dashboardAvatarShow: dashboardAvatarStyle, dashboardAvatarHidden: !dashboardAvatarStyle}">
        <v-card style="border-radius: 500px; height: 100px; width:100px; margin:auto; margin-top: 100px" :to="profile.link">
          <img style="height:103%; width:103%; margin: 0; margin-left: -2px; margin-top: -2px; padding: 0; cursor: pointer" src="https://www.practicepanther.com/wp-content/uploads/2017/02/user.png" alt="img-profil" >
        </v-card>
        <h6 class="white--text mt-4">{{user.firstname}} {{user.surname}}</h6>
      </div>
      <v-list style="transition: all 0.4s cubic-bezier(0.6, 0, 0.07, 1)" :style="{marginTop: dashboardMarginTop + 'px'}">
        <v-list-tile
          v-for="item in dashboardMenuItems"
          :key="item.title"
          :to="item.link"
          class="dashboard-nav-tile"
          v-if="item.accountType === role || item.accountType === 'ALL'">
          <v-list-tile-action >
            <v-icon left class="white--text">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title class="white--text"> {{item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          :to="myClassButton.link"
          class="dashboard-nav-tile">
          <v-list-tile-action >
            <v-icon left class="white--text">{{myClassButton.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title class="white--text"> {{myClassButton.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="item in dashboardMenuItems2"
          :key="item.title"
          :to="item.link"
          class="dashboard-nav-tile"
          v-if="item.accountType === role || item.accountType === 'ALL'">
          <v-list-tile-action >
            <v-icon left class="white--text">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title class="white--text"> {{item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="dashboard-nav-tile" @click="deconnect">
          <v-list-tile-action >
            <v-icon left class="white--text">{{deconnectionButton.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title class="white--text"> {{deconnectionButton.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!--Top bar-->
    <v-toolbar v-if="!isLoggedIn" :class="topBarClass" :style="{backgroundColor: topbarColor, color: topbarTextColor}" style="z-index:998; padding-right: 2%; padding-left: 1%;  position: fixed !important" v-scroll="scroll">
      <v-toolbar-title>
        <router-link to="/homepage" tag="span" style="cursor: pointer">
          <div style="display: flex">
            <img :src="vocsLoadingLogo" alt="Vocs" style="height: 30px">
          </div>
        </router-link>
      </v-toolbar-title>
      <!--Space between elements-->
      <v-spacer></v-spacer>
      <!--Group of items-->
      <v-toolbar-items v-for="item in menuItems" :key="item.link" v-if="item.shown" class="hidden-sm-and-down topbar-btn">
        <!--Button-->
        <v-btn style="background: none" :style="{color: topbarTextColor}" class="elevation-0" :class="item.buttonType" :to="item.link">
          <v-icon left color="light-blue darken-1" style="margin-bottom: 3px; margin-right: 7px;">{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      {{user.roles}}
      <v-toolbar-items v-if="profile.shown" class="topbar-btn">
        <v-btn icon @click="showNotifications = !showNotifications">
          <v-badge left style="cursor: pointer">
            <span v-if="amountOfNotifications > 0" slot="badge">{{amountOfNotifications}}</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>

        <!--Button-->
        <v-btn style="background: none" :style="{color: topbarTextColor}" class="elevation-0" :class="profile.buttonType" :to="profile.link">
          <!--<v-icon left color="light-blue darken-1">{{item.icon}}</v-icon>-->
          {{profile.title}}
        </v-btn>
      </v-toolbar-items>
      <!--Hamburger menu
      &click.stop stops probagation -->
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="mobileMenuIsOpen=!mobileMenuIsOpen">

      </v-toolbar-side-icon>

    </v-toolbar>

    <v-toolbar v-if="isLoggedIn" :class="topBarClass" :style="{backgroundColor: topbarColor, color: topbarTextColor}" style="z-index:998; padding-right: 2%; padding-left: 1%;  position: fixed !important">
      <v-toolbar-side-icon @click="dashboardMove">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <div style="display: flex">
          <img v-if="role == 'USER' " :src="vocsLoadingLogo" alt="Vocs" style="height: 30px"><img v-if="role == 'STUDENT'" :src="vocsLoadingLogoWhite" alt="Vocs" style="height: 30px; opacity: 0.9"><img v-if="role == 'PROFESSOR'" :src="vocsLoadingLogoWhite" alt="Vocs" style="height: 30px; opacity: 0.9">
          <div v-if="role == 'USER'" class="blue--text" style="margin-left: -7px; margin-top: 7px">ocs</div><div v-if="role == 'PROFESSOR'" style="margin-left: -7px; margin-top: 7px; color: white; opacity: 0.8">ocs</div>
        </div>
      </v-toolbar-title>
      <!--Space between elements-->
      <v-spacer></v-spacer>
      <div style="margin-right: 2%">{{topbarAccountText}}</div>
      <!--Group of items-->
      <v-toolbar-items v-for="item in menuItems" :key="item.link" v-if="item.shown" class="hidden-sm-and-down topbar-btn">
        <!--Button-->
        <v-btn style="background: none" :style="{color: topbarTextColor}" class="elevation-0" :class="item.buttonType" :to="item.link">
          <v-icon left color="light-blue darken-1">{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="profile.shown" class="topbar-btn">
        <v-btn style="margin-right: 30px" icon v-if="role === 'PROFESSOR'" @click="showDemandsSent = !showDemandsSent">
          <v-badge left>
            <span style="margin: 0" v-if="amountOfDemandsSent > 0" overlap slot="badge">{{amountOfDemandsSent}}</span>
            <v-icon>send</v-icon>
          </v-badge>
        </v-btn>
        <v-btn style="margin-right: 20px; margin-left: 20px" icon v-if="role === 'STUDENT' || role === 'USER'" @click="showNotifications = !showNotifications">
          <v-badge style="margin-right: 20px; margin-left: 20px"  left >
            <span style="margin: 0" v-if="amountOfNotifications > 0" overlap slot="badge">{{amountOfNotifications}}</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
        <v-btn icon v-if="role === 'PROFESSOR'" @click="showNotificationsTeacher = !showNotificationsTeacher">
          <v-badge left style="cursor: pointer">
            <span v-if="amountOfNotifications > 0" slot="badge">{{amountOfNotifications}}</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>

        <!--Button-->
        <v-btn style="background: none" :style="{color: topbarTextColor}" class="elevation-0" :class="profile.buttonType" :to="profile.link">
          <!--<v-icon left color="light-blue darken-1">{{item.icon}}</v-icon>-->
          {{profile.title}}
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-dialog max-width="800" style="width: 80vw; height: 75vh; position: absolute" v-if="showNotifications" v-model="showNotifications">
      <v-card>
        <v-toolbar color="cyan" dark style="position: fixed; width: 52.1vw; z-index: 999">
          <v-btn flat @click.native="showNotifications = false" ><v-icon>close</v-icon></v-btn>
          <v-toolbar-title>Vos Notifications</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line class="pt-5">
          <div class="text-xs-center mt-5" v-if="amountOfNotifications == 0"><h5>Vous n'avez pas de notifications</h5></div>
          <template v-for="demand in notifications.demandReceive">
            <v-divider></v-divider>
            <v-list-tile style="height: 150px">
              <v-list-tile-avatar>
                <v-icon large class="mt-4">school</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content class="mt-4" style="height: 120px">
                <div v-if="demand.classe != null" class="mt-5" style="height: 120px">
                  <strong>Demande pour rejoindre une classe</strong><br>
                  Demande de {{demand.userSend.firstname}} {{demand.userSend.surname}} pour la classe {{demand.classe.name}}</div>
              </v-list-tile-content>
              <v-list-tile-action style="height: 120px" class="mt-5">
                <v-btn dark class="mt-4" color="cyan" @click="deleteDemand(demand.id)">Refuser</v-btn>
                <v-btn v-if="demand.classe != null" dark class="mt-1" color="cyan" @click="addUserToClass(demand.classe.id, demand.userReceive.id); deleteDemand(demand.id)">Accepter</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-dialog>

    <v-dialog max-width="800" style="width: 80vw; height: 75vh; position: absolute" v-if="showDemandsSent" v-model="showDemandsSent">
      <v-card>
        <v-toolbar color="cyan" dark style="position: fixed; width: 52.1vw; z-index: 999">
          <v-btn flat @click.native="showDemandsSent = false" ><v-icon>close</v-icon></v-btn>
          <v-toolbar-title>Vos Demandes</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line class="pt-5">
          <div class="text-xs-center mt-5" v-if="amountOfDemandsSent == 0"><h5>Vous n'avez pas de demandes</h5></div>
          <template v-for="demand in notifications.demandSend">
            <v-divider></v-divider>
            <v-list-tile style="height: 150px">
              <v-list-tile-avatar>
                <v-icon large class="mt-4">school</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content class="mt-4" style="height: 120px">
                <div v-if="demand.classe != null" class="mt-5" style="height: 120px">
                  <strong>Demande pour rejoindre une classe</strong><br>
                  Demande à {{demand.userReceive.firstname}} {{demand.userReceive.surname}} pour votre classe {{demand.classe.name}}</div>
                <div v-else-if="demand.list != null" class="mt-5" style="height: 120px">
                  <strong>Demande pour partage de liste</strong><br>
                  Demande à {{demand.userReceive.firstname}} {{demand.userReceive.surname}} pour votre liste {{demand.list.name}}</div>
                <div v-else-if="demand.wordTrad != null" class="mt-5" style="height: 120px">
                  <strong>Demande pour ajout de synonyme</strong><br>
                  Propose à {{demand.userReceive.firstname}} {{demand.userReceive.surname}} le synonyme {{demand.wordTrad.word.content}} pour le mot {{demand.wordTrad.trad.content}}</div>
              </v-list-tile-content>
              <v-list-tile-action style="height: 120px" class="mt-5">
                <v-btn dark class="mt-4" color="cyan" @click="deleteDemand2(demand.id)">Retirer</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-dialog>

    <v-dialog max-width="800" style="width: 80vw; height: 75vh; position: absolute" v-if="showNotificationsTeacher" v-model="showNotificationsTeacher">
      <v-card>
        <v-toolbar color="cyan" dark style="position: fixed; width: 52.1vw; z-index: 999">
          <v-btn flat @click.native="showNotificationsTeacher = false" ><v-icon>close</v-icon></v-btn>
          <v-toolbar-title>Vos Notifications</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line class="pt-5">
          <div class="text-xs-center mt-5" v-if="amountOfNotifications == 0"><h5>Vous n'avez pas de notifications</h5></div>
          <template v-for="demand in notifications.demandReceive">
            <v-divider></v-divider>
            <v-list-tile style="height: 150px">
              <v-list-tile-avatar>
                <v-icon large class="mt-4">school</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content class="mt-4" style="height: 120px">
                <div v-if="demand.classe != null" class="mt-5" style="height: 120px">
                  <strong>Demande pour rejoindre votre classe</strong><br>
                  Demande de {{demand.userSend.firstname}} {{demand.userSend.surname}} pour votre classe {{demand.classe.name}}</div>
                <div v-else-if="demand.list != null" class="mt-5" style="height: 120px">
                  <strong>Demande pour partage de liste</strong><br>
                  {{demand.userSend.firstname}} {{demand.userSend.surname}} veut partager sa liste avec vous !</div>
                <div v-else-if="demand.wordTrad != null" class="mt-5" style="height: 120px">
                  <strong>Demande pour ajout de synonyme</strong><br>
                  {{demand.userSend.firstname}} {{demand.userSend.surname}} propose le synonyme {{demand.wordTrad.word.content}} pour le mot {{demand.wordTrad.trad.content}}</div>
              </v-list-tile-content>
              <v-list-tile-action style="height: 120px" class="mt-5">
                <v-btn dark class="mt-4" color="cyan" @click="deleteDemand(demand.id)">Refuser</v-btn>
                <v-btn v-if="demand.classe != null" dark class="mt-1" color="cyan" @click="addUserToClass(demand.classe.id, demand.userSend.id); deleteDemand(demand.id)">Accepter</v-btn>
                <v-btn v-else-if="demand.list != null" dark class="mt-1" color="cyan" @click="addListToUser(demand.list.id, demand.userSend.id); deleteDemand(demand.id)">Accepter</v-btn>
                <v-btn v-else-if="demand.wordTrad != null" dark class="mt-1" color="cyan" @click="addSynonyme(demand), deleteDemand(demand.id)">Accepter</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-dialog>

    <main>
      <!--<div style="position: fixed; z-index: 999"><h1>{{offsetTop}}</h1></div>-->
      <!--      <br>
            <br>
            SelectedListForGame:{{getSelectedListForGame}}
            <br>
            <br>
            LoadedLists: {{getLoadedLists}}
            <br>
            <br>
            SelectedList: {{getSelectedList}}-->
      <v-content>
        <v-container fluid :class="mainClass">
          <div v-if="isLoggedIn === true"><!--{{getLoadedLists}}{{user}}--></div>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        vocsLoadingLogo: require('@/assets/logoFlat.png'),
        vocsLoadingLogoGrey: require('@/assets/logoFlatGrey.png'),
        vocsLoadingLogoWhite: require('@/assets/logoFlatWhite.png'),
        resource: '',
        timeout: 0,
        mobileMenuIsOpen: false,
        dashboardMenuItems: [
          {icon: 'home', title: 'Principal', link: '/home', accountType: 'ALL'},
          {icon: 'play_arrow', title: 'Exercises', link: '/games', accountType: 'ALL'},
          {icon: 'description', title: 'Listes', link: '/lists', accountType: 'ALL'}
        ],
        dashboardMenuItems2: [
          {icon: 'show_chart', title: 'Statistiques', link: '/statistics', accountType: 'ALL'},
          {icon: 'tune', title: 'Réglages', link: '/settings', accountType: 'ALL'}
        ],
        deconnectionButton: {
          icon: 'close',
          title: 'Déconnexion',
          link: '/homepage'},
        offsetTop: 0,
        oldOffsetTop: 0,
        topBarClass: 'top-bar-show',
        autoScrollUpBtnClass: 'auto-scroll-up-btn-hide',
        roles: [
          {title: 'USER'},
          {title: 'STUDENT'},
          {title: 'PROFESSOR'}
        ],
        mainClass: 'dashboard-closed',
        dashboardClass: 'dashboard-move-right',
        dashboardWidth: 300,
        dashboardAvatarStyle: true,
        dashboardMarginTop: 20,
        showNotifications: false,
        showNotificationsTeacher: false,
        showDemandsSent: false
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      menuItems () {
        return [
          {icon: '', title: 'A Propos', link: '/about', shown: !this.isLoggedIn, buttonType: 'btn--round', class: 'btn-round'},
          {icon: 'perm_identity', title: 'Connexion', link: '/connection', shown: !this.isLoggedIn, buttonType: 'btn--round', class: 'btn-round'},
          {icon: 'assignment', title: 'Inscription', link: '/inscription', shown: !this.isLoggedIn, buttonType: 'btn--round', class: 'btn-round'}
        ]
      },
      myClassButton () {
        return {icon: 'school', title: this.classButtonText, link: this.classButtonLink}
      },
      hasClass () {
        return JSON.stringify(this.$store.getters.classes) !== '[]'
      },
      classButtonText () {
        if (this.$store.getters.roles === 'PROFESSOR') {
          return 'Mes Classes'
        } else if (this.$store.getters.roles === 'STUDENT' && this.hasClass === false) {
          return 'Rejoindre Une Classe'
        } else if (this.$store.getters.roles === 'STUDENT' && this.hasClass === true) {
          return 'Ma Classe'
        } else if (this.$store.getters.roles === 'USER') {
          return 'Rejoindre Une Classe'
        } else {
          return 'Rejoindre Une Classe'
        }
      },
      classButtonLink () {
        if (this.$store.getters.roles === 'PROFESSOR') {
          return '/classes'
        } else if (this.$store.getters.roles === 'STUDENT' && this.hasClass === false) {
          return '/joinclass'
        } else if (this.$store.getters.roles === 'STUDENT' && this.hasClass === true) {
          return '/class'
        } else if (this.$store.getters.roles === 'USER') {
          return '/joinclass'
        } else {
          return '/joinclass'
        }
      },
      profile () {
        return {icon: 'account_circle', title: 'Profil', link: '/profil', shown: this.isLoggedIn, buttonType: 'btn--round', class: 'btn-round'}
      },
      getSelectedList () {
        return this.$store.getters.getSelectedList
      },
      getSelectedWord () {
        return this.$store.getters.getSelectedWord
      },
      getSelectedListForGame () {
        return this.$store.getters.getSelectedListForGame
      },
      getLoadedLists () {
        return this.$store.getters.loadedLists
      },
      role () {
        return this.$store.getters.roles
      },
      user () {
        return this.$store.getters.user
      },
      users () {
        return this.$store.getters.users
      },
      topbarColor () {
        if (this.role === 'STUDENT') {
          return '#36c0ff'
        } else if (this.role === 'PROFESSOR') {
          return '#FFB74D'
        } else {
          return 'white'
        }
      },
      topbarTextColor () {
        if (this.role === 'STUDENT') {
          return 'white'
        } else if (this.role === 'PROFESSOR') {
          return 'white'
        } else {
          return '#7f7f7f'
        }
      },
      topbarAccountText () {
        if (this.role === 'STUDENT') {
          return 'Compte Élève'
        } else if (this.role === 'PROFESSOR') {
          return 'Compte Professeur'
        } else {
          return 'Compte Libre'
        }
      },
      loading () {
        return this.$store.getters.loading
      },
      loadingClass () {
        if (this.$store.getters.loading === true) {
          return 'loadingClass'
        } else {
          return 'notLoadingClass'
        }
      },
      amountOfNotifications () {
        return this.$store.getters.myDemands.demandReceive.length
      },
      notifications () {
        return this.$store.getters.myDemands
      },
      amountOfDemandsSent () {
        return this.$store.getters.myDemands.demandSend.length
      },
      snackbarMessage () {
        return this.$store.getters.snackbarMessage
      },
      snackbarEnabled () {
        return this.$store.getters.snackbarIsEnabled
      }
    },
    watch: {
      isLoggedIn: function (val) {
        if (val === true) {
          this.mainClass = 'dashboard-open'
        } else {
          this.mainClass = 'dashboard-closed'
        }
      }
    },
    methods: {
      deconnect () {
        this.$store.dispatch('logout')
        this.$router.push('/homepage')
      },
      scroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        if (this.offsetTop > this.oldOffsetTop && this.isLoggedIn === false) {
          this.topBarClass = 'top-bar-hide'
        } else if (this.offsetTop < this.oldOffsetTop && this.isLoggedIn === false) {
          this.topBarClass = 'top-bar-show'
        } else if(this.isLoggedIn){
          this.topBarClass = 'top-bar-show'
        }
        this.oldOffsetTop = this.offsetTop
        if (this.offsetTop > 750) {
          this.autoScrollUpBtnClass = 'auto-scroll-up-btn-show'
        }
        if (this.offsetTop < 750) {
          this.autoScrollUpBtnClass = 'auto-scroll-up-btn-hide'
        }
      },
      autoScrollUp () {
        document.documentElement.scrollTop = 0
      },
      setRole (account) {
        this.$store.dispatch('setRoles', account)
      },
      dashboardMove () {
        if (this.mainClass === 'dashboard-half-open') {
          this.mainClass = 'dashboard-open';
          this.dashboardWidth = 300;
          this.dashboardMarginTop = 20;
          this.dashboardAvatarStyle = true;
        } else if (this.mainClass === 'dashboard-open') {
          this.mainClass = 'dashboard-half-open';
          this.dashboardAvatarStyle = false;
          this.dashboardWidth = 60;
          this.dashboardMarginTop = -210;
        }
      },
      deleteDemand (id) {
        this.$store.dispatch('deleteDemand', id)
      },
      deleteDemand2 (id) {
        this.$store.dispatch('deleteDemand2', id)
      },
      addUserToClass (idClass, idUser) {
        var toSendOff = {
          classId: idClass,
          userId: idUser
        }
        this.$store.dispatch('addUserToClass', toSendOff)
      },
      addListToUser (idList, idUser) {
        var toSendOff = {
          listId: idList,
          userId: idUser,
        }
        this.$store.dispatch('addListToUser', toSendOff)
      },
      setSnackbarEnabled () {
        this.$store.dispatch('setSnackbarIsEnabled', false)
      },
      beforeunload () {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
      },
      addSynonyme(demand) {
        this.$store.dispatch('addSynonyme',demand)
      }
    },
    created () {
      if (this.isLoggedIn === true || (localStorage.getItem('userEmail') && localStorage.getItem('userPassword'))) {
        this.mainClass = 'dashboard-open'
        this.$router.push('/home')
      } else {
        this.mainClass = 'dashboard-closed'
        this.$router.push('/homepage')
      }
      this.$store.dispatch('getSchools')
      this.$store.dispatch('autoLoginIn')
      document.addEventListener('beforeunload', this.beforeunload)
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
</style>

<style>
  .v-app {
    background-color: #eeeeee;
  }
  .dashboard-closed {
    margin-left: 0px;
    padding:0;
    padding-right: 0;
    transition: all 0.4s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .dashboard-half-open {
    margin-left: 60px;
    padding:0;
    padding-right: 60px;
    transition: all 0.4s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .dashboard-open {
    margin-left: 300px;
    padding:0;
    padding-right: 300px;
    transition: all 0.4s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .auto-scroll-up-btn-hide {
    transform: translateX(150%);
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .auto-scroll-up-btn-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .topbar-btn {
    height:38px;
  }
  .top-bar-show {
    transition: transform 1s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .top-bar-hide {
    transform: translateY(-110%);
    transition: transform 1s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .dashboard-nav-tile:hover {
    transition: border-left 0.3s;
    border-left: 3px solid #00adff;
  }
  .dashboardAvatarShow {
    opacity: 1;
    transition: opacity 0.8s;
    transition-delay: 0.3s;
  }
  .dashboardAvatarHidden {
    opacity: 0;
    transition: opacity 0.15s;
  }
  .loadingClass {
    bottom: 35vh;
    transition: all 0.6s cubic-bezier(0.6, 0, 0.07, 1);;
    z-index: 999;
    position: absolute;
  }
  .notLoadingClass {
    bottom: 100vh;
    transition: all 1s cubic-bezier(0.6, 0, 0.07, 1), bottom 1s  cubic-bezier(0.6, 0, 0.07, 1);
    z-index: 999;
    position: absolute;
  }


</style>

