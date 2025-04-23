import { ElMenuItem, ElSubMenu } from 'element-plus';
import { defineComponent, PropType } from 'vue';
import { MenuItem } from './NavBar';

const NavItem = defineComponent({
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true,
    },
  },
  setup: ({ item }) => {
    // const icon = computed(() => (name: string) => {
    //   return name;
    // });
    return () => (
      <>
        {item.children ? (
          <ElSubMenu index={item.url} v-slots={{
            title: () => {
              return <div>
                {/* {item.icon ? (
                  <ElIcon>
                    <component is={icon.value(item.icon)} />
                  </ElIcon>
                ) : null} */}
                <span>{item.name}</span>
              </div>
            },
            default: () => {
              return <>{item.children?.map((children) => (<div key={children.url}>
                {children.children ? (
                  <NavItem item={children} />
                ) : (
                  <ElMenuItem index={children.url}>
                    {/* {children.icon ? (
                      <ElIcon>
                        <component is={icon.value(children.icon)} />
                      </ElIcon>
                    ) : null} */}
                    {children.name}
                  </ElMenuItem>
                )}
              </div>
              ))}</>
            }
          }}>
          </ElSubMenu>
        ) : (
          <ElMenuItem index={item.url}>
            {/* {item.icon ? (
              <ElIcon>
                <component is={icon.value(item.icon)} />
              </ElIcon>
            ) : null} */}
            <span>{item.name}</span>
          </ElMenuItem>
        )}
      </>
    );
  },
});
export default NavItem;
