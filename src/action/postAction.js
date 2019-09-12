/*import { FETCH_POSTS, NEW_POST, NEW_USER } from './types';

export const fetchPosts = () => dispatch => {

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => res.json())
        .then(onLoginDetails =>
            dispatch({
                type: NEW_USER,
                user: onLoginDetails ? onLoginDetails : null
            })
        );
    console.log(onLoginDetails);
    console.log(onLoginDetails.user);
    console.log(onLoginDetails.user._user);
    console.log(onLoginDetails.user._user.emailVerified);

    
    if (!onLoginDetails.user._user.emailVerified) {
            firebase.auth().currentUser.sendEmailVerification();
        }
        if (onLoginDetails) {
            const jwttoken = await onLoginDetails.user.getIdToken();
            console.log(jwttoken);
            console.log(jwttoken._55);
        }
        



    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts =>
            dispatch({
                type: FETCH_POSTS,
                payload: posts
            })
        );
};

export const createPost = postData => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(post =>
            dispatch({
                type: NEW_POST,
                payload: post
            })
        );
};*/