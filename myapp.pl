#!/usr/bin/env perl
use Mojolicious::Lite -signatures;
use Mojo::Util qw/dumper md5_sum trim/;
use Mojo::File;
use Mojo::DOM;
use lib "$FindBin::Bin/./lib";

plugin 'Vue3::SFC' => { base => './components', auto_routes => 1 };


app->start;

__DATA__
@@ index.html.ep
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script src="https://unpkg.com/vue@3.2.37"></script>
    <script src="https://unpkg.com/vue-router@4"></script>
    <script type="module">
      import App from "/app.js";
      const app = Vue.createApp(App);
      app.use(VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes: App.routes
      }));
      app.mount("#app");
    </script>
  </head>
    <body>
      <div id="app">
	<router-view></router-view>
      </div>
    </body>
</html>

