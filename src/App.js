import React from 'react';
import { Link } from 'react-router-dom';
import homePicture from './resource/logo512.png';
import { linkStyle, header } from './style.js';

function App() {
	return (
		<div className='App'>
			{/* <Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} style={header}>
						<h1>
							OurChain NFT 交易平台<small>本機版</small>
						</h1>
						<strong>OurChain NFT platform</strong>
					</Grid>
					<Grid item xs={12} style={{ textAlign: 'center' }}>
						<img
							style={{ height: '40vmin' }}
							src={homePicture}
							loading='lazy'
							alt='封面圖'
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: 'center' }}>
						<Link to='/user' style={linkStyle}>
							查看 NFT
						</Link>
					</Grid>
					<Grid item xs={12} style={{ textAlign: 'center' }}>
						<Link to='/news' style={linkStyle}>
							新增 NFT
						</Link>
					</Grid>
				</Grid>
			</Box> */}
		</div>
	);
}

export default App;
