
// import { Link } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from 'react-router-dom';
import EditPost from '../EditPostModal';
import DeletePost from '../DeletePostModal';


export default function Post({ post, user, loggedIn, flashMessage, editPost }) {

    return (
        <div className="col" id={`list-item-${post.id}`} key={post.id}>
            <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">{post.author.username}</text>
                </svg>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        {loggedIn && post.author.username === user.username && user !== null ?
                            <div className="btn-group p-2">
                                {<EditPost post={post} user={user} flashMessage={flashMessage} />}
                                {<DeletePost post={post} user={user} flashMessage={flashMessage} />}
                            </div>
                            : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}