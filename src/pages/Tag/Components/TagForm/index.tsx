import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Rules } from '@/api/types/form';
import { Button } from '@/components/Button';
import { EmojiList } from '@/components/EmojiList';
import { Form } from '@/components/Form';
import { FormItem } from '@/components/Form/Components/FormItem';
import { MainLayout } from '@/components/MainLayout';
import { createTag, deleteTag, getTag } from '@/api/tags';
import { onError } from '@/utils/onError';
import styles from './index.module.scss';
import { TagDTO } from '@/api/types/tags';
import { Dialog } from 'vant';

const TagForm = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id?.toString());
    const tagName = route.query.tagName?.toString();
    const tagSign = route.query.tagSign?.toString();
    const kind = route.query.kind?.toString() as 'expenses' | 'income';

    const formData = reactive<TagDTO>({
      name: tagName || '',
      sign: tagSign || '',
      id: undefined,
      kind,
    });

    onMounted(async () => {
      if (!id) return;
      const {
        data: { name, sign },
      } = await getTag({ id }).catch(onError);
      Object.assign(formData, { name, sign });
    });

    const rules: Rules[] = [
      { key: 'name', type: 'required', message: '必填' },
      { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填1到4个字符' },
      { key: 'sign', type: 'required', message: '必填' },
    ];

    const submit = async () => {
      if (!formData.kind) throw Error('类型参数缺失');
      await createTag(formData).catch(onError);
      router.back();
    };
    const onDelete = async ({ with_items = false }: { with_items?: boolean }) => {
      await Dialog.confirm({
        title: '确认',
        message: '确认要删除吗？',
      });
      await deleteTag({ id, with_items }).catch(onError);
      router.back();
    };
    return () => (
      <MainLayout title={id ? '编辑标签' : '新建标签'}>
        <Form formData={formData} rules={rules} onSubmit={submit}>
          <FormItem label="标签名" prop="name" />
          <FormItem label={`符号 ${formData.sign}`} prop="sign">
            <EmojiList v-model={formData.sign} />
          </FormItem>
          <p class={styles.tips}>记账时长按标签即可进行编辑</p>
          <FormItem>
            <Button class={[styles.form_item, styles.button]} type="submit">
              提交
            </Button>
          </FormItem>
        </Form>

        {id ? (
          <div class={styles.actions}>
            <Button level="danger" class={styles.removeTags} onClick={() => onDelete({})}>
              删除标签
            </Button>
            <Button
              level="danger"
              class={styles.removeTagsAndItems}
              onClick={() => onDelete({ with_items: true })}
            >
              删除标签和记账
            </Button>
          </div>
        ) : null}
      </MainLayout>
    );
  },
});

export default TagForm;