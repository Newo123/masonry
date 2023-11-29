const galleryActive = "gallery--active";

const debounce = (func, time = 100) => {
  let timer;

  return (event) => {
    clearTimeout(timer);
    timer = setTimeout(func, time, event)
  }
}

class GalleryMasonry {
  constructor(gallery = document.querySelector('.gallery'), options = {}) {
    this.gallery = gallery;
    this.galleryItem = gallery.children;

    this.galleryItemData = Array.from(this.galleryItem).map(item => ({item}))

    this.settings = {
      responsive: options.responsive || {
        0: {
          gap: 10,
          columns: 3
        }
      }
    }

    this.settingsSizes = Object.keys(this.settings.responsive).map(item => Number(item)).sort((a, b) => a - b)
    this.resize = this.resize.bind(this)

    this.setEvents()
    this.setParameters()
    this.gallery.classList.add(galleryActive)
  }

  setEvents () {
    this.debouncedResize = debounce(this.resize)
    window.addEventListener('resize', this.debouncedResize)
  }

  resize () {
    this.setParameters()
  }

  setParameters () {
    const galleryWidth = this.gallery.offsetWidth

    this.setCurrentSettings(galleryWidth)

    const itemWidth = (galleryWidth - this.settings.gap * (this.settings.columns - 1)) / this.settings.columns
    this.setWidth(itemWidth)

    this.galleryItemData = this.galleryItemData.map((item, index) => ({...item, height: item.item.offsetHeight}))

    this.setSizeContainer()
    this.setPosition(itemWidth)
  }

  setCurrentSettings (galleryWidth) {
    let currentSize = 0
    this.settingsSizes.forEach(size => {
      if (galleryWidth >= size) {
        currentSize = size
      }
    })

    this.settings.columns = this.settings.responsive[currentSize].columns
    this.settings.gap = this.settings.responsive[currentSize].gap
  }

  setWidth (itemWidth) {
    this.galleryItemData.forEach(({item}) => {
      item.style.width = `${itemWidth}px`
    })
  }

  setSizeContainer () {
    const heightColumns = new Array(this.settings.columns).fill(0)

    this.galleryItemData.forEach((item, index) => {
      heightColumns[index % this.settings.columns] += item.height + this.settings.gap
    })

    const maxHeightColumn = heightColumns.reduce((acc, size) => (size > acc) ? size : acc)

    this.gallery.style.height = `${maxHeightColumn - this.settings.gap}px`
  }

  setPosition (itemWidth) {
    const topSets = new Array(this.settings.columns).fill(0)

    this.galleryItemData = this.galleryItemData.map((item, index) => {
      const indexColumn = index % this.settings.columns
      const left = indexColumn * itemWidth + this.settings.gap * indexColumn
      const top = topSets[indexColumn]
      topSets[indexColumn] += item.height + this.settings.gap

      return {
        ...item,
        left,
        top
      }
    })

    this.galleryItemData.forEach(({item, left, top}) => {
      item.style.transform = `translate3d(${left}px, ${top}px, 0)`
    })
  }
}