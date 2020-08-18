<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg12">
        <q-toolbar-title>{{$route.name[0].toUpperCase() + $route.name.substring(1)}}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="200"
      content-class="bg12 "
      :width="100"
    >
      <div class="row full-height">
        <div class="col-12" align="center">
          <div
            v-ripple
            :class="$route.name == 'year' ? 'bg4' : ''"
            class="relative-position cursor-pointer border-left"
            @click="$route.name == 'year' ? null : $router.push('/year')"
          >
            <div
              class="absolute"
              style="left:0;"
              :class="$route.name == 'year' ? 'border-active' : 'border-noactive'"
            ></div>
            <div class="q-py-md">
              <q-icon size="md" name="far fa-calendar-alt"></q-icon>
              <div class="q-mt-xs text-bold">
                <span>Year</span>
              </div>
            </div>
          </div>

          <div
            v-ripple
            :class="$route.name == 'data' ? 'bg4 ' : ''"
            class="relative-position cursor-pointer"
            @click="$route.name == 'data' ? null : $router.push('/data')"
          >
            <div
              class="absolute"
              style="left:0;"
              :class="$route.name == 'data' ? 'border-active' : 'border-noactive'"
            ></div>
            <div class="q-py-md">
              <q-icon size="md" name="fas fa-file-alt"></q-icon>
              <div class="q-mt-xs text-bold">
                <span>Data</span>
              </div>
            </div>
          </div>

          <div
            v-ripple
            :class="$route.name == 'user' ? 'bg4 ' : ''"
            class="relative-position cursor-pointer"
            @click="$route.name == 'user' ? null : $router.push('/user')"
          >
            <div
              class="absolute"
              style="left:0;"
              :class="$route.name == 'user' ? 'border-active' : 'border-noactive'"
            ></div>
            <div class="q-py-md">
              <q-icon size="md" name="fas fa-user-plus"></q-icon>
              <div class="q-mt-xs text-bold">
                <span>User</span>
              </div>
            </div>
          </div>

          <div
            v-ripple
            :class="$route.name == 'profile' || $route.name == 'profileEdit' ? 'bg4 ' : ''"
            class="relative-position cursor-pointer"
            @click="$route.name == 'profile' ? null : $router.push('/profile')"
          >
            <div
              class="absolute"
              style="left:0;"
              :class="$route.name == 'profile' || $route.name == 'profileEdit' ? 'border-active' : 'border-noactive'"
            ></div>
            <div class="q-py-md">
              <q-icon size="md" name="fas fa-user"></q-icon>
              <div class="q-mt-xs text-bold">
                <span>Profile</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 self-end" align="center">
          <div
            v-ripple
            :class="$route.name == 'logout' ? 'bg4 ' : ''"
            class="relative-position cursor-pointer"
            @click="$route.name == 'logout' ? null : $router.push('/logout')"
          >
            <div
              class="absolute"
              style="left:0;"
              :class="$route.name == 'logout' ? 'border-active' : 'border-noactive'"
            ></div>
            <div class="q-py-md">
              <q-icon size="md" name="fas fa-sign-out-alt"></q-icon>
              <div class="q-mt-xs text-bold">
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view class="container" />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
};
</script>


<style >
.border-active {
  border-left: 5px solid #fff;
  width: 5px;
  height: 100%;
}

.border-noactive {
  border-left: 5px solid #020b3b;
}
</style>
