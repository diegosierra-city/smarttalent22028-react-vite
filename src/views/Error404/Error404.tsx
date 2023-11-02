import styles from './Error404.module.css'
import { useLocation } from 'react-router-dom';

export default function Error404() {
 let {pathname} = useLocation();
 return (
  <div className={`${styles.error404} page`}>
   <h1 className={styles.error}>404</h1>
   
   <h2>Page not found:</h2>
   <h3>{pathname}</h3>
   
  </div>
  
 )
 }