document.addEventListener('DOMContentLoaded', () => {

  const gallery = document.querySelector('.gallery')

  if (gallery) {
    new GalleryMasonry(gallery, {
      responsive: {
        0: {
          columns: 1,
          gap: 20
        },
        577: {
          columns: 2,
          gap: 20
        },
        1000: {
          columns: 3,
          gap: 20
        }
      }
    })
  }
  // Вариант при имении текста в контенте блока галереии для ожидания подключения шрифтов
  // const fontLoadedSuccess = () => {
  //   clearInterval(interval)
  // const gallery = document.querySelector('.gallery')
  //
  //   if (gallery) {
  //     new GalleryMasonry(gallery, {
  //       responsive: {
  //         0: {
  //           columns: 1,
  //           gap: 20
  //         },
  //         577: {
  //           columns: 2,
  //           gap: 20
  //         },
  //         1000: {
  //           columns: 3,
  //           gap: 20
  //         }
  //       }
  //     })
  //   }
  //
  // }
  // const fontLoadListener = () => {
  //   let isLoaded = false;
  //
  //   try {
  //     isLoaded = document.fonts.check('12px "Montserrat"')
  //   } catch (e) {
  //     console.info('font load error', e)
  //     fontLoadedSuccess()
  //     return
  //   }
  //
  //   if (isLoaded) {
  //     fontLoadedSuccess()
  //   }
  // }
  //
  //
  // const interval = setInterval(fontLoadListener, 500)
})