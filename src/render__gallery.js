const box__gallery = document.querySelector('.gallery');
export function renderGallery(arr) {
  const markup = arr
    .map(
      ({
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="card"><a class="gallery_link" href="${largeImageURL}"><div class="photo-card" id=${id}>
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div></div>
</a></div>`
    )
    .join('');
  box__gallery.insertAdjacentHTML('beforeend', markup);
}
