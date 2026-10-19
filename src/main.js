import './assets/styles/main.scss';

import data from './data/ulun.json' with { type: 'json' };

const formatNumber = num => Number(num).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })?.replace(',', '.');

const productsTypes = document.querySelector('#products-types')
if (data?.length && productsTypes) {
  const sku = document.querySelector('#sku')
  const weight = document.querySelector('#weight')
  const availability = document.querySelector('#availability')
  const price = document.querySelector('#price')
  const oldPrice = document.querySelector('#old-price')

  const updateProductData = (item) => {
    sku.innerHTML = `<b>${item.sku}</b>`;
    weight.innerHTML = `<b>${item.weight} г</b>`;
    availability.innerHTML = `<b>${item.availability}</b>`;
    price.innerHTML = formatNumber(item.price) + ' ₽'
    oldPrice.innerHTML = formatNumber(item.old_price) + ' ₽'
  }

  data.forEach((item, i) => {
    const product = document.createElement('div')
    product.classList.add('card__product')
    product.classList.add('text-center')
    if (i === 0) {
      product.classList.add('active')
      updateProductData(item)
    }
    product.innerHTML = `${item.weight} г`
    product.addEventListener('click', () => {
      const active = document.querySelector('.card__product.active')
      if (active) {
        active.classList.remove('active')
      }
      product.classList.add('active')
      updateProductData(item)
    })
    productsTypes.appendChild(product)
  })
}

// TABS
const tabsBodyItems = document.querySelectorAll('.tabs__body-item')
const toggleTabsBodyItemsClass = (id) => {
  console.log('toggleTabsBodyItemsClass', id);
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
    const urlParams = new URLSearchParams(window.location.search)
    const activeTab = urlParams.get('tab')
    if (activeTab) {
      if (link.querySelector(`[data-tab="${activeTab}"]`)) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
      toggleTabsBodyItemsClass(activeTab)
    }

    link.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const last = document.querySelector('.tabs__head-item.active')
      if (last) {
        last.classList.remove('active')
      }
      link.classList.add('active')
      const tabName = link.querySelector('a')?.dataset.tab
      toggleTabsBodyItemsClass(tabName)
      const newUrl = `${window.location.pathname}?tab=${tabName}`;
      window.history.replaceState(null, '', newUrl);
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
  [viewImage, imageShowButton].forEach((el) => {
    el.addEventListener('click', () => {
      const src = viewImage.getAttribute('src')
      const alt = viewImage.getAttribute('alt')
      const modalImage = document.querySelector('#modal-image')
      if (src && modalImage) {
        modalImage.setAttribute('src', src)
        modalImage.setAttribute('alt', alt ?? '')
      }
      openModal()
    })
  })
}