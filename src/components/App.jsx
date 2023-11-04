import {useState, useEffect, useCallback} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImg } from 'services/api';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';


export default function App() {
  
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [dataSubmit, setDataSubmit] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  
  
  useEffect(() => {
    if (!dataSubmit) return;
    console.log(dataSubmit)
    async function fetchImges () {
      try {
        setIsLoading(true);

        const data = await fetchImg(dataSubmit, page);
        console.log(data);
        if (!data.totalHits) {
          toast.error(
            'Nothing was found according to your request! Please enter another request!'
          );
          return;
        }
        console.log(data.hits);
        if (data.totalHits > 0 && page === 1) {
          toast.success(`We found ${data.total} images`);
        }

        setImages(prevState => [...prevState, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (err) {
        setErr(err.massage);
        toast.error(err.massage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImges()
  }, [ dataSubmit, page]);



  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  }

  const onSubmitForm = (searchQuery) => {
  if (dataSubmit === searchQuery) {
    return;
  }
    setDataSubmit(searchQuery);
    console.log(searchQuery)
    setPage(1)
    setImages([])
    setTotalImages(0)
  }
  
  
  return (
    <div>
      <Searchbar onSubmit={onSubmitForm} />
      {images.length > 0 && (
        <ImageGallery images={images} />
      )}
      {!isLoading && images.length !== totalImages && (
        <LoadMoreButton loadMore={loadMore} />
      )}
      {isLoading && <Loader />}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}











// class App extends React.Component {
//   state = {
//     images: [],
//     isLoading: false,
//     error: null,
//     search: '',
//     page: 1,
//     totalImages: 0,
//   };

//   onSubmitForm = searchQuery => {
//     if (this.state.searchQuery === searchQuery) {
//       return;
//     }
//     this.setState({ search: searchQuery, page: 1, images: [], totalImages: 0 });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     if (prevState.search !== search || prevState.page !== page) {
//       this.fetchImages();
//     }
//   }

  // fetchImages = async () => {
  //   const { search, page } = this.state;

  //   this.setState({ isLoading: true, error: null });

  //   try {
  //     const images = await fetchImg(search, page);

  //     if (images.totalHits === 0) {
  //       this.setState({ error: 'No images' });
  //       toast.error(
  //         'Nothing was found according to your request! Please enter another request!'
  //       );
  //       return;
  //     }

  //     this.setState(prevState => ({
  //       images: [...prevState.images, ...images.hits],
  //       totalImages: images.totalHits,
  //     }));
  //   } catch (error) {
  //     this.setState({ error: error.messege });
  //     toast.error(error.message);
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

//   loadMore = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };

//   render() {
//     const { images, isLoading, totalImages } = this.state;
//     return (
      // <div>
      //   <Searchbar onSubmit={this.onSubmitForm} />
      //   {images.length > 0 && (
      //     <ImageGallery onOpenModal={this.onOpenModal} images={images} />
      //   )}
      //   {!isLoading && images.length !== totalImages && (
      //     <LoadMoreButton loadMore={this.loadMore} />
      //   )}
      //   {isLoading && <Loader />}
      //   <ToastContainer
      //     position="top-center"
      //     autoClose={2000}
      //     hideProgressBar
      //     newestOnTop={false}
      //     closeOnClick
      //     rtl={false}
      //     pauseOnFocusLoss
      //     draggable
      //     pauseOnHover
      //     theme="colored"
      //   />
      // </div>
//     );
//   }
// }

// export default App;
