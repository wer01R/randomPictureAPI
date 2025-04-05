import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { Image } from '@mui/icons-material'

export default function NavBar({ handleView }: { handleView: () => void }) {
	return (
		<AppBar>
			<Container maxWidth="xl">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
						<Image fontSize="large" />
						<Typography variant="h5" fontWeight='bold' >IMAGES</Typography>
					</Box>

					<Box display='flex'>
						<MenuItem onClick={handleView} sx={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase" }}>view</MenuItem>
						<MenuItem onClick={handleView} sx={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase" }}>upload</MenuItem>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}