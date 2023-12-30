import { onMounted } from 'vue';
import { config } from '@/config/index';

const usePixelArt = () => {
  function generateInitPixels() {
    const result = [];
    for (let i = 0; i < config.width; ++i) {
      for (let j = 0; j < config.height; ++j) {
        result.push({
          x: j,
          y: i,
        });
      }
    }
    return result;
  }

  // onMounted(() => {
  //   document
  //     .querySelector('.generate-css')
  //     .addEventListener('click', function () {
  //       document.querySelector('.error').classList.remove('active');
  //       document.getElementById('popup-pixel-art').innerHTML = `
  //       <h2>Pixel Art Code</h2>
  //       <p>Copy the code below to use this on your webpage</p>
  //       <div class="close"><i class="fal fa-times"></i></div>`;

  //       let boxShadow = `.pixelart {
  //           width: 1px;
  //           height: 1px;
  //           transform: scale(5);
  //           background: transparent;
  //           box-shadow: `;

  //       document.querySelectorAll('.pixel').forEach(function (item) {
  //         if (
  //           item.getAttribute('data-color') !== 'null' &&
  //           item.getAttribute('data-color') !== null
  //         ) {
  //           const x = item.getAttribute('data-x-coordinate');
  //           const y = item.getAttribute('data-y-coordinate');
  //           const color = item.getAttribute('data-color');

  //           boxShadow += `${x}px ${y}px ${color}, `;
  //         }
  //       });
  //       boxShadow = boxShadow.slice(0, -2);
  //       boxShadow = `${boxShadow};
  //   }`;

  //       let boxShadowCode = `
  //   &lt;<span class="token tag">div</span> <span class="token attr-name">class</span>="<span class="token attr-value">pixelart</span>">&lt;/<span class="token attr-name">div</span>>
  //   &lt;<span class="token tag">style</span> <span class="token attr-name">type</span>="<span class="token attr-value">text/css</span>">
  //   <span class="token selector">.pixelart</span> {
  //       <span class="token property">width</span>: <span class="token number">1</span>px;
  //       <span class="token property">height</span>: <span class="token number">1</span>px;
  //       <span class="token property">transform</span>: scale(<span class="token number">20</span>);
  //       <span class="token property">background</span>: transparent;
  //       <span class="token property">box-shadow</span>: `;

  //       document.querySelectorAll('.pixel').forEach(function (item) {
  //         if (
  //           item.getAttribute('data-color') !== 'null' &&
  //           item.getAttribute('data-color') !== null
  //         ) {
  //           const x = item.getAttribute('data-x-coordinate');
  //           const y = item.getAttribute('data-y-coordinate');
  //           const color = item.getAttribute('data-color');

  //           boxShadowCode += `<span class="token number">${x}</span><span class="token unit">px</span> <span class="token number">${y}</span><span class="token unit">px</span> ${color}, `;
  //         }
  //       });

  //       boxShadowCode = boxShadowCode.slice(0, -2);
  //       boxShadowCode = `${boxShadowCode};
  //   }
  //   &lt;/<span class="token tag">style</span>>`;

  //       const newStyle = document.createElement('style');
  //       newStyle.innerHTML = boxShadow;
  //       document.body.append(newStyle);

  //       const newPixelArt = document.createElement('div');
  //       newPixelArt.classList.add('pixelart');
  //       document.getElementById('popup-pixel-art').append(newPixelArt);

  //       const newCodeBlock = document.createElement('pre');
  //       newCodeBlock.innerHTML = `<code>${boxShadowCode}</code>`;
  //       document.getElementById('popup-pixel-art').append(newCodeBlock);

  //       document.getElementById('popup-pixel-art').classList.add('active');
  //     });

  //   document.body.addEventListener('click', function (e) {
  //     if (
  //       (!parent(e.target, '#popup-pixel-art', 1).matches('#popup-pixel-art') &&
  //         !e.target.matches('#popup-pixel-art') &&
  //         !e.target.matches('.generate-css') &&
  //         !e.target.matches('.generate-css-span')) ||
  //       parent(e.target, '.close', 1).matches(
  //         '.close' || e.target.matches('.close'),
  //       )
  //     ) {
  //       document.getElementById('popup-pixel-art').classList.remove('active');
  //     }
  //   });

  //   const parent = function (el, match, last) {
  //     const result = [];
  //     for (let p = el && el.parentElement; p; p = p.parentElement) {
  //       result.push(p);
  //       if (p.matches(match)) {
  //         break;
  //       }
  //     }
  //     if (last == 1) {
  //       return result[result.length - 1];
  //     } else {
  //       return result;
  //     }
  //   };
  // });

  return {
    generateInitPixels,
  };
};

export default usePixelArt;
