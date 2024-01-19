
import styled from "styled-components";


export  const HeaderContainer = styled.div`
header {
  background-image: linear-gradient(to right, #d3cce3, #e9e4f0);
  position: fixed;
  padding: 10px;
  width: 100%;
  z-index: 1;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1)

}


.left_area h3 {
  display : inline;
  margin-left: 60px;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 900;
  color: rgb(115, 134, 213);
}
.left_area h3:hover{
  color:white;
}

.left_area span {
  color: #19B3D3;
}

.logout_btn {
  text-decoration: none;
  float: right;
  margin-top: -40px;
  margin-right: 40px;
  border-radius: 2px;
  font-size: 25px;
  font-weight: 600;
  color:  rgb(115, 134, 213);
  transition: 0.5s;

}

.logout_btn:hover  {
  color:white;
}

.sidebar {
  background-image: linear-gradient(to bottom right, #E1BEE7, #B2EBF2);
  margin-top: 70px;
  padding-top: 30px;
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  transition:left 0.5s;
  }

.sidebar .profile_image {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 10px;
}

.sidebar h4 {
  color: rgb(115, 134, 213);
  margin-top: 0;
  transition: opacity 0.5s linear;
}

.sidebar h6 {
  color: rgb(115, 134, 213);
  transition: opacity 0.5s linear;
}

.sidebar .link {
  color:rgb(115, 134, 213);
  display: block;
  width: 100%;
  line-height: 60px;
  text-decoration: none;
  padding-left: 40px;
  box-sizing: border-box;
  transition: 0.5s;
}
.sidebar .link span{
  color :rgb(115, 134, 213);
}


.sidebar .link:hover {
  background: #fff;
}
.sidebar .link:hover i {
  color: #7386D5;
}

.sidebar .link:hover span{
  color:#7386D5;
}



.sidebar i {
  padding-right: 10px;
}

label #sidebar_btn {
  z-index: 1;
   color: rgb(115, 134, 213);
  position: fixed;
  cursor: pointer;
  left: 300px;
  font-size: 20px;
  margin: 5px 0;
  transition: 0.5s;
  transition-property: color;
}

label #sidebar_btn:hover {
   color: white;
}

#check:checked~.sidebar {
  left: -190px;
}

#check:checked~.sidebar .link span {
  display: none;
}
#check:checked~.sidebar  h4 {
  opacity: 0;
}
#check:checked~.sidebar  h6 {
  opacity: 0;
}


#check:checked~.sidebar .link {
  font-size: 20px;
  margin-left: 170px;
  width: 80px;
}

center{
  margin-top: 30px;
}

#check:checked~.content {
  margin-left: 60px;
}

#check {
  display: none;
}
.content {
  margin-left: 250px;
  background: url(background.png) no-repeat;
  background-color: rgb(233, 236, 239);
  background-position: center;
  background-size: cover;
  height: 100vh;
  transition: 0.5s;
  overflow-y: scroll
}

#check:checked~.content {
  margin-left: 60px;
}
`