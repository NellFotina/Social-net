/*! For license information please see 3.47cc0721.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[3],{292:function(t,e,s){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__2amf-",img:"ProfileInfo_img__2n8Ab"}},293:function(t,e,s){t.exports={postBlock:"MyPosts_postBlock__3oG22",posts:"MyPosts_posts__3iWEj"}},294:function(t,e,s){t.exports={item:"Post_item__2MzRF"}},296:function(t,e,s){"use strict";s.r(e);var n=s(5),o=s(36),c=s(37),a=s(39),i=s(38),u=s(0),r=s.n(u),p=s(69),j=s(292),l=s.n(j),b=s(130),d=s(1),h=function(t){var e=Object(u.useState)(!1),s=Object(b.a)(e,2),n=s[0],o=s[1],c=Object(u.useState)(t.status),a=Object(b.a)(c,2),i=a[0],r=a[1];Object(u.useEffect)((function(){r(t.status)}),[t.status]);return Object(d.jsxs)("div",{children:[!n&&Object(d.jsx)("div",{children:Object(d.jsx)("span",{onDoubleClick:function(){o(!0)},children:i||"Without status"})}),n&&Object(d.jsx)("div",{children:Object(d.jsx)("input",{onChange:function(t){r(t.currentTarget.value)},autoFocus:!0,onFocus:function(t){t.target.select()},onBlur:function(){o(!1),t.updateStatus(i)},value:i})})]})},f=function(t){var e=t.profile,s=t.status,n=t.updateStatus;return e?Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:l.a.img}),Object(d.jsxs)("div",{className:l.a.descriptionBlock,children:[Object(d.jsx)("img",{src:e.photos.large,alt:""}),Object(d.jsx)(h,{status:s,updateStatus:n})]})]}):Object(d.jsx)(p.a,{})},O=s(16),m=s(98),x=s(33),k=s(293),v=s.n(k),g=s(294),P=s.n(g),S=function(t){return Object(d.jsxs)("div",{className:P.a.item,children:[Object(d.jsx)("img",{src:"https://saltway.in.ua/wp-content/uploads/2021/01/fotina-1200x992-1.jpg",alt:""}),t.message,Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{children:"Like: "}),t.like]})]})},_=s(91),T=s(129),w=s(87),y=s(34),B=r.a.memo((function(t){var e=Object(x.a)(t.posts).reverse().map((function(t){return Object(d.jsx)(S,{message:t.message,like:t.likeCount})}));return Object(d.jsxs)("div",{className:v.a.postBlock,children:[Object(d.jsx)("h3",{children:"My posts"}),Object(d.jsx)(A,{onSubmit:function(e){t.addPost(e.newPostText)}}),Object(d.jsx)("div",{className:v.a.posts,children:"New post"}),e]})})),N=Object(w.a)(10),A=Object(T.a)({form:"myNewPostForm"})((function(t){return Object(d.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(d.jsx)(_.a,{component:y.b,name:"newPostText",placeholder:"Enter your post",validate:[w.b,N]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{children:"Add post"})})]})})),I=B,M=Object(O.b)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),(function(t){return{addPost:function(e){t(Object(m.a)(e))}}}))(I),C=function(t){return Object(d.jsxs)("main",{children:[Object(d.jsx)(f,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),Object(d.jsx)(M,{})]})},F=s(7),U=s(11),z=function(t){Object(a.a)(s,t);var e=Object(i.a)(s);function s(){return Object(o.a)(this,s),e.apply(this,arguments)}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userId;t||(t=this.props.meAuthUserId)||this.props.history.push("/login"),this.props.getUserProfileThunk(t),this.props.getStatusThunk(t)}},{key:"render",value:function(){return Object(d.jsx)(C,Object(n.a)(Object(n.a)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatusThunk}))}}]),s}(r.a.Component);e.default=Object(U.d)(Object(O.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,meAuthUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfileThunk:m.d,getStatusThunk:m.c,updateStatusThunk:m.e}),F.f)(z)}}]);
//# sourceMappingURL=3.47cc0721.chunk.js.map