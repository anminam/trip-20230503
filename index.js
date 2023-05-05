import jsonContent from './assets/index.json' assert { type: 'json' };

const currentModule = (initEl) => {
  let _item = initEl;
  return {
    setItem: (el) => {
      _item = el;
    },
    activate: () => {
      _item.classList.add('visible');
    },
    inActivate: () => {
      _item.classList.remove('visible');
    },
  };
};

const commonModule = () => {
  let _currentItem;

  function initImageDisable() {
    setTimeout(() => {
      document.querySelector('.scroll-graphic').classList.remove('none');
    }, 1000);
  }

  function isVisible(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top > window.innerHeight * 0.1 && rect.top < window.innerHeight * 0.8
    );
  }

  function getTextItems(list, attr) {
    return list.map((item) => getTextItem(item.msg)).join('');
  }

  function getTextItem(msg) {
    return `<div class="step">` + `<p>${msg}</p>` + `</div>`;
  }

  function getImageItems(list) {
    return list.map((item) => getImageItem(item.img)).join('');
  }

  function getImageItem(path) {
    return (
      `<div class="img-item">` +
      `<img class="scene-img" src="images/${path}" alt="" />` +
      `</div>`
    );
  }

  function handlerSizeChanged(e) {
    updateYoutubeSize();
  }

  function updateYoutubeSize() {
    const el = document.querySelector('.youtube');
    const rect = el.getBoundingClientRect();
    el.style.height = `${rect.width * 0.56}px`;
  }

  return {
    init: () => {
      initImageDisable();
      updateYoutubeSize();
      document.querySelector('.container-texts').innerHTML = getTextItems(
        jsonContent.list
      );
      document.querySelector('.container-images').innerHTML = getImageItems(
        jsonContent.list
      );
      const elSteps = document.querySelectorAll('.step');
      const imgItems = document.querySelectorAll('.img-item');
      _currentItem = currentModule(imgItems[0]);
      // _currentItem.activate();
      let ioIndex;

      const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
      });

      for (let i = 0; i < elSteps.length; i++) {
        io.observe(elSteps[i]);
        elSteps[i].dataset.index = i;
        imgItems[i].dataset.index = i;
      }
      window.addEventListener('resize', handlerSizeChanged);
      window.addEventListener('scroll', () => {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
          const tSTep = elSteps[i];
          if (!tSTep) continue;
          if (!isVisible(tSTep)) continue;

          _currentItem.inActivate();
          _currentItem.setItem(imgItems[tSTep.dataset.index]);
          _currentItem.activate();
        }
      });
    },
  };
};
commonModule().init();
