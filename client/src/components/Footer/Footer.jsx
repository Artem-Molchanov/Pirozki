import React from 'react';
import styles from './Footer.module.css';

function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.copyright}>© "Пирожки" All rights reserved</div>
			<div className={styles.socialLinks}>
				<a href='https://facebook.com' className={styles.socialLink}>
					<img
						src='https://banner2.cleanpng.com/20190107/pjj/kisspng-computer-icons-icon-design-portable-network-graphi-5c341cae96aa24.0678197715469190866171.jpg'
						alt='Facebook'
						className={styles.socialIcon}
					/>
				</a>
				<a href='https://twitter.com' className={styles.socialLink}>
					<img
						src='https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/59/d9/59/59d959e1-2e06-af34-8e85-8c65ec514fb1/AppIcon-0-1x_U007emarketing-0-0-85-220-0-7.png/1200x600wa.png'
						alt='Twitter'
						className={styles.socialIcon}
					/>
				</a>
				<a href='https://instagram.com' className={styles.socialLink}>
					<img
						src='https://pik-med.ru/upload/pictures/viber.png'
						alt='Instagram'
						className={styles.socialIcon}
					/>
				</a>
			</div>
		</footer>
	);
}

export default Footer;
