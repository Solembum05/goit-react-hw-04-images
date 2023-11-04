import {useState, useEffect} from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImg } from 'services/api';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';



export default function App() {
  
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [dataSubmit, setDataSubmit] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  

  useEffect(() => {
    if (!dataSubmit) return;

    if (dataSubmit) {async function fetchImges () {
      try {
        setIsLoading(true);

        const data = await fetchImg(dataSubmit, page);
        if (!data.totalHits) {
          toast.error(`No images found`);
          return;
        }
        if (data.totalHits > 0 && page === 1) {
          toast.success(`We found ${data.total} images`);
        }

        setImages(prevState => [...prevState, ...data.hits]);
        setTotalImages(data.total);
      } catch (err) {
        toast.error(err.message);
        setErr(err.massage);
      } finally {
        setIsLoading(false);
      }
    }
    
  fetchImges()
}
  }, [ dataSubmit, page]);



  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  }

  const onSubmitForm = (searchQuery) => {  
    setDataSubmit(searchQuery);
    setPage(1)
    setImages([])
    setTotalImages(0)
  }
  
  
  return (
    <div>
      <Searchbar onSubmit={onSubmitForm} />
      {images.length > 0 && <ImageGallery images={images} />}
      {!isLoading && images.length !== totalImages && (
        <LoadMoreButton loadMore={loadMore} />
      )}
      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
}
