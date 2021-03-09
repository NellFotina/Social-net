import React from "react";
import s from './Navbar.module.css';

console.log(s);

// let s {
//   'nav': 'Navbar_nav__1QIal',
//   'item': 'Navbar_item__1iKA-',
//   'active': 'Navbar_active__3CcyT'
// }

let s1 = "item";
let s2 = "active";
// "item active"
let classes = s1 + " " + s2;
let classesNew = `${s.item} ${s.active}`;

const Navbar = () => {
return <nav className={s.nav}>
<div className={`${s.item} ${s.active}`}>
  <a>Profile</a>
</div>
<div className={s.item}>
  <a>Messages</a>
</div>
<div className={s.item}>
  <a>News</a>
</div>
<div className={s.item}>
  <a>Music</a>
</div>
<div className={s.item}>
  <a>Settings</a>
</div>
</nav>
}

export default Navbar;