import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

const MyGallery = () => (
  <Gallery>
		<div>
    <Item
      original="https://th.bing.com/th/id/OIP.DD1MGER78FmuNjgXCmL3xwHaQD?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      thumbnail="https://th.bing.com/th/id/OIP.DD1MGER78FmuNjgXCmL3xwHaQD?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
			width={1960}
			height={1180}
    >
      {({ ref, open }) => (
        <img ref={ref} onClick={open} src="https://th.bing.com/th/id/OIP.DD1MGER78FmuNjgXCmL3xwHaQD?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" width={100}/>
      )}
    </Item>
    <Item
      original="https://th.bing.com/th/id/OIP.tDzXoGvz5fRymqUtI0YB8AHaIp?w=125&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      thumbnail="https://th.bing.com/th/id/OIP.tDzXoGvz5fRymqUtI0YB8AHaIp?w=125&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    >
      {({ ref, open }) => (
        <img ref={ref} onClick={open} src="https://th.bing.com/th/id/OIP.tDzXoGvz5fRymqUtI0YB8AHaIp?w=125&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" width={100}/>
      )}
    </Item>
		</div>
  </Gallery>
)

export default MyGallery;