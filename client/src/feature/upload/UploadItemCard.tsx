import { DeleteForever } from "@mui/icons-material";
import { Paper, ListItem, IconButton, Box } from "@mui/material";

type Props = {
  file: File
  handleDelete: (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  index: number
}

export default function UploadItemCard({ file, handleDelete, index }: Props) {
  return (
    <Paper
      sx={{ px: 3, mx: 3, display: "flex" }}
    >
      <ListItem>{file.name}</ListItem>
      <IconButton color="error" aria-label="delete" onClick={(e) => handleDelete(index, e)}>
        <DeleteForever />
      </IconButton>
      <Box sx={{ alignSelf: 'center', flexGrow: 1, maxHeight: 300 }}>
        <img src={URL.createObjectURL(file)} style={{ maxHeight: 300 }} />
      </Box>
    </Paper>
  )
}