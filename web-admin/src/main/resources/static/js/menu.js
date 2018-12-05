/**
 * Created by chengwb on 2017/3/27.
 */
(function (global, $, undefined) {
    global.project = global.project || {};
    global.project.menu = [
        {
            id: 'user_role_mgr_menu',
            name: '用户及权限管理',
            subMenus: [
                {
                    id: 'user_mgr',
                    name: '用户管理',
                    subMenus: []
                },
                {
                    id: 'role_mgr',
                    name: '角色管理',
                    subMenus: []
                }
            ]
        }
    ];

    global.project.getMenuIdByName = function(menus, name) {
        var menuName;
        if(!menus || menus.length === 0 || !name) {
            return;
        }

        for(var i = 0; i < menus.length; i++) {
            var menu = menus[i];
            if(menu.name === name) {
                return menu.id;
            } else if(menu.subMenus && menu.subMenus.length > 0) {
                menuName = global.project.getMenuIdByName(menu.subMenus, name);
                if(menuName) {
                    return menuName;
                }
            }
        }

        return;
    };

    global.project.getMenuNameById = function(menus, id) {
        var menuId;

        if(!menus || menus.length === 0 || !id) {
            return;
        }

        for(var i = 0; i < menus.length; i++) {
            var menu = menus[i];
            if(menu.id === id) {
                return menu.name;
            } else if(menu.subMenus && menu.subMenus.length > 0) {
                menuId = global.project.getMenuIdByName(menu.subMenus, id);
                if(menuId) {
                    return menuId;
                }
            }
        }

        return;
    };

})(window, jQuery);