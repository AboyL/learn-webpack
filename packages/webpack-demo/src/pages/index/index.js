import './index.css';
import './style.less';

import duckImg from '../../../assets/duck.png';

document.getElementById('root').innerHTML = 'hello webpack'
const img = document.createElement('img')
img.src = duckImg
document.append(img)