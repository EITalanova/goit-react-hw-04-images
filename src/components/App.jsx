import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import getData from '../services/pictures-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

function App() {
  const [hits, setHits] = useState('');
  const [totalHits, setTotalHits] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState('');

  const getValue = async (searchQuery, page) => {
    setLoading(true);
    try {
      const data = await getData({ searchQuery, page });
      if (!data.hits.length) {
        Notiflix.Notify.failure('No image found!');
        reset();
      } else {
        setHits(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPage(1);
    setHits([]);
  };

  useEffect(() => {
    if (!searchQuery) return;

    getValue(searchQuery, page);
    // eslint-disable-next-line
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) return;
    getValue(searchQuery, page);
    // eslint-disable-next-line
  }, [page]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (imageURL, tag) => {
    setShowModal(!showModal);
    setLargeImageURL(imageURL);
    setTags(tag);
  };

  const onInputSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    reset();
  };

  return (
    <div>
      <Searchbar onSubmit={onInputSubmit} />
      {loading && <Loader />}
      {hits && (
        <ImageGallery>
          <ImageGalleryItem pictures={hits} onImage={toggleModal} />
        </ImageGallery>
      )}

      {showModal && (
        <Modal onClose={toggleModal} url={largeImageURL} alt={tags} />
      )}

      {(page < Math.ceil(totalHits / per_page) && hits.length>0) && (
        <Button onClick={() => loadMore()} />
      )}
    </div>
  );
}

export default App;
