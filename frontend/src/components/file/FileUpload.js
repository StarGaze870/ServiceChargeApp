import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useEffect, useState } from 'react';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUpload = ({

    getFilesCallback=()=>{},
    maxFiles=3,
    lableIdle='Drag & Drop your attachment',
    reset

}) => {

    const [files, setFiles] = useState([])
    const [fileCount, setFileCount] = useState(0)

    useEffect(() => {        
      
      getFilesCallback({ files: files });          

    }, [files]);

    useEffect(() => {        
      
      if (reset) {
        setFiles([])
      }      

    }, [reset]);

    return (        
    
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={maxFiles}
            allowFileSizeValidation={true}
            maxFileSize="20MB"
            name="files"            
            />
    );
}

export default FileUpload;