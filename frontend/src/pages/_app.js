import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

// FILEPOND CSS
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />      
  );  
}
