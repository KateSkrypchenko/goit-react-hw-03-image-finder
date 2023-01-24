import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './GlobalStyles';

import { SearchBar } from 'components/SearchBar/SearchBar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchSearchImage } from './services/Api';
import { Button } from 'components/Button/Button';

// const searchApiService = new SearchApiService();
export class App extends Component {
  state = {
    value: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  createContactItem = event => {
    this.setState({
      value: event,
      images: [],
      page: 1,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      try {
        this.setState({
          isLoading: true,
        });
        const response = await fetchSearchImage(value, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
        }));
        this.responseFetch(response);
      } catch (error) {
        toast.error('An error occurred. Please, reload the page');
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  responseFetch = ({ totalHits, hits }) => {
    if (this.state.page === 1 && totalHits !== 0) {
      toast.success(`Hooray! We found ${totalHits} images`);
    }
    if (totalHits === 0) {
      toast.warn(`Sorry, there are no images matching your search query. Please try again.`);
    } else if (hits.length === 0) {
      toast.info('These are all the pictures what we found. Try something else');
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isLoading, images } = this.state;
    return (
      <>
        <GlobalStyle />
        <SearchBar onSubmit={this.createContactItem} isSubmitting={isLoading} />
        {isLoading && <Loader />}
        {images.length !== 0 && <ImageGallery items={images} />}
        {images.length !== 0 && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
