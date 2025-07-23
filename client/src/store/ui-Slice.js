// import {createSlice} from  "@reduxjs/toolkit";


// const intialState = {themeModalIsOpen: false, editProfileModelOpen: false, 
//     editPostModalOpen:false, editPostId:"", 
//     theme: JSON.parse(localStorage.getItem("theme")) || {primaryColor: "", backgroundColor:""}}

// const uiSlice = createSlice({
//     name: "ui",
//     intialState,
//     reducers:{
//         openThemeModal: state =>{
//             state.themeModalIsOpen = true
//         }, 
//         closeThemeModal:state => {
//             state.themeModalIsOpen= false;
//         },
//         changeTheme: (state, action) =>{
//             state.theme = action.payload;
//         },
//         openEditProfileModal: state =>{
//             state.editProfileModelOpen = true
//         },
//         closeEditProfileModal: state =>{
//             state.editProfileModelOpen = false
//         },
//         openEditPostModal: (state, action)=>{
//             state.editPostModalOpen = true;
//             state.editPostId= action.payload;
//         },
//         closeEditOpenModal: state => {
//             state.editPostModalOpen = false;
//         }
//     }
// })

// export const uiSliceActions = uiSlice.actions

// export default uiSlice