import { useState } from "react";
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import UploadItemCard from "./feature/upload/UploadItemCard";
import UploadHeader from "./feature/upload/UploadHeader";
import agent from "./libs/api/agent";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [isloading, setIsLoading] = useState(false);

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const items = event.dataTransfer.items;
    setIsLoading(true);
    const files: File[] = [];

    function readDir(item: FileSystemEntry) {
      return new Promise<void>((resolve, reject) => {
        if (item.isFile)
          (item as FileSystemFileEntry).file(file => {
            if (file.type.startsWith("image/")) {
              files.push(file);
            } resolve();
          }, () => reject());

        else if (item.isDirectory) {
          const reader = (item as FileSystemDirectoryEntry).createReader();
          reader.readEntries(entries => {
            const promises = entries.map(entry => readDir(entry));
            Promise.all(promises)
              .then(() => resolve())
              .catch(reject);
          });
        }
      });
    }

    const promises = [];
    for (const item of items) {
      const entry = item.webkitGetAsEntry();
      if (entry) promises.push(readDir(entry));
    }

    try {
      await Promise.all(promises);
      setFiles(pre => pre.concat(files));
      setIsLoading(false);
    } catch (err) {
      console.error("While processing files: " + err);
    }
  }

  function getFiles(files: File[]) {
    setFiles(pre => pre.concat(files));
  }

  function clearFiles() {
    setFiles([]);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDelete(index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setFiles(pre => (
      pre.filter((_, i) => i !== index)
    ))
  }

  function handleSubmit() {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append("files", file, file.name);
    })


    agent.post("/UploadPicture", formData)
    .then(() => {
      console.log("Success!");
      clearFiles();
    }).catch((err) => console.log(err));
  }

  return (
    <Box
      sx={{ width: "100%", minHeight: "110vh", backgroundColor: "#eeeeee", py: 5 }}
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDragOver}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <UploadHeader getFiles={getFiles} handleSubmit={handleSubmit}/>
      <Divider />
      {!files.length && <Typography sx={{alignSelf: 'center', fontSize: 30}}>Drag to upload</Typography>}
      {isloading && <CircularProgress />}
      {files.map((file, index) => (
        <UploadItemCard key={index} file={file} index={index} handleDelete={handleDelete} />
      ))}
    </Box>
  )
};