import { useState } from "react";
import { Box } from '@mui/material';
import agent from "../../libs/api/agent";
import NavBar from "./NavBar";
import Upload from "../../feature/upload/Upload";
import View from "../../feature/view/View";
import MyGallery from "../../feature/lightbox/MyGallery";

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
		files.forEach(file => console.log(file));
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

	const [view, setView] = useState(false);
	const handleView = () => setView(!view);
	return (
		<Box
			sx={{ width: "100%", minHeight: "110vh", backgroundColor: "#eeeeee", py: 5 }}
			onDrop={(e) => handleDrop(e)}
			onDragOver={handleDragOver}
			display="flex"
			flexDirection="column"
			gap={2}
		>
			<NavBar handleView={handleView}/>
			<Box maxWidth='xl' sx={{ mt: "3rem", padding: 0}}>
				{
					view ? <View /> :
					<Upload getFiles={getFiles} handleSubmit={handleSubmit} files={files} isloading={isloading} handleDelete={handleDelete}/>
				}
			</Box>
			<MyGallery />
		</Box>
	)
};