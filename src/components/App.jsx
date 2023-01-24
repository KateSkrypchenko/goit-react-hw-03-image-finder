import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './GlobalStyles';

import { SearchBar } from 'components/SearchBar/SearchBar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchApiService } from './Api';
import { Button } from 'components/Button/Button';

const searchApiService = new SearchApiService();
export class App extends Component {
  state = {
    value: '',
    resultFetch: [],
    isLoading: false,
  };

  createContactItem = event => {
    this.setState({
      value: event,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      try {
        this.setState({
          isLoading: true,
          resultFetch: [],
        });
        const response = await searchApiService.fetchSearchQuery(this.state.value);
        this.setState({
          resultFetch: response,
        });
      } catch (error) {
        toast.error('An error occurred. Please, reload the page');
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  render() {
    const { isLoading, resultFetch } = this.state;
    return (
      <>
        <GlobalStyle />
        <SearchBar onSubmit={this.createContactItem} isSubmitting={isLoading} />
        {isLoading && <Loader />}
        {resultFetch && <ImageGallery items={resultFetch} />}
        <Button />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
