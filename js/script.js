/* slider */
  const swiper = new Swiper( '.swiper-container' , {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets'
    },

    
    speed: 300,
    a11y: {
      paginationBulletMessage: "Слайд {{index}}"
    },
  });



  /* work-tabs */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.work__btn').forEach(function (e) {
      e.addEventListener('click', function (e) {
        const tab = e.currentTarget.dataset.path;
        document.querySelectorAll('.tab-content').forEach(function (e) {
          e.classList.remove('tab-content--active')
          document.querySelector(`[data-target='${tab}']`).classList.add('tab-content--active');
        });
      });

      e.addEventListener('click', function (e) {
        const tabDefault = e.currentTarget.dataset.default;
        document.querySelectorAll('.work__btn').forEach(function (e) {
          e.classList.remove('work__btn--default')
          document.querySelector(`[data-path='${tabDefault}']`).classList.add('work__btn--default');
        });
      });

    });
  })

  // search_form

$('.search').
   on('mouseover', function() {
  $('.search_button').css('background', 'url(img/search_hover.png) no-repeat center center');
}).on('mouseout', function() {
  $('.search_button').css('background', 'url(img/search_default.png) no-repeat center center');
}).on('click', function() {
  $(this).css('display', 'none').next().css('display', 'flex');
  $('.search-content__form').css('display', 'flex');
})

$('.search-content-form__button-cancel').on('click', function() {
  $('.search-content-form__input').val("");
  $('.search-content__form').css('display', 'none');
  $('.search').next().css('display', 'none').prev().css('display', 'flex');
})


  // accordion
  $(function() {
    $("#accordion").accordion({
      collapsible: true,
      heightStyle: 'content',
    });
  });

  //bruger
  const burgerBtn = document.querySelector('.burger');
  const menuClose = document.querySelector('.menu-close');
  const menuBurger = document.querySelector('.nav');

  burgerBtn.addEventListener('click', () => {
    menuBurger.classList.add('burger-active');
  });

  menuClose.addEventListener('click', () => {
    menuBurger.classList.remove('burger-active');
  });


