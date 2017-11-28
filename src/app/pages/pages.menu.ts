export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'checkouts',
        data: {
          menu: {
            title: 'general.menu.checkouts',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'clientes',
        data: {
          menu: {
            title: 'general.menu.clientes',
            icon: 'ion-cash',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'empleados',
        data: {
          menu: {
            title: 'general.menu.empleados',
            icon: 'ion-social-usd-outline',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'ordenes',
        data: {
          menu: {
            title: 'general.menu.ordenes',
            icon: 'ion-social-usd',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'puestos',
        data: {
          menu: {
            title: 'general.menu.puestos',
            icon: 'ion-android-list',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'tipotrabajos',
        data: {
          menu: {
            title: 'general.menu.tipotrabajos',
            icon: 'ion-cube',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'trabajos',
        data: {
          menu: {
            title: 'general.menu.trabajos',
            icon: 'ion-ios-list-outline',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'admin',
        data: {
          menu: {
            title: 'general.menu.admin',
            icon: 'ion-person-stalker',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'users',
            data: {
              menu: {
                title: 'general.menu.usuarios',
                icon: 'ion-person-stalker',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'groups',
            data: {
              menu: {
                title: 'general.menu.grupos',
                icon: 'ion-ios-people',
                selected: false,
                expanded: false,
                order: 1
              }
            }
          },
          {
            path: 'permisos',
            data: {
              menu: {
                title: 'general.menu.permisos',
                icon: 'ion-person-stalker',
                selected: false,
                expanded: false,
                order: 2
              }
            }
          },
          {
            path: 'modulos',
            data: {
              menu: {
                title: 'general.menu.modulos',
                icon: 'ion-social-buffer',
                selected: false,
                expanded: false,
                order: 3
              }
            }
          }
        ]
      }
    ]
  }
];
