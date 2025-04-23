import { computed, defineComponent, ref } from 'vue';
import { emojiList } from '@/utils/emojiList';
import styles from './index.module.scss';

export const EmojiList = defineComponent({
  setup: (props, context) => {
    const refSelected = ref(0);
    const table: [string, string[]][] = [
      [
        '表情',
        [
          'face-smiling',
          'face-affection',
          'face-tongue',
          'face-hand',
          'face-neutral-skeptical',
          'face-sleepy',
          'face-unwell',
          'face-hat',
          'face-glasses',
          'face-concerned',
          'face-negative',
          'face-costume',
        ],
      ],
      [
        '手势',
        [
          'hand-fingers-open',
          'hand-fingers-partial',
          'hand-single-finger',
          'hand-fingers-closed',
          'hands',
          'hand-prop',
          'body-parts',
        ],
      ],
      [
        '人物',
        [
          'person',
          'person-gesture',
          'person-role',
          'person-fantasy',
          'person-activity',
          'person-sport',
          'person-resting',
        ],
      ],
      ['衣服', ['clothing']],
      [
        '动物',
        [
          'cat-face',
          'monkey-face',
          'animal-mammal',
          'animal-bird',
          'animal-amphibian',
          'animal-reptile',
          'animal-marine',
          'animal-bug',
        ],
      ],
      ['植物', ['plant-flower', 'plant-other']],
      ['自然', ['sky & weather', 'science']],
      [
        '食物',
        [
          'food-fruit',
          'food-vegetable',
          'food-prepared',
          'food-asian',
          'food-marine',
          'food-sweet',
        ],
      ],
      ['运动', ['sport', 'game']],
    ];
    const selectCategory = (index: number) => {
      refSelected.value = index;
    };
    const selectIcon = (i: string) => {
      context.emit('update:modelValue', i);
    };
    const emojis = computed(() => {
      return table[refSelected.value][1].map((category) => {
        return emojiList
          .find((item) => item[0] === category)?.[1]
          .map((i) => (
            <li class={styles.selected} onClick={() => selectIcon(i)}>
              {i}
            </li>
          ));
      });
    });
    return () => (
      <div class={styles.emoji_list}>
        <nav>
          {table.map((item, index) => (
            <span
              class={index === refSelected.value ? styles.selected : ''}
              onClick={() => selectCategory(index)}
            >
              {item[0]}
            </span>
          ))}
        </nav>
        <ol>{emojis.value}</ol>
      </div>
    );
  },
});
