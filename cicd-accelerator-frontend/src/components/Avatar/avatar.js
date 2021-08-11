import Avatar from '@material-ui/core/Avatar'

import surenAvatar from '../../assets/6921.JPG';

import Image from 'react-bootstrap/Image'

export default function avatar() {
	
	return (
		<div>
			<Avatar alt="SP" variant="square" src={surenAvatar} style={{ height: '150px', width: '100px', float: 'right' }}/>
				{/* <Image src={surenAvatar} rounded /> */}
		</div>
	)
}