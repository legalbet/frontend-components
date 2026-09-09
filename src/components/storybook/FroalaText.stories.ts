import { SeoText } from '@/types/external-types';
export default {
  title: 'Features/Elements/FroalaText',
  tags: ['autodocs'],
};

const text = `
<h1>Заголовок 1</h1>
<h2>Заголовок 2</h2>
<h3>Заголовок 3</h3>
<h4>Заголовок 4</h4>
<h5>Заголовок 5</h5>
<h6>Заголовок 4</h6>
<p>Основной текст с <u>базовыми</u> <s>элементами</s> <span style="color: rgb(44, 130, 201);">форматирования</span> и <span class="hint fr-deletable" contenteditable="false"><span class="hint-inner">подсказка</span>&nbsp;</span>&nbsp; ссылками, а также эмодзи ⚽, выделением <strong>текста</strong>, <em>кастомным</em> цветом и<a class="allowed-target" data-goal-click="click-chitajte-takzhe-v-novostyah" data-goal-param-label="undefined/undefined" href="http://google.com" rel="nofollow" target="_blank"> базовыми функциями</a>:<span class="fr-emoticon fr-deletable">😲&nbsp;</span></p>
<ul>
	<li>с</li>
	<li>п</li>
	<li>и</li>
	<li>с</li>
	<li>к</li>
	<li>а</li>
</ul>

<p>А также нумерованного:</p>
<ol>
	<li>с</li>
	<li>п</li>
	<li>и</li>
	<li>с</li>
	<li>к</li>
	<li>а</li>
</ol>
<p dir="ltr">
<strong>Прогноз</strong>: П2 за коэф <a class="allowed-target" href="https://legalbet.ru/go/bk-leon/?id=261&amp;referer=https%3A%2F%2Fru-d29.legalbet.b33.io%2Fmatch-center%2Fkaysar-kairat-07-05-2026%2F" rel="nofollow" target="_blank" data-referer="true">1.72</a>

</p>`;

export const Colors = () => ({
  components: { SeoText },
  template: `
    <SeoText
      :text="text"
    />
  `,
  data() {
    return {
      text,
    };
  },
});
