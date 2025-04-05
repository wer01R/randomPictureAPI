import { useEffect, useState } from "react";
import agent from "../../libs/api/agent"
import { ImageList, ImageListItem } from "@mui/material";

export default function View() {
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		agent.get<StaticImage>('/allpictures')
			.then((response) => {
				console.log(response);
				setImages(response.data.files.map((file) => (
					new URL(import.meta.env.VITE_API_SITE + '/' + response.data.path + '/' + encodeURIComponent(file)).toString()
				)));
			})
			.catch(err => console.log(err));
	}, [])

	return (
		<div>
			{images &&
				<ImageList variant="masonry" cols={3} gap={8}>
					{images.map((file, index) => {
						return (
							<ImageListItem key={index} sx={{bgcolor: "white"}}>
								<img
									src={file}
								/>
							</ImageListItem>
						)
					})}
				</ImageList>}
		</div>
	)
}