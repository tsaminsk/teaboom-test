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