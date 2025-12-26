document.querySelector('#web_bg')
  .setAttribute(
    'style',
    `background-image: ${document.querySelector('.banner').style.background.split(' ')[0]};position: fixed;top:0;left:0;width: 100%;height: 100%;z-index: 0;background-size: cover;`
  );

// 保留 Banner 自身背景作为回退，避免因图片未加载而无背景
//document.querySelector("#banner").setAttribute('style', 'background-image: url()')

// 可选：移除遮罩提升可见度，如需保留请注释
document.querySelector("#banner .mask")
  .setAttribute('style', 'background-color:rgba(0,0,0,0)')