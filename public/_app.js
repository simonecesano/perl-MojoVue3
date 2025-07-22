const routes = [
    { path: "/",          component: () => import("/components/chart.js") },
    { path: "/hello",     component: () => import("/hello.js") },
    { path: "/composite", component: () => import("/components/composite.js") },
    { path: "/nested",    component: () => import("/components/base.js") },
];

export default { routes };
