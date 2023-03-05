
import React, { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import { API_KEY, BASE_URL, SEARCH_PARAMS } from 'services/pictures-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export class App extends Component {
  state = {
    hits: [],
    searchQuery: '',
    page: 1,
    per_page: 12,
    showModal: false,
    loading: false,
    largeImageURL: '',
    tags: '',
  };
  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  getValue = ({ searchQuery, page }) => {
    this.setState({ loading: true });
  
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&${SEARCH_PARAMS}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No image found!');
          } else if (searchQuery === this.state.searchQuery) {
            this.setState(prevState => ({
              hits: [...prevState.hits, ...response.data.hits],
              searchQuery: searchQuery,
              page: prevState.page + 1,
            }));
          } else {
            this.setState(prevState => ({
              hits: response.data.hits,
              totalHits: response.data.totalHits,
              searchQuery: searchQuery,
              page: prevState.page + 1,
            }));
          }
        });
    } catch (error) {
      console.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  loadMore = () => {
    this.getValue(this.state);
  };

  render() {

    const { hits, showModal, loading, largeImageURL, tags, per_page, page, totalHits } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.getValue} />
        {loading && <Loader />}
        {hits && (
          <ImageGallery>
            <ImageGalleryItem pictures={hits} onImage={this.toggleModal} />
          </ImageGallery>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}

        {page < Math.ceil(totalHits / per_page)  && <Button onClick={() => this.loadMore()} />}
      </div>
    );
  }
}

export default App;
