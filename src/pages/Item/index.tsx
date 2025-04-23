import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

const ItemPage = defineComponent({
  setup: () => () => <RouterView />,
});

export default ItemPage;