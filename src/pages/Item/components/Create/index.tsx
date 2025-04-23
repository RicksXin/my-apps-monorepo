import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '@/components/MainLayout';
import { Tabs } from '@/components/Tabs';
import { Tab } from '@/components/Tabs/Tab';
import { InputPad } from '@/components/InputPad';
import { createItems } from '@/api/item';
import { ItemCreateDTO } from '@/api/types/items';
import { onError } from '@/utils/onError';
import Tags from './Tags';
import styles from './index.module.scss';

const ItemCreate = defineComponent({
  setup: (props, context) => {
    const formData = reactive<ItemCreateDTO>({
      kind: 'expenses',
      tag_id: '',
      amount: 0,
      happen_at: new Date().toISOString(),
    });
    const router = useRouter();
    const onSubmit = async () => {
      if (!formData.tag_id || !formData.amount) return;
      await createItems({
        ...formData,
        tag_ids: [formData.tag_id],
      }).catch(onError);
      router.push('/items');
    };
    return () => (
      <MainLayout title="记一笔">
        <div class={styles.wrapper}>
          <Tabs v-model:selected={formData.kind} class={styles.tabs}>
            <Tab id="expenses" name="支出" class={styles.tags_wrapper}>
              <Tags v-model:selected={formData.tag_id} kind="expenses" key="expenses" />
            </Tab>
            <Tab id="income" name="收入" class={styles.tags_wrapper}>
              <Tags v-model:selected={formData.tag_id} kind="income" key="income" />
            </Tab>
          </Tabs>
          <div class={styles.inputPad_wrapper}>
            <InputPad
              v-model:happenAt={formData.happen_at}
              v-model:amount={formData.amount}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </MainLayout>
    );
  },
});
export default ItemCreate;