'use strict';

const emojiMap = {
  smile: '😄'
};

function renderEmoji(name) {
  const emoji = emojiMap[name];
  return emoji
    ? `<span class="github-emoji" alias="${name}" role="img" aria-label="${name}">${emoji}</span>`
    : name;
}

hexo.extend.filter.register('before_post_render', data => {
  if (!data['no-emoji']) {
    data.content = data.content.replace(/:(\w+):/gi, (match, name) => emojiMap[name] ? renderEmoji(name) : match);
  }
  return data;
});

hexo.extend.helper.register('emoji', renderEmoji);
hexo.extend.tag.register('emoji', args => renderEmoji(args[0] || ''));
