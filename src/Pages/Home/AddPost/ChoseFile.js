import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function ChoseFile({file, setFile}) {

  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <div className="mt-5">
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <p>{file ? `File name: ${file?.name}` : "Chose post image"}</p>
    </div>
  );
}

export default ChoseFile;