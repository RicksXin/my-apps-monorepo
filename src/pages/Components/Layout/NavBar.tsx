import { ref, defineComponent } from 'vue';
import { ElAside, ElMenu, ElScrollbar } from 'element-plus';
import config from '@/config';
import NavItem from './NavItem';
import styles from './index.module.less';
import { menuList } from '@/const/menu';

export interface MenuItem {
  id?: string;
  url: string;
  icon?: string;
  name: string;
  children?: MenuItem[];
}

const NavBar = defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
    },
  },
  setup: (props) => {
    let menuItems = ref<MenuItem[]>(menuList);

    // myMenu().then(response => {
    //   menuItems.value = response.data.data
    // })
    const fullName = config.fullName;
    const abbrName = config.abbrName;

    return () => (
      <ElAside class={styles.navbar} width={props.isCollapse ? '65px' : '250px'}>
        <div style="display:flex;flex-direction:column;height:100%;background:#263238;border-right:1px solid #e6e6e6;">
          <div class={styles.logo}>
            {!props.isCollapse ? (
              <div class={styles.normal}>{fullName}</div>
            ) : (
              <div class={styles.mini}>{abbrName}</div>
            )}
          </div>
          <div style="flex:auto;overflow-y:auto;">
            <ElScrollbar height="100%">
              <ElMenu
                class={styles.el_menu_vertical}
                collapse={props.isCollapse}
                router={true}
                background-color="#263238"
                text-color="#afb5bd"
                collapse-transition={false}
                active-text-color="#ffffff"
              >
                {menuItems.value.map((item) => (
                  <NavItem item={item} key={item.id} />
                ))}
              </ElMenu>
            </ElScrollbar>
          </div>
        </div>
      </ElAside>
    );
  },
});
export default NavBar;
