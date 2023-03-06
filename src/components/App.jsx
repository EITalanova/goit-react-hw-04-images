import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import getData from 'services/pictures-api';

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

  const toggleModal = (imageURL, tag) => {
    setShowModal(!showModal);
    setLargeImageURL(imageURL);
    setTags(tag);
  };

  const getValue = async (searchQuery, page) => {
    setLoading(true);

    try {
      const data = await getData({ searchQuery, page });
      if (!data.hits.length) {
        Notiflix.Notify.failure('No image found!');
        reset();
      }
      setHits(prevState => [ ...data.hits]);
      setTotalHits(data.totalHits);
      setSearchQuery(prevState => prevState);
      // } else if (searchQuery === searchQuery) {
      // setHits([...data.hits]);
      // setSearchQuery(searchQuery);
      //  setSearchQuery(prevState => prevState);
      // setHits(prevState => [...prevState, ...data.hits]);
      // setPage(prevState => prevState + 1);
      // } else {
      //   setHits(data.hits);
      //   setTotalHits(data.hits);
      // setSearchQuery(prevState => prevState);
      // setPage(prevState => prevState + 1);
      // }
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

    getValue();
    // eslint-disable-next-line 
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) return;

    getValue();
    // eslint-disable-next-line 
  }, [page]);

  const loadMore = () => {
    // getValue(searchQuery, page);
    // setSearchQuery(prevState => prevState);
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={getValue} />
      {loading && <Loader />}
      {hits && (
        <ImageGallery>
          <ImageGalleryItem pictures={hits} onImage={toggleModal} />
        </ImageGallery>
      )}

      {showModal && (
        <Modal onClose={toggleModal} url={largeImageURL} alt={tags} />
      )}

      {page < Math.ceil(totalHits / per_page) && (
        <Button onClick={() => loadMore()} />
      )}
    </div>
  );
}

export default App;
