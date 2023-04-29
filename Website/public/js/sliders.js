
function swiper(){

  var swiperCategories = new Swiper(".swiperCategories", {
    slidesPerView: 7,
    spaceBetween: 10,
    watchSlidesProgress: true,
    autoplay: {
      delay: 1500,
    },
    watchSlidesVisibility: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      767: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 10
      },
      1200: {
        slidesPerView: 7,
        spaceBetween: 10
      },
    }
  });

  var swiperRecipe = new Swiper(".swiperRecipe", {

      watchSlidesProgress: true,
      autoplay: {
        delay: 1500,
      },
      watchSlidesVisibility: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        1000: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }
      // breakpoints: {
      //   // when window width is >= 320px
      //   320: {
      //     slidesPerView: 1,
      //     spaceBetween: 10,
      //     centeredSlides: true,
      //   },
      //   // when window width is >= 480px
      //   480: {
      //     slidesPerView: 1,
      //     spaceBetween: 10,
      //     centeredSlides: true,
      //   },
      //   // when window width is >= 640px
      //   640: {
      //     slidesPerView: 1.3,
      //     spaceBetween: 20
      //   },
      //   740: {
      //     slidesPerView: 1.9,
      //     spaceBetween: 80
      //   },
      //   767: {
      //     slidesPerView: 2.1,
      //     spaceBetween: 80
      //   },
      //   992: {
      //     slidesPerView: 2.5,
      //     spaceBetween: 30
      //   },
      //   1200: {
      //     slidesPerView: 3,
      //     spaceBetween: 10
      //   },
      // }
    });



  var swiperProducts = new Swiper('.swiperProducts', {
    slidesPerView: 5,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 10
      },
    }
  });
}



 swiper()
