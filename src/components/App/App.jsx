import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledApp } from './App.styled';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';

import { fetchPhotos } from 'api';

export const App = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [shouldButtonRender, setShouldButtonRender] = useState(false);

  const itemsLength = useRef(0);

  useEffect(() => {
    const getPhotosAndTotal = async () => {
      const { items, total } = await fetchPhotos({
        name: query,
        page: page,
      });
      return { items, total };
    };

    if (!query) return;
    setIsLoading(true);

    getPhotosAndTotal().then(({ items, total }) => {
      if (items.length === 0) {
        toast.error('No found images');
        setIsLoading(false);
        return;
      }
      setItems(prev => [...prev, ...items]);
      setIsLoading(false);
      itemsLength.current += items.length;
      if (itemsLength.current < total) {
        setShouldButtonRender(true);
        return;
      }
      setShouldButtonRender(false);
      setIsLoading(false);
    });
  }, [query, page]);

  const handleFormSubmit = name => {
    setItems([]);
    setPage(1);
    setQuery(name);
    setShouldButtonRender(false);
  };

  const onButtonClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmit} />

      {isLoading && <Loader />}
      <ImageGallery items={items} onItemClick={setLargeImageURL} />
      {shouldButtonRender && <Button onClick={onButtonClick} />}

      {largeImageURL && (
        <Modal
          onClose={() => setLargeImageURL(null)}
          largeImageURL={largeImageURL}
        />
      )}
      <ToastContainer />
    </StyledApp>
  );
};
