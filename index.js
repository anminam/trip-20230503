const currentModule = (initEl) => {
  let _item = initEl;
  return {
    setItem: (el) => {
      _item = el;
    },
    activate: () => {
      // debugger;
      _item.classList.add('visible');
      //console.log(_item.classList);
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

  return {
    init: () => {
      initImageDisable();
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

      window.addEventListener('scroll', () => {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
          const tSTep = elSteps[i];
          if (!tSTep) continue;

          if (isVisible(tSTep)) {
            _currentItem.inActivate();
            _currentItem.setItem(imgItems[tSTep.dataset.index]);
            _currentItem.activate();
          }
        }
      });
    },
  };
};
commonModule().init();
