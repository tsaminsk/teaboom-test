import './assets/styles/main.scss';


// TABS
const tabsBodyItems = document.querySelectorAll('.tabs__body-item')
const toggleTabsBodyItemsClass = (id) => {
  tabsBodyItems.forEach((item) => {
    if (item.getAttribute('id') === id) {
      item.classList.remove('d-none')
    } else {
      item.classList.add('d-none')
    }
  })
}
let tabsLinks = document.querySelectorAll('.tabs__head-item')
if (tabsLinks?.length) {
  tabsLinks = [...tabsLinks]
  
  tabsLinks.forEach((link) => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '')
      if (link.querySelector(`[href="#${hash}"]`)) {
        link.classList.add('tabs__head-item--active')
      } else {
        link.classList.remove('tabs__head-item--active')
      }
      toggleTabsBodyItemsClass(hash)
    }
    
    link.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const last = document.querySelector('.tabs__head-item--active')
      if (last) {
        last.classList.remove('tabs__head-item--active')
      }
      link.classList.add('tabs__head-item--active')
      history.pushState(null, null, link.children[0]?.getAttribute('href') ?? '')
      const id = link.querySelector('a')?.getAttribute('href')?.replace('#', '')
      toggleTabsBodyItemsClass(id)
    })
  })
}

// IMAGES

const previewImages = document.querySelectorAll('.card__image-preview img')
const viewImage = document.querySelector('#image-view')

if (previewImages?.length) {
  previewImages.forEach((img) => {
    img.addEventListener('click', (e) => {
      const activeImage = document.querySelector('.card__image-preview img.active')
      if (activeImage) {
        activeImage.classList.remove('active')
      }
      img.classList.add('active')
      viewImage.setAttribute('src', img.getAttribute('src'))
    })
  })
}

const modal = document.querySelector('#modal')
if (modal) {
  const overlay = modal.querySelector('.modal__overlay')
  if (overlay) {
    overlay.addEventListener('click', ({ target }) => {
      if (target?.closest('.modal__content') && !target.closest('.modal__close')) return
      modal.classList.add('modal--closed')
      const timerId = setTimeout(() => {
        modal.classList.remove('modal--open')
        modal.classList.remove('modal--closed')
        clearTimeout(timerId)
      }, 300);
    })
  }
}

const openModal = () => {
  if (modal) {
    modal.classList.add('modal--open')
  }
}

const imageShowButton = document.querySelector('#image-show')

if(imageShowButton) {
  imageShowButton.addEventListener('click', () => {
    const src = viewImage.getAttribute('src')
    const alt = viewImage.getAttribute('alt')
    const modalImage = document.querySelector('#modal-image')
    if (src && modalImage) {
      modalImage.setAttribute('src', src)
      modalImage.setAttribute('alt', alt ?? '')
    }
    openModal()
  })
}