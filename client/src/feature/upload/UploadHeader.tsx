import { CloudUpload } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

const t : React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  border: 0,
}

type Props = {
  getFiles: (items: File[]) => void
  handleSubmit: () => void
}

export default function UploadHeader({ getFiles, handleSubmit }: Props) {
  async function transferFiles(files: FileList | null) {
    if (files == null) return;
    getFiles(Array.from(files));
  }

  return (
    <Grid container component='form' spacing={4} sx={{ display: "flex", px: 3, justifyContent: "space-between" }}>
      <Grid sx={{display: "flex", gap: 4}}>
        <Button component='label' variant="outlined">
          Select images
          <input
            style={t}
            type='file'
            onChange={(e) => transferFiles(e.target.files)}
            multiple
          />
        </Button>

        <Button variant="outlined" tabIndex={-1} component='label'>
          Select folder
          <input
            style={t}
            type="file" 
            multiple 
            onChange={e => transferFiles(e.target.files)}
            {...{webkitdirectory: "true"} as React.InputHTMLAttributes<HTMLInputElement>} 
          />
        </Button>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        size='large'
        startIcon={<CloudUpload />}
        onClick={(e) => { e.preventDefault(); handleSubmit() }}
        sx={{alignItems: 'end'}}
      >Upload</Button>
    </Grid>
  )
}