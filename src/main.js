import './css/styles.css';
import { fetchImages, resetPage } from './pixabay-api.js';
import { renderGallery, clearGallery } from './render-gallery.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentQuery = '';
let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value.trim();

  if (!query) return;

  clearGallery();
  loadMoreBtn.classList.add('hidden');
  showLoader();

  try {
    resetPage();
    currentQuery = query;
    const data = await fetchImages(query);
    totalHits = data.totalHits;
    loadedImages = data.hits.length;

    renderGallery(data.hits);
    if (loadedImages < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    }

  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();
  try {
    const data = await fetchImages(currentQuery);
    renderGallery(data.hits);

    loadedImages += data.hits.length;
    scrollPage();

    if (loadedImages >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      alert("We're sorry, but you've reached the end of search results.");
    }

  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
});

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery a')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
