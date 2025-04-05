import { Divider, Typography, CircularProgress } from "@mui/material";
import UploadHeader from "./UploadHeader";
import UploadItemCard from "./UploadItemCard";

type Props = {
	getFiles: (files : File[]) => void
	handleSubmit: () => void
	files: File[]
	isloading: boolean
	handleDelete: (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Upload({getFiles, handleSubmit, files, isloading, handleDelete} : Props) {
	return (
		<>
				<UploadHeader getFiles={getFiles} handleSubmit={handleSubmit} />
				<Divider />
				{!files.length && <Typography sx={{ textAlign: 'center', fontSize: 30 }}>Drag to upload</Typography>}
				{isloading && <CircularProgress />}
				{files.map((file, index) => (
					<UploadItemCard key={index} file={file} index={index} handleDelete={handleDelete} />
				))}
		</>
	)
}