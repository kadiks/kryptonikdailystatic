import $ from 'jquery';
import velocity from 'velocity-animate';
import VelocityUI from 'velocity-ui-pack'; // eslint-disable-line no-unused-vars
import Counter from 'countup.js';

class App {

  get WINDOW_HEIGHT() {
    return this.windowHeight;
  }
  set WINDOW_HEIGHT(windowHeight) {
    this.windowHeight = windowHeight;
  }

  get WINDOW_WIDTH() {
    return this.windowWidth;
  }
  set WINDOW_WIDTH(windowWidth) {
    this.windowWidth = windowWidth;
  }

  get currentPageIndex() {
    return this.pageIndex;
  }
  set currentPageIndex(pageIndex) {
    this.pageIndex = pageIndex;
  }

  get pages() {
    return this.pagesEl;
  }
  set pages(pages) {
    this.pagesEl = pages;
  }

  get pagesLength() {
    return this.pages.length;
  }

  addEventListeners() {
    $('.btn-link').on('click', this.changePage.bind(this));
    $(window).on('resize', this.onResize.bind(this));
    $('.stalking').on('click', this.revealStalkingPanel);
  }

  animateComplete() {
    this.animatePage(this.currentPageIndex);
  }

  animatePage(pageIndex, params) {
    switch (pageIndex) {
      case 0:
        this.animatePage1(params);
        break;
      case 1:
        this.animatePage2();
        break;
      case 2:
        this.animatePage3();
        break;
      default:
        break;
    }
  }

  animatePage1(params) {
    const options = {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      prefix: '',
      suffix: '',
    };
    const usersCount = new Counter('users', 0, params.users, 0, 2, options);
    const projectsCount = new Counter('projects', 0, params.projects, 0, 2, options);
    const developersCount = new Counter('developers', 0, params.developers, 0, 2, options);

    usersCount.start();
    setTimeout(() => {
      projectsCount.start();
    }, 1000);
    setTimeout(() => {
      developersCount.start();
    }, 2000);
  }

  animatePage2() {
    velocity($('.img-circle'), 'transition.slideUpIn');
  }

  animatePage3() {

  }

  init() {
    this.WINDOW_WIDTH = window.innerWidth;
    this.WINDOW_HEIGHT = window.innerHeight;
    this.containerFluidEl = $('body > .container-fluid');
    this.pages = $('.page');
    this.currentPageIndex = 0;

    $('body').addClass('js');

    this.addEventListeners();

    this.animatePage(this.currentPageIndex, window.data);
  }

  onChangePageComplete() {
    velocity(this.pages.eq(this.currentPageIndex), 'transition.flipXIn', {
      complete: this.animateComplete.bind(this),
    });
  }

  onResize(e) {
    this.WINDOW_WIDTH = e.target.innerWidth;
    this.WINDOW_HEIGHT = e.target.innerHeight;
  }

  revealStalkingPanel() {
    velocity($('.stalk'), 'transition.slideUpIn');
  }

  changePage() {
    this.currentPageIndex++;
    /*
    velocity(this.containerFluidEl, {
      marginLeft: -this.WINDOW_WIDTH * this.currentPageIndex,
    }, {
      duration: 600,
      easing: 'easeOutSine',
      complete: this.animateComplete.bind(this),
    });*/
    velocity(this.pages.eq(this.currentPageIndex - 1), 'transition.flipXOut', {
      complete: () => this.onChangePageComplete,
    });
  }
}

export default App;
