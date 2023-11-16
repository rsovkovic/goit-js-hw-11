import { fetchImages } from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderGallery } from './render__gallery';

//**-----------------------------------------------------------------------**/
const searchForm = document.querySelector('#search-form');
const loadMore = document.querySelector('.load-more');
loadMore.classList.add('hidden');
const box__gallery = document.querySelector('.gallery');
searchForm.addEventListener('submit', onSearchForm);
loadMore.addEventListener('click', onClick);
let query = '';
let page = 1;
let perPages = 40;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

//*----------------------------------------------------------------------------//

function onSearchForm(evt) {
  evt.preventDefault();
  query = evt.target.elements.searchQuery.value.trim();
  page = 1;
  box__gallery.innerHTML = '';
  fetchImages(query, page, perPages)
    .then(data => {
      if (query === '' || data.hits.length === 0) {
        box__gallery.classList.add('hidden-element');
        loadMore.classList.add('hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        box__gallery.classList.remove('hidden-element');
        loadMore.classList.remove('hidden');
        renderGallery(data.hits);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      lightbox.refresh();
    })
    .catch(error => console.log(error));
}

//*-----------------------------------------------------------------------------------//

function onClick(evt) {
  page += 1;
  fetchImages(query, page, perPages)
    .then(data => {
      const totalPages = Math.ceil(data.totalHits / perPages);
      if (page >= totalPages) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        loadMore.classList.add('hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        renderGallery(data.hits);
        loadMore.classList.remove('hidden');
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        lightbox.refresh();
      }
    })
    .catch(error => console.log(error));
}
